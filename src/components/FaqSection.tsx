import { useState } from 'react'
import { SectionHeading } from '@/components/UI/SectionHeading'
import { PlusIcon } from '@/components/icons/PlusIcon'
import { MinusIcon } from '@/components/icons/MinusIcon'

const questions = [
  {
    question: 'Где расположены серверы?',
    answer:
      'Серверы доступны в разных регионах мира, включая Европу, США и Россию. Мы постоянно расширяем географию и добавляем новые локации.',
  },
  {
    question: 'Сколько устройств можно подключить?',
    answer:
      'Один доступ можно использовать на 6 устройствах: смартфоне, компьютере, планшете и других устройствах.',
  },
  {
    question: 'Можно ли менять локацию?',
    answer:
      'Да, вы можете выбирать подходящую локацию и переключаться между серверами в несколько нажатий.',
  },
  {
    question: 'Какие локации у нас доступны?',
    answer:
      'Доступны 10+ локаций в Европе, США и других регионах, в том числе Германия, Финляндия и Польша. Новые локации постоянно добавляются.',
  },
  {
    question: 'Какие возможности есть у PRO?',
    answer:
      'PRO включает доступ ко всем локациям, высокую скорость, безлимитный трафик и подключение до 6 устройств.',
  },
  {
    question: 'На какой срок можно оформить доступ?',
    answer:
      'Доступ можно оформить на 1, 3, 6 или 12 месяцев. При оплате на 3, 6 или 12 месяцев вы получаете дополнительные месяцы в подарок.',
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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
        {questions.map(({ question, answer }, index) => {
          const isOpen = openIndex === index
          return (
            <article
              key={question}
              className="rounded-2xl border border-white-10 bg-white-10 p-[15px]"
            >
              <h3>
                <a
                  href="#"
                  role="button"
                  id={`question-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`answer-${index}`}
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
                  className="flex w-full items-start justify-between gap-4 rounded-lg text-left text-base leading-[1.3] font-medium"
                >
                  <span className="flex min-w-0 gap-1 pt-0.5">
                    <span className="min-w-5 shrink-0">{index + 1}.</span>
                    <span className="max-w-[200px]">{question}</span>
                  </span>
                  <span className="flex size-[46px] shrink-0 items-center justify-center rounded-full bg-secondary transition-transform duration-200 ease-out active:scale-95">
                    {isOpen ? <MinusIcon /> : <PlusIcon />}
                  </span>
                </a>
              </h3>
              <div
                id={`answer-${index}`}
                role="region"
                aria-labelledby={`question-${index}`}
                inert={!isOpen}
                className={`grid transition-[grid-template-rows,opacity] motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr] opacity-100 duration-250 ease-out' : 'grid-rows-[0fr] opacity-0 duration-200 ease-in'}`}
              >
                <div className="overflow-hidden">
                  <p className="pt-4 text-base leading-[1.3] font-medium text-white-80">
                    {answer}
                  </p>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
