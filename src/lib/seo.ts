import { legalDocumentLinks, legalDocuments } from '../data/legalDocuments.ts'
import {
  formatPlanPeriod,
  formatPrice,
  getSubscriptionPlan,
  subscriptionPath,
  subscriptionPlans,
} from '../data/subscriptionPlans.ts'

const siteName = 'Official VPS'
const monthlyPlan = getSubscriptionPlan('1')
const trialPlan = getSubscriptionPlan('trial')
const homeTitle = `${siteName}`
const homeDescription = `OFL VPS: VPN в 10+ локациях, безлимитный трафик и подключение до 6 устройств. Тарифы от ${formatPrice(monthlyPlan.price)} в месяц, пробный период — 7 дней за ${formatPrice(trialPlan.price)}.`

export const seoPaths = [
  '/',
  '/subscribe',
  '/subscribe/success',
  '/subscribe/error',
  ...legalDocumentLinks.map(({ href }) => href),
]

export interface SeoTag {
  tag: 'title' | 'meta' | 'link' | 'script'
  attributes?: Record<string, string>
  content?: string
}

function getPageMetadata(pathname: string) {
  switch (pathname) {
    case '/':
      return { title: homeTitle, description: homeDescription }
    case '/subscribe':
      return {
        title: `Оформление подписки — ${siteName}`,
        description:
          'Выберите тариф OFL VPS, укажите почту и способ оплаты подписки.',
      }
    case '/subscribe/success':
      return {
        title: `Подписка оформлена — ${siteName}`,
        description:
          'Результат оформления подписки OFL VPS и данные для подключения.',
      }
    case '/subscribe/error':
      return {
        title: `Ошибка оплаты — ${siteName}`,
        description:
          'Повторите оплату подписки OFL VPS или обратитесь в поддержку.',
      }
    default: {
      const legalPage = legalDocumentLinks.find(({ href }) => href === pathname)
      if (legalPage) {
        const document = legalDocuments[legalPage.id]
        return {
          title: `${document.title} — ${siteName}`,
          description: document.subtitle,
        }
      }
      return {
        title: `Страница не найдена — ${siteName}`,
        description:
          'Страница не найдена. Перейдите на главную страницу OFL VPS.',
      }
    }
  }
}

function getStructuredData(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: siteName,
        alternateName: 'Official VPS',
        inLanguage: 'ru-RU',
      },
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/#webpage`,
        url: `${siteUrl}/`,
        name: homeTitle,
        description: homeDescription,
        inLanguage: 'ru-RU',
        isPartOf: { '@id': `${siteUrl}/#website` },
        mainEntity: { '@id': `${siteUrl}/#service` },
      },
      {
        '@type': 'Service',
        '@id': `${siteUrl}/#service`,
        name: 'Персональные серверы OFL VPS',
        serviceType: 'Доступ к серверам по подписке',
        url: `${siteUrl}/`,
        description: homeDescription,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Тарифы OFL VPS',
          itemListElement: subscriptionPlans.map((plan) => ({
            '@type': 'Offer',
            name:
              plan.id === 'trial' ? 'Пробный период — 7 дней' : plan.duration,
            description: formatPlanPeriod(plan),
            price: plan.price,
            priceCurrency: 'RUB',
            url: `${siteUrl}${subscriptionPath(plan.id)}`,
          })),
        },
      },
    ],
  }
}

export function getSeoTags(pathname: string, origin: string): SeoTag[] {
  const siteUrl = new URL(origin).origin
  const path = pathname.replace(/\/+$/, '') || '/'
  const { title, description } = getPageMetadata(path)
  const canonical = seoPaths.includes(path) ? `${siteUrl}${path}` : undefined
  const tags: SeoTag[] = [
    { tag: 'title', content: title },
    { tag: 'meta', attributes: { name: 'description', content: description } },
    {
      tag: 'meta',
      attributes: {
        name: 'robots',
        content:
          path === '/'
            ? 'index, follow, max-image-preview:large'
            : 'noindex, follow',
      },
    },
    { tag: 'meta', attributes: { property: 'og:type', content: 'website' } },
    { tag: 'meta', attributes: { property: 'og:locale', content: 'ru_RU' } },
    {
      tag: 'meta',
      attributes: { property: 'og:site_name', content: siteName },
    },
    { tag: 'meta', attributes: { property: 'og:title', content: title } },
    {
      tag: 'meta',
      attributes: { property: 'og:description', content: description },
    },
    { tag: 'meta', attributes: { name: 'twitter:card', content: 'summary' } },
    { tag: 'meta', attributes: { name: 'twitter:title', content: title } },
    {
      tag: 'meta',
      attributes: { name: 'twitter:description', content: description },
    },
  ]

  if (canonical) {
    tags.push(
      { tag: 'link', attributes: { rel: 'canonical', href: canonical } },
      { tag: 'meta', attributes: { property: 'og:url', content: canonical } },
      {
        tag: 'meta',
        attributes: {
          property: 'og:image',
          content: `${siteUrl}/web-app-manifest-512x512.png`,
        },
      },
      {
        tag: 'meta',
        attributes: { property: 'og:image:width', content: '512' },
      },
      {
        tag: 'meta',
        attributes: { property: 'og:image:height', content: '512' },
      },
      {
        tag: 'meta',
        attributes: { property: 'og:image:alt', content: siteName },
      },
      {
        tag: 'meta',
        attributes: {
          name: 'twitter:image',
          content: `${siteUrl}/web-app-manifest-512x512.png`,
        },
      },
    )
  }

  if (path === '/') {
    tags.push({
      tag: 'script',
      attributes: { type: 'application/ld+json' },
      content: JSON.stringify(getStructuredData(siteUrl)).replace(
        /</g,
        '\\u003c',
      ),
    })
  }
  return tags
}
