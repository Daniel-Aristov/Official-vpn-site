import { useState } from 'react'
import { FaqItem } from '@/components/UI/FaqItem'
import { SectionHeading } from '@/components/UI/SectionHeading'
import { ActionLink } from '@/components/UI/ActionLink'

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
    <section
      className="flex min-w-0 flex-col gap-4"
      aria-labelledby="subscription-faq-title"
    >
      <SectionHeading
        id="subscription-faq-title"
        title="Ответы на часто задаваемые вопросы"
      />
      <div className="flex flex-col gap-4">
        {questions.map((question, index) => {
          const isOpen = openIndex === index
          return (
            <FaqItem
              key={question.title}
              id={`subscription-faq-${index}`}
              number={index + 1}
              question={question.title}
              isOpen={isOpen}
              onToggle={() => setOpenIndex(isOpen ? null : index)}
            >
              <p className="text-base leading-[1.3] font-medium text-white-80">
                {question.text}
              </p>
              {question.link && (
                <ActionLink
                  size="compact"
                  href={question.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Перейти сразу в нужное место
                </ActionLink>
              )}
            </FaqItem>
          )
        })}
      </div>
    </section>
  )
}
