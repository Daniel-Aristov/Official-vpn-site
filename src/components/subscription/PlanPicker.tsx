import { useState } from 'react'
import {
  subscriptionPlans,
  formatPrice,
  type SubscriptionPlan,
} from '@/data/subscriptionPlans'
import { RadioSelectedIcon } from '@/components/icons/RadioSelectedIcon'
import { RadioInnerIcon } from '@/components/icons/RadioInnerIcon'

export function PlanPicker({
  selected,
  onChange,
}: {
  selected: SubscriptionPlan
  onChange: (id: string) => void
}) {
  const [entryPlanId] = useState(selected.id)
  const order = [entryPlanId, '3', '6', '12', '1', 'trial'].filter(
    (id, index, ids) => ids.indexOf(id) === index,
  )

  return (
    <fieldset className="min-w-0 rounded-3xl bg-white-10 p-4">
      <legend className="sr-only">Выберите тариф</legend>
      <p className="mb-3 font-medium" aria-hidden="true">
        1. Выберите тариф
      </p>
      <div className="flex snap-x gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {order.map((id) => {
          const plan = subscriptionPlans.find((item) => item.id === id)!
          const isSelected = selected.id === id
          return (
            <label
              key={id}
              className="relative shrink-0 cursor-pointer snap-start"
            >
              <input
                type="radio"
                name="plan"
                value={id}
                checked={isSelected}
                onChange={() => onChange(id)}
                className="peer absolute inset-0 z-10 size-full cursor-pointer opacity-0"
              />
              <span
                className={`flex min-h-[83px] flex-col gap-2 rounded-2xl px-3 py-2 ring-1 ring-inset transition-colors duration-150 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-glow-cyan ${isSelected ? 'bg-primary-30 ring-primary' : 'bg-white-10 ring-white-10'}`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5 whitespace-nowrap font-medium">
                    {plan.duration}
                    {plan.bonusMonths > 0 && (
                      <>
                        <span
                          aria-hidden="true"
                          className="h-4 w-px bg-white-20"
                        />
                        <span className="text-checkout-gift">
                          🎁 + {plan.bonusMonths} в мес.
                        </span>
                      </>
                    )}
                  </span>
                  {isSelected ? (
                    <RadioSelectedIcon className="shrink-0" />
                  ) : (
                    <RadioInnerIcon className="shrink-0 [clip-path:circle(12px_at_center)]" />
                  )}
                </span>
                <span className="flex items-center gap-2">
                  <strong className="text-2xl leading-[1.3] font-bold whitespace-nowrap">
                    {formatPrice(plan.price)}
                  </strong>
                  {plan.oldPrice && (
                    <s className="text-white-50">
                      {formatPrice(plan.oldPrice)}
                    </s>
                  )}
                </span>
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
