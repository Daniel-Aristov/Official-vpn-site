import { useState } from 'react'
import { PlusIcon } from '@/components/icons/PlusIcon'
import { MinusIcon } from '@/components/icons/MinusIcon'
import { ActionLink } from '@/components/UI/ActionLink'
import { CheckoutCard } from './CheckoutCard'

const questions = [
  {
    title: 'Как подключить к VPN',
    text: 'Перейдите в личный кабинет и нажмите кнопку «Установка и настройка». Следуйте пошаговой инструкции, чтобы установить и настроить VPN.',
    link: true,
    href: 'https://oflvpn.com/setup',
  },
  {
    title: 'Стоимость подписки и количество устройств',
    text: 'Минимальная подписка стоит 299 рублей в месяц и включает до 6-ти подключаемых устройств со следующими доступными локациями: США, ОАЭ, Финляндия, Германия, Япония, Болгария, Казахстан, Турция, Аргентина, Польша, Россия, локация для обхода белых списков, + локации из тарифа Basic. На всех подписках при подключении к «Умной маршрутизации» Youtube без рекламы.',
    link: false,
  },
  {
    title: 'Как продлить текущую подписку?',
    text: 'Перейдите в личный кабинет и нажмите кнопку «Продлить VPN». Выберите количество устройств и желаемый период подписки, затем перейдите к оплате.',
    link: true,
    href: 'https://oflvpn.com/subscription',
  },
  {
    title: 'Где посмотреть список устройств, где добавлен ключ?',
    text: 'Перейдите в личный кабинет, откройте раздел «Профиль» и выберите пункт «Устройства». В этом разделе вы можете удалить ненужные устройства.',
    link: true,
    href: 'https://oflvpn.com/devices',
  },
  {
    title: 'Безопасен ли наш VPN',
    text: 'Мы используем шифрование для защиты передаваемых данных. Мы не храним пользовательские данные и не передаем их третьим лицам.',
    link: false,
  },
]

export function SubscriptionFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <CheckoutCard
      className="border border-white-10 p-[15px]"
      aria-labelledby="subscription-faq-title"
    >
      <h2 id="subscription-faq-title" className="font-medium">
        Ответы на часто задаваемые вопросы
      </h2>
      {questions.map((question, index) => {
        const isOpen = openIndex === index
        return (
          <article
            key={question.title}
            className="rounded-2xl bg-white-10 p-4 ring-1 ring-white-10 ring-inset"
          >
            <h3>
              <a
                href="#"
                role="button"
                id={`subscription-question-${index}`}
                aria-controls={`subscription-answer-${index}`}
                aria-expanded={isOpen}
                className="flex items-center justify-between gap-4 font-medium"
                onKeyDown={(event) => {
                  if (event.key === ' ') {
                    event.preventDefault()
                    event.currentTarget.click()
                  }
                }}
                onClick={(event) => {
                  event.preventDefault()
                  setOpenIndex(isOpen ? null : index)
                }}
              >
                <span>
                  {index + 1}. {question.title}
                </span>
                <span className="flex size-[46px] shrink-0 items-center justify-center rounded-full bg-secondary">
                  {isOpen ? <MinusIcon /> : <PlusIcon />}
                </span>
              </a>
            </h3>
            <div
              id={`subscription-answer-${index}`}
              role="region"
              aria-labelledby={`subscription-question-${index}`}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr] opacity-100 duration-250 ease-out' : 'grid-rows-[0fr] opacity-0 duration-200 ease-in'}`}
            >
              <div className="overflow-hidden">
                <div className="flex flex-col gap-4 pt-4">
                  <p className="text-white-80">{question.text}</p>
                  {question.link && (
                    <ActionLink href={question.href} target="blank">
                      Перейти сразу в нужное место
                    </ActionLink>
                  )}
                </div>
              </div>
            </div>
          </article>
        )
      })}
    </CheckoutCard>
  )
}
