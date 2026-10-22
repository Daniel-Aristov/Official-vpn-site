import { SectionHeading } from '@/components/UI/SectionHeading'

const steps = [
  {
    title: 'Выберите тариф',
    text: 'Выберите подходящий срок PRO и оформите подписку.',
  },
  {
    title: 'Получите доступ',
    text: 'После оплаты данные для подключения будут доступны сразу',
  },
  {
    title: 'Выберите сервер',
    text: 'Выберите подходящую локацию и подключитесь.',
  },
  { title: 'Готово', text: 'Используйте подключение на своих устройствах.' },
]

export function ConnectionSection() {
  return (
    <section
      id="connection"
      aria-labelledby="connection-title"
      className="flex scroll-mt-6 flex-col gap-6 bg-white-10 px-4 py-9 min-[1000px]:rounded-2xl"
    >
      <SectionHeading
        id="connection-title"
        title={
          <>
            Подключение
            <br />
            за несколько шагов
          </>
        }
      >
        3 шага и готово
      </SectionHeading>
      <ol className="grid gap-6 md:grid-cols-2">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="flex items-start gap-4 rounded-3xl border border-white-10 bg-white-10 p-[15px]"
          >
            <span className="flex size-[42px] shrink-0 items-center justify-center rounded-xl bg-white-10 text-lg leading-[1.3] font-bold">
              {index + 1}
            </span>
            <div className="flex min-w-0 flex-col gap-2">
              <h3 className="text-lg leading-[1.3] font-bold">{step.title}</h3>
              <p className="text-base leading-[1.3] text-white-80">
                {step.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
