import type { ReactNode } from 'react'
import { PlusIcon } from '@/components/icons/PlusIcon'
import { MinusIcon } from '@/components/icons/MinusIcon'

interface FaqItemProps {
  id: string
  number: number
  question: string
  isOpen: boolean
  onToggle: () => void
  children: ReactNode
}

export function FaqItem({
  id,
  number,
  question,
  isOpen,
  onToggle,
  children,
}: FaqItemProps) {
  return (
    <article className="rounded-2xl border border-white-10 bg-white-10 p-[15px]">
      <h3>
        <a
          href="#"
          role="button"
          id={`${id}-question`}
          aria-expanded={isOpen}
          aria-controls={`${id}-answer`}
          onKeyDown={(event) => {
            if (event.key === ' ') {
              event.preventDefault()
              event.currentTarget.click()
            }
          }}
          onClick={(event) => {
            event.preventDefault()
            onToggle()
          }}
          className="flex w-full items-center justify-between gap-4 rounded-lg text-left text-base leading-[1.3] font-medium"
        >
          <span className="flex min-w-0 gap-1">
            <span className="min-w-5 shrink-0">{number}.</span>
            <span className="max-w-[215px]">{question}</span>
          </span>
          <span className="flex size-[46px] shrink-0 items-center justify-center rounded-full bg-secondary transition-transform duration-200 ease-out active:scale-95">
            {isOpen ? <MinusIcon /> : <PlusIcon />}
          </span>
        </a>
      </h3>
      <div
        id={`${id}-answer`}
        role="region"
        aria-labelledby={`${id}-question`}
        inert={!isOpen}
        className={`grid transition-[grid-template-rows,opacity] motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr] opacity-100 duration-250 ease-out' : 'grid-rows-[0fr] opacity-0 duration-200 ease-in'}`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-4 pt-4">{children}</div>
        </div>
      </div>
    </article>
  )
}
