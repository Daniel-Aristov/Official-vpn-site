import { SectionHeading } from '@/components/UI/SectionHeading'
import { SpeedIcon } from '@/components/icons/SpeedIcon'
import { TrafficIcon } from '@/components/icons/TrafficIcon'
import { ShieldIcon } from '@/components/icons/ShieldIcon'
import { LocationIcon } from '@/components/icons/LocationIcon'
import { SmileIcon } from '@/components/icons/SmileIcon'
import { SettingsIcon } from '@/components/icons/SettingsIcon'

const features = [
  {
    Icon: SpeedIcon,
    title: 'Скорость без просадок',
    description:
      'Быстрое соединение для повседневных задач, работы, видео и приложений.',
    tone: 'border-feature-speed-border bg-linear-135 from-feature-speed to-feature-speed-end shadow-[inset_0_0_15px_var(--color-feature-speed-glow)]',
  },
  {
    Icon: TrafficIcon,
    title: 'Трафик без ограничений',
    description:
      'Смотрите видео, скачивайте файлы и общайтесь без ограничений по трафику.',
    tone: 'border-feature-traffic-border bg-linear-135 from-feature-traffic to-feature-traffic-end shadow-[inset_0_0_15px_var(--color-feature-traffic-glow)]',
  },
  {
    Icon: ShieldIcon,
    title: 'Ваш интернет — ваше дело',
    description:
      'Дополнительный уровень приватности в сети. Пользуйтесь интернетом с большим спокойствием за своё соединение.',
    tone: 'border-feature-shield-border bg-linear-135 from-feature-shield to-feature-shield-end shadow-[inset_0_0_15px_var(--color-feature-shield-glow)]',
  },
  {
    Icon: LocationIcon,
    title: '10+ локаций по всему миру',
    description:
      'Европа, США и другие регионы. Выбирайте локацию, а мы будем добавлять новые.',
    tone: 'border-feature-location-border bg-linear-135 from-feature-location to-feature-location-end shadow-[inset_0_0_15px_var(--color-feature-location-glow)]',
  },
  {
    Icon: SmileIcon,
    title: 'За экраном — живые люди',
    description:
      'Поможем с любыми вопросами. А если захочется просто поболтать, то welcome. Мы здесь не только ради серверов.',
    tone: 'border-feature-people-border bg-linear-135 from-feature-people to-feature-people-end shadow-[inset_0_0_15px_var(--color-feature-people-glow)]',
  },
  {
    Icon: SettingsIcon,
    title: 'Подключение за пару минут',
    description:
      'Понятная инструкция для смартфона, компьютера или планшета. Всё настроите за пару минут, даже если делаете это впервые.',
    tone: 'border-feature-setup-border bg-linear-135 from-feature-setup to-feature-setup-end shadow-[inset_0_0_15px_var(--color-feature-setup-glow)]',
  },
]

export function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="flex scroll-mt-6 flex-col gap-4 px-4 min-[1000px]:px-0"
    >
      <SectionHeading id="features-title" title="Возможности OFL VPS">
        Все необходимое для стабильного подключения
      </SectionHeading>
      <div className="grid gap-4 md:grid-cols-2">
        {features.map(({ Icon, title, description, tone }) => (
          <article
            key={title}
            className="flex flex-col gap-2 rounded-3xl border border-white-10 bg-white-10 p-[15px]"
          >
            <div
              className={`flex size-[42px] shrink-0 items-center justify-center rounded-xl border-[0.75px] ${tone}`}
            >
              <Icon />
            </div>
            <h3 className="text-xl leading-[1.3] font-semibold">{title}</h3>
            <p className="text-sm leading-[1.3] text-white-80">{description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
