import { PurchaseLink } from '@/components/UI/PurchaseLink'
import { BenefitBadges } from '@/components/UI/BenefitBadges'
import { StarIcon } from '@/components/icons/StarIcon'
import { InfinityIcon } from '@/components/icons/InfinityIcon'
import { GlobeIcon } from '@/components/icons/GlobeIcon'
import { BanIcon } from '@/components/icons/BanIcon'

const facts = [
  { Icon: StarIcon, text: '220 000+ пользователей' },
  { Icon: InfinityIcon, text: 'Безлимитный трафик' },
  { Icon: GlobeIcon, text: '10+ локаций' },
  { Icon: BanIcon, text: 'Отмена в любой момент' },
]

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="flex flex-col gap-6 px-4 min-[1000px]:px-0"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h1
            id="hero-title"
            className="max-w-[600px] text-4xl leading-[1.2] font-bold"
          >
            Персональный сервер в любой точке мира
          </h1>
          <p className="max-w-[600px] text-base leading-[1.3]">
            Подключайтесь к серверам в разных локациях и получайте стабильное
            соединение с высокой скоростью.
          </p>
        </div>
        <BenefitBadges />
      </div>
      <div className="flex flex-col gap-3">
        <PurchaseLink planId="1">Купить от 299 ₽ в месяц</PurchaseLink>
        <div className="flex flex-col gap-1">
          <PurchaseLink planId="trial" variant="secondary">
            Попробовать за 10 ₽
          </PurchaseLink>
          <p className="text-center text-sm leading-[1.3] text-white-50">
            7 дней пробного периода, далее 299 ₽ в месяц
          </p>
        </div>
      </div>
      <ul className="flex flex-col gap-3 text-sm leading-[1.3]">
        {facts.map(({ Icon, text }) => (
          <li key={text} className="flex items-center gap-2">
            <Icon className="shrink-0" />
            {text}
          </li>
        ))}
      </ul>
    </section>
  )
}
