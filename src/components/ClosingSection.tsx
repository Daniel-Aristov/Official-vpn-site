import { PurchaseLink } from '@/components/UI/PurchaseLink'
import { BenefitBadges } from '@/components/UI/BenefitBadges'

export function ClosingSection() {
  return (
    <section
      aria-labelledby="closing-title"
      className="flex flex-col gap-6 bg-white-10 px-4 py-9 min-[1000px]:rounded-2xl"
    >
      <div className="flex flex-col gap-3">
        <h2 id="closing-title" className="text-4xl leading-[1.2] font-bold">
          Ваша точка подключения
          <br />— всегда рядом
        </h2>
        <p className="text-base leading-[1.3]">
          Получите доступ к нашей серверной инфраструктуре и выбирайте
          подходящую локацию в любой момент.
        </p>
      </div>
      <BenefitBadges />
      <PurchaseLink>Выбрать тарифы от 299 ₽</PurchaseLink>
    </section>
  )
}
