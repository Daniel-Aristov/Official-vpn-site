import { useState } from 'react'
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router'
import { SubscriptionLayout } from '@/components/subscription/SubscriptionLayout'
import { CheckoutCard } from '@/components/subscription/CheckoutCard'
import { PaymentStatusCard } from '@/components/subscription/PaymentStatusCard'
import { MailConfirmation } from '@/components/subscription/MailConfirmation'
import { ConnectionDetails } from '@/components/subscription/ConnectionDetails'
import { SubscriptionSupport } from '@/components/subscription/SubscriptionSupport'
import { SubscriptionFaq } from '@/components/subscription/SubscriptionFaq'
import { ActionLink } from '@/components/UI/ActionLink'
import { InfoIcon } from '@/components/icons/InfoIcon'
import { getSubscriptionPlan, subscriptionPath } from '@/data/subscriptionPlans'
import { supportTelegram } from '@/data/supportContacts'
import {
  isDemoSubscription,
  readDemoSubscription,
  saveDemoSubscription,
  subscriptionEndDate,
} from '@/lib/demoSubscription'

function SubscriptionResultPage({ status }: { status: 'success' | 'error' }) {
  const [params] = useSearchParams()
  const location = useLocation()
  const { state } = location
  const navigate = useNavigate()
  const [order, setOrder] = useState(() =>
    isDemoSubscription(state) ? state : readDemoSubscription(),
  )
  const plan = getSubscriptionPlan(order?.planId ?? params.get('plan'))

  if (status === 'error')
    return (
      <SubscriptionLayout backTo={subscriptionPath(plan.id)}>
        <CheckoutCard aria-labelledby="payment-error-title">
          <span className="flex size-[42px] items-center justify-center rounded-xl bg-error">
            <InfoIcon />
          </span>
          <div className="flex flex-col gap-1">
            <h1 id="payment-error-title" className="text-2xl font-semibold">
              Оплата не прошла!
            </h1>
            <p className="leading-6 text-white-80">
              Обратитесь в нашу поддержку, и мы постараемся решить вашу проблему
              в ближайшее время. Также вы можете вернуться и попробовать ещё
              раз.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <ActionLink
              href={supportTelegram.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              Написать в поддержку
            </ActionLink>
            <ActionLink variant="secondary" to={subscriptionPath(plan.id)}>
              Вернуться и повторить ещё раз
            </ActionLink>
          </div>
        </CheckoutCard>
      </SubscriptionLayout>
    )

  if (!order)
    return (
      <Navigate
        to={subscriptionPath(params.get('plan') ?? undefined)}
        replace
      />
    )

  return (
    <SubscriptionLayout backTo={subscriptionPath(plan.id)}>
      <PaymentStatusCard
        plan={plan}
        endDate={subscriptionEndDate(order, plan)}
      />
      <MailConfirmation
        email={order.email}
        onEmailChange={(email) => {
          const nextOrder = { ...order, email }
          saveDemoSubscription(nextOrder)
          setOrder(nextOrder)
          navigate(
            { pathname: location.pathname, search: location.search },
            { replace: true, state: nextOrder, preventScrollReset: true },
          )
        }}
      />
      <ConnectionDetails />
      <SubscriptionSupport />
      <SubscriptionFaq />
    </SubscriptionLayout>
  )
}

export default SubscriptionResultPage
