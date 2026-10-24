import { ActionLink } from '@/components/UI/ActionLink'
import { CheckoutCard } from './CheckoutCard'
import { CheckboxCheckedIcon } from '@/components/icons/CheckboxCheckedIcon'
import { formatPrice, type SubscriptionPlan } from '@/data/subscriptionPlans'
import { Link } from 'react-router'
import { legalDocumentPaths } from '@/data/legalDocuments'

export function OrderSummary({
  plan,
  accepted,
  onAcceptedChange,
  onSubmit,
}: {
  plan: SubscriptionPlan
  accepted: boolean
  onAcceptedChange: (value: boolean) => void
  onSubmit: () => void
}) {
  return (
    <CheckoutCard aria-label="Итог заказа">
      <dl className="flex flex-col gap-4 font-medium">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-white-80">Тариф</dt>
          <dd className="flex min-w-0 flex-wrap items-center justify-end gap-1.5 text-right">
            {plan.bonusMonths > 0 && (
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="text-checkout-gift">
                  <span aria-hidden="true">🎁</span> + {plan.bonusMonths}{' '}
                  {plan.bonusMonths === 1 ? 'месяц' : 'месяца'}
                </span>
                <span aria-hidden="true" className="h-4 w-px bg-white-20" />
              </span>
            )}
            <span className="whitespace-nowrap">{plan.duration}</span>
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-white-80">Итого</dt>
          <dd
            aria-live="polite"
            className="flex flex-wrap items-center justify-end gap-2"
          >
            {plan.oldPrice && (
              <s className="font-normal whitespace-nowrap text-white-50">
                {formatPrice(plan.oldPrice)}
              </s>
            )}
            <strong className="text-2xl leading-[1.3] font-bold whitespace-nowrap">
              {formatPrice(plan.price)}
            </strong>
          </dd>
        </div>
      </dl>
      <hr className="border-white-10" />
      <div className="flex items-start gap-2">
        <label className="relative flex size-7 shrink-0 cursor-pointer items-center justify-center">
          <input
            type="checkbox"
            name="consent"
            required
            checked={accepted}
            onChange={(event) => onAcceptedChange(event.target.checked)}
            aria-label="Я соглашаюсь с офертой и политикой конфиденциальности"
            className="peer absolute inset-0 z-10 size-full cursor-pointer opacity-0"
          />
          <span className="rounded peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-glow-cyan">
            {accepted ? (
              <CheckboxCheckedIcon />
            ) : (
              <span className="m-0.5 block size-6 rounded border-2 border-white-20" />
            )}
          </span>
        </label>
        <p className="text-sm text-white-50">
          Я соглашаюсь с{' '}
          <Link
            to={legalDocumentPaths.offer}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-4"
          >
            офертой
          </Link>{' '}
          и{' '}
          <Link
            to={legalDocumentPaths.privacy}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-4"
          >
            политикой конфиденциальности
          </Link>
        </p>
      </div>
      <ActionLink
        role="button"
        onClick={(event) => {
          event.preventDefault()
          onSubmit()
        }}
        onKeyDown={(event) => {
          if (event.key === ' ') {
            event.preventDefault()
            event.currentTarget.click()
          }
        }}
      >
        Оплатить
      </ActionLink>
      <p className="text-center text-sm text-white-50">
        {plan.id === 'trial'
          ? '7 дней за 10 ₽, далее 299 ₽ в месяц. '
          : 'Нажимая «Оплатить», вы соглашаетесь на ежемесячное списание 299 ₽. '}
        Автопродление можно отключить в личном кабинете в любой момент.
      </p>
    </CheckoutCard>
  )
}
