import {
  getSubscriptionPlan,
  type SubscriptionPlan,
} from '@/data/subscriptionPlans'

export interface DemoSubscription {
  planId: string
  email: string
  createdAt: string
}

const storageKey = 'ofl-vps:demo-subscription'

export function isDemoSubscription(order: unknown): order is DemoSubscription {
  if (!order || typeof order !== 'object') return false
  const value = order as Record<string, unknown>
  return (
    typeof value.email === 'string' &&
    value.email.length > 0 &&
    value.email.length <= 254 &&
    typeof value.planId === 'string' &&
    getSubscriptionPlan(value.planId).id === value.planId &&
    typeof value.createdAt === 'string' &&
    Number.isFinite(Date.parse(value.createdAt))
  )
}

export function saveDemoSubscription(order: DemoSubscription) {
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(order))
  } catch {
    /* The page also keeps the order in router state. */
  }
}

export function readDemoSubscription(): DemoSubscription | null {
  try {
    const order = JSON.parse(sessionStorage.getItem(storageKey) ?? 'null')
    if (!isDemoSubscription(order)) return null
    return {
      planId: order.planId,
      email: order.email,
      createdAt: order.createdAt,
    }
  } catch {
    return null
  }
}

export function subscriptionEndDate(
  order: DemoSubscription,
  plan: SubscriptionPlan,
) {
  const date = new Date(order.createdAt)
  if (plan.id === 'trial') date.setDate(date.getDate() + 7)
  else {
    const day = date.getDate()
    date.setDate(1)
    date.setMonth(date.getMonth() + plan.months + plan.bonusMonths)
    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDate()
    date.setDate(Math.min(day, lastDay))
  }
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Moscow',
  })
    .format(date)
    .replace(' г.', '')
}
