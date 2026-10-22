import { PurchaseLink } from '@/components/UI/PurchaseLink'
import { StarIcon } from '@/components/icons/StarIcon'

export function TrialSection() {
  return (
    <section aria-labelledby="trial-title" className="px-4 min-[1000px]:px-0">
      <div className="relative isolate flex min-h-[330px] flex-col items-center justify-between overflow-hidden rounded-3xl border border-white-10 bg-black p-[15px]">
        <img
          src="/assets/trial-background.svg"
          alt=""
          width="360"
          height="6324"
          className="pointer-events-none absolute top-[-71px] left-[-11px] -z-10 h-auto w-[calc(100%+32px)] max-w-none"
        />
        <p className="flex items-center gap-2 rounded-full border border-white-20 px-3 py-2 text-sm leading-[1.3]">
          <StarIcon />
          220 000+ пользователей
        </p>
        <div className="flex flex-col gap-2 text-center">
          <h2 id="trial-title" className="text-2xl leading-[1.3] font-bold">
            7 ДНЕЙ ВСЕГО ЗА 10 ₽
          </h2>
          <p className="text-base leading-[1.3]">
            Личный сервер, высокая скорость
            <br />и свобода выбора локации. Попробуйте Official VPS в деле.
          </p>
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <PurchaseLink planId="trial">Попробовать за 10 ₽</PurchaseLink>
          <p className="text-xs leading-[1.3] text-white-50">
            Отмена в любой момент
          </p>
        </div>
      </div>
    </section>
  )
}
