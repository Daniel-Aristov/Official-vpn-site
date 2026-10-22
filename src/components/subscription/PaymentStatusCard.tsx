import { CheckoutCard } from './CheckoutCard'
import { CheckIcon } from '@/components/icons/CheckIcon'
import {
  formatPlanPeriod,
  type SubscriptionPlan,
} from '@/data/subscriptionPlans'

export function PaymentStatusCard({
  plan,
  endDate,
}: {
  plan: SubscriptionPlan
  endDate: string
}) {
  return (
    <CheckoutCard className="gap-3" aria-labelledby="payment-success-title">
      <span className="flex size-[42px] items-center justify-center rounded-xl bg-success">
        <CheckIcon />
      </span>
      <h1
        id="payment-success-title"
        className="text-2xl leading-[1.3] font-semibold"
      >
        Подписка оплачена!
      </h1>
      <dl className="flex flex-col gap-2 rounded-3xl bg-white-10 p-4">
        <div className="flex items-start justify-between gap-2">
          <dt className="font-medium">Тариф</dt>
          <dd className="text-right text-white-80">{formatPlanPeriod(plan)}</dd>
        </div>
        <div className="flex items-start justify-between gap-2">
          <dt className="font-medium">Период</dt>
          <dd className="text-right text-white-80">до {endDate}</dd>
        </div>
      </dl>
    </CheckoutCard>
  )
}
