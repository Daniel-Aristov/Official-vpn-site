import { useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { SubscriptionLayout } from '@/components/subscription/SubscriptionLayout'
import { CheckoutCard } from '@/components/subscription/CheckoutCard'
import { EmailField } from '@/components/subscription/EmailField'
import { PlanPicker } from '@/components/subscription/PlanPicker'
import { PaymentMethodPicker } from '@/components/subscription/PaymentMethodPicker'
import { OrderSummary } from '@/components/subscription/OrderSummary'
import { getSubscriptionPlan } from '@/data/subscriptionPlans'
import {
  readDemoSubscription,
  saveDemoSubscription,
} from '@/lib/demoSubscription'

function SubscriptionPage() {
  const [params, setParams] = useSearchParams()
  const plan = getSubscriptionPlan(params.get('plan'))
  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement>(null)
  const [email, setEmail] = useState(() => readDemoSubscription()?.email ?? '')
  const [accepted, setAccepted] = useState(true)

  return (
    <SubscriptionLayout>
      <div className="flex flex-col gap-2">
        <h1 className="text-[28px] leading-[1.3] font-semibold">
          Оформление подписки
        </h1>
        <p className="text-white-80">
          Больше 10 локаций, 6 устройств, обход белых списков на LTE и Youtube
          без рекламы
        </p>
      </div>
      <form
        ref={formRef}
        className="flex min-w-0 flex-col gap-6"
        onSubmit={(event) => {
          event.preventDefault()
          const paymentMethod = new FormData(event.currentTarget).get(
            'paymentMethod',
          )
          const order = {
            planId: plan.id,
            email: email.trim(),
            createdAt: new Date().toISOString(),
          }
          saveDemoSubscription(order)
          const result =
            paymentMethod === 'card' || params.get('demoResult') === 'error'
              ? 'error'
              : 'success'
          navigate(`/subscribe/${result}?plan=${plan.id}`, { state: order })
        }}
      >
        <PlanPicker
          selected={plan}
          onChange={(id) =>
            setParams(
              (previous) => {
                previous.set('plan', id)
                return previous
              },
              { replace: true, preventScrollReset: true },
            )
          }
        />
        <CheckoutCard>
          <label htmlFor="checkout-email" className="font-medium">
            2. Введите почту для получения покупки
          </label>
          <p id="checkout-email-hint" className="-mt-1 text-checkout-gray">
            Убедитесь, что почта указана верно.
          </p>
          <EmailField
            id="checkout-email"
            aria-describedby="checkout-email-hint"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={() => setEmail(email.trim())}
          />
        </CheckoutCard>
        <PaymentMethodPicker />
        <OrderSummary
          plan={plan}
          accepted={accepted}
          onAcceptedChange={setAccepted}
          onSubmit={() => formRef.current?.requestSubmit()}
        />
      </form>
    </SubscriptionLayout>
  )
}

export default SubscriptionPage
