import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const currentDate = new Date().toISOString()

export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    plugins: [
      react(),
      tailwindcss(),
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
      _BUILD_DATE_: JSON.stringify(currentDate)
    },
  }
})
