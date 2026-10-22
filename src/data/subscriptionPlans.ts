export interface SubscriptionPlan {
  id: string
  duration: string
  price: number
  months: number
  bonusMonths: number
  oldPrice?: number
  giftClass?: string
  popular?: boolean
}

export const subscriptionPlans: SubscriptionPlan[] = [
  { id: '1', duration: '1 месяц', price: 299, months: 1, bonusMonths: 0 },
  {
    id: '3',
    duration: '3 месяца',
    price: 897,
    months: 3,
    bonusMonths: 1,
    oldPrice: 1196,
    giftClass: 'bg-gift-blue',
    popular: true,
  },
  {
    id: '6',
    duration: '6 месяцев',
    price: 1794,
    months: 6,
    bonusMonths: 2,
    oldPrice: 2392,
    giftClass: 'bg-gift-gray',
  },
  {
    id: '12',
    duration: '12 месяцев',
    price: 3588,
    months: 12,
    bonusMonths: 4,
    oldPrice: 4784,
    giftClass: 'bg-gift-gold',
  },
  {
    id: 'trial',
    duration: 'Пробный период',
    price: 10,
    months: 0,
    bonusMonths: 0,
  },
]

export const defaultPlanId = '3'

export function getSubscriptionPlan(id: string | null | undefined) {
  return (
    subscriptionPlans.find((plan) => plan.id === id) ?? subscriptionPlans[1]
  )
}

export function subscriptionPath(planId = defaultPlanId) {
  return `/subscribe?plan=${encodeURIComponent(planId)}`
}

export function formatPrice(price: number) {
  return `${new Intl.NumberFormat('ru-RU').format(price)} ₽`
}

export function formatPlanPeriod(plan: SubscriptionPlan) {
  if (!plan.months) return '7 дней'
  if (!plan.bonusMonths) return plan.duration
  return `${plan.months} + ${plan.bonusMonths} ${plan.bonusMonths === 1 ? 'месяц' : 'месяца'} в подарок`
}
