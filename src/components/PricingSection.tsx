import { PurchaseLink } from '@/components/UI/PurchaseLink'
import { BenefitBadges } from '@/components/UI/BenefitBadges'
import { SectionHeading } from '@/components/UI/SectionHeading'
import { formatPrice, subscriptionPlans } from '@/data/subscriptionPlans'

const plans = subscriptionPlans.filter((plan) => plan.id !== 'trial')

export function PricingSection() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="flex scroll-mt-6 flex-col gap-6 bg-white-10 px-4 py-9 min-[1000px]:rounded-2xl"
    >
      <div className="flex flex-col gap-4">
        <SectionHeading id="pricing-title" title="Тарифы">
          Выберите подходящий план
        </SectionHeading>
        <BenefitBadges />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <article
            key={plan.duration}
            className={`relative flex flex-col gap-2 rounded-3xl border p-[15px] ${plan.popular ? 'border-primary bg-primary-30' : 'border-white-10 bg-white-10'}`}
          >
            {plan.popular && (
              <p className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-primary bg-primary-30 px-3 py-1 text-xs leading-[1.3] font-medium whitespace-nowrap backdrop-blur-sm">
                Самый популярный тариф
              </p>
            )}
            <div className="flex items-start justify-between gap-1">
              <div className="flex min-w-0 flex-col gap-1">
                <h3 className="flex min-h-6 items-center text-lg leading-[1.3] font-semibold">
                  {plan.duration}
                </h3>
                {plan.bonusMonths > 0 && (
                  <p
                    className={`self-start rounded-2xl px-2 py-1 text-sm leading-[1.3] whitespace-nowrap ${plan.giftClass}`}
                  >
                    🎁 + {plan.bonusMonths}{' '}
                    {plan.bonusMonths === 1 ? 'месяц' : 'месяца'} в подарок
                  </p>
                )}
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <p className="text-2xl leading-[1.3] font-semibold whitespace-nowrap">
                  {formatPrice(plan.price)}
                </p>
                {plan.oldPrice && (
                  <s className="text-sm leading-[1.3] text-white-50">
                    {formatPrice(plan.oldPrice)}
                  </s>
                )}
              </div>
            </div>
            <PurchaseLink
              planId={plan.id}
              size="compact"
              aria-label={`Купить тариф на ${plan.duration}`}
            >
              Купить
            </PurchaseLink>
          </article>
        ))}
      </div>
    </section>
  )
}
