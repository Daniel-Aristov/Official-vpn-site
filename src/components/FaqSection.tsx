import { useState } from 'react'
import { SectionHeading } from '@/components/UI/SectionHeading'
import { FaqItem } from '@/components/UI/FaqItem'

import { ActionLink } from '@/components/UI/ActionLink'
import { useAnchorScroll } from '@/hooks/useAnchorScroll'
import {
  formatPlanPeriod,
  formatPrice,
  getSubscriptionPlan,
  subscriptionPath,
} from '@/data/subscriptionPlans'

interface FaqQuestion {
  question: string
  answer: string
  action?: {
    label: string
    href: string
    anchor?: boolean
  }
}

const trialPlan = getSubscriptionPlan('trial')

const questions: FaqQuestion[] = [
  {
    question: 'Как подключить Official VPS?',
    answer:
      'Выберите подходящий тариф и перейдите к оформлению заказа. Укажите свой email, выберите способ оплаты и завершите оплату. После этого вы получите всё необходимое для подключения.',
    action: {
      label: 'Перейти к тарифам',
      href: '#pricing',
      anchor: true,
    },
  },
  {
    question: 'Можно ли сначала попробовать Official VPS?',
    answer: `Конечно! Попробуйте Official VPS в течение ${formatPlanPeriod(trialPlan)} всего за ${formatPrice(trialPlan.price)}. Вам будут доступны все возможности сервиса и высокая скорость соединения.`,
    action: {
      label: `Попробовать за ${formatPrice(trialPlan.price)}`,
      href: subscriptionPath(trialPlan.id),
    },
  },
  {
    question: 'Что будет после пробного периода?',
    answer:
      'После окончания пробного периода начнёт действовать выбранный тариф. Если сервис вам не подойдёт, вы сможете отменить подписку в личном кабинете.',
  },
  {
    question: 'Есть ли ограничения по трафику?',
    answer: 'Нет, на всех тарифах доступен безлимитный трафик.',
  },
  {
    question: 'Безопасен ли наш VPS?',
    answer:
      'Мы используем шифрование для защиты передаваемых данных. Мы не храним пользовательские данные и не передаем их третьим лицам.',
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const scrollToAnchor = useAnchorScroll()

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="flex scroll-mt-6 flex-col gap-4 px-4 min-[1000px]:px-0"
    >
      <SectionHeading id="faq-title" title="Ответы на часто задаваемые вопросы">
        В случае других вопросов, поддержка всегда на связи!
      </SectionHeading>
      <div className="flex flex-col gap-4">
        {questions.map(({ question, answer, action }, index) => {
          const isOpen = openIndex === index
          return (
            <FaqItem
              key={question}
              id={`faq-${index}`}
              number={index + 1}
              question={question}
              isOpen={isOpen}
              onToggle={() => setOpenIndex(isOpen ? null : index)}
            >
              <p className="text-base leading-[1.3] font-medium text-white-80">
                {answer}
              </p>
              {action && (
                <ActionLink
                  size="compact"
                  href={action.anchor ? action.href : undefined}
                  to={action.anchor ? undefined : action.href}
                  onClick={action.anchor ? scrollToAnchor : undefined}
                >
                  {action.label}
                </ActionLink>
              )}
            </FaqItem>
          )
        })}
      </div>
    </section>
  )
}
