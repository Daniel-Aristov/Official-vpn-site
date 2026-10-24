import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, loadEnv } from 'vite'
import checker from 'vite-plugin-checker'
import { getSeoTags, seoPaths } from './src/lib/seo.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const currentDate = new Date().toISOString()

export default defineConfig(({ mode, command }) => {
  const siteUrl = new URL(loadEnv(mode, __dirname).VITE_SITE_URL).origin
  const escapeHtml = (value: string) =>
    value.replace(
      /[&<>"']/g,
      (char) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        })[char]!,
    )
  const seoHtml = (pathname: string) =>
    getSeoTags(pathname, siteUrl)
      .map(({ tag, attributes, content }) => {
        const attrs = Object.entries(attributes ?? {})
          .map(([name, value]) => ` ${name}="${escapeHtml(value)}"`)
          .join('')
        return tag === 'meta' || tag === 'link'
          ? `<${tag} data-seo=""${attrs} />`
          : `<${tag} data-seo=""${attrs}>${tag === 'script' ? content : escapeHtml(content ?? '')}</${tag}>`
      })
      .join('\n')

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'site-seo',
        enforce: 'post',
        transformIndexHtml(html, context) {
          if (command === 'serve') {
            const pathname = (context.originalUrl ?? context.path).split('?')[0]
            return html.replace('<!--seo-head-->', () => seoHtml(pathname))
          }
        },
        generateBundle(_options, bundle) {
          const entry = bundle['index.html']
          if (entry?.type !== 'asset' || typeof entry.source !== 'string')
            return
          const template = entry.source
          entry.source = template.replace('<!--seo-head-->', () => seoHtml('/'))
          for (const pathname of seoPaths.filter(
            (pathname) => pathname !== '/',
          )) {
            this.emitFile({
              type: 'asset',
              fileName: `${pathname.slice(1)}.html`,
              source: template.replace('<!--seo-head-->', () =>
                seoHtml(pathname),
              ),
            })
          }
          this.emitFile({
            type: 'asset',
            fileName: 'robots.txt',
            source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
          })
          this.emitFile({
            type: 'asset',
            fileName: 'sitemap.xml',
            source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escapeHtml(siteUrl)}/</loc></url></urlset>\n`,
          })
        },
      },
      checker({
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx}" "./vite.config.ts"',
          useFlatConfig: true,
        },
        overlay: true,
        terminal: true,
      }),
      ...(mode === 'analyze'
        ? [
            visualizer({
              open: true,
              filename: 'dist/stats.html',
              gzipSize: true,
              brotliSize: true,
            }),
          ]
        : []),
    ],
    define: {
      _BUILD_DATE_: JSON.stringify(currentDate),
    },
  }
})
