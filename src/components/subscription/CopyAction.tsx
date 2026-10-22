import { useEffect, useRef, useState } from 'react'
import { CopyIcon } from '@/components/icons/CopyIcon'
import { CheckIcon } from '@/components/icons/CheckIcon'

export function CopyAction({ value, label }: { value: string; label: string }) {
  const [feedback, setFeedback] = useState('')
  const resetTimerRef = useRef<number | null>(null)
  const isCopied = feedback === 'Скопировано'

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current)
      }
    }
  }, [])

  return (
    <span className="relative inline-flex shrink-0">
      <a
        href="#"
        role="button"
        aria-label={label}
        onKeyDown={(event) => {
          if (event.key === ' ') {
            event.preventDefault()
            event.currentTarget.click()
          }
        }}
        onClick={async (event) => {
          event.preventDefault()
          try {
            await navigator.clipboard.writeText(value)
            if (resetTimerRef.current !== null) {
              window.clearTimeout(resetTimerRef.current)
            }
            setFeedback('Скопировано')
            resetTimerRef.current = window.setTimeout(() => {
              setFeedback('')
              resetTimerRef.current = null
            }, 3000)
          } catch {
            if (resetTimerRef.current !== null) {
              window.clearTimeout(resetTimerRef.current)
              resetTimerRef.current = null
            }
            setFeedback('Не удалось скопировать. Выделите текст вручную.')
          }
        }}
        className="flex size-[46px] items-center justify-center rounded-full bg-primary transition-transform duration-200 ease-out active:scale-95"
      >
        {isCopied ? <CheckIcon /> : <CopyIcon />}
      </a>
      <span role="status" className="sr-only">
        {feedback}
      </span>
      {feedback && !isCopied && (
        <span
          aria-hidden="true"
          className="absolute right-0 bottom-full z-10 mb-2 w-max max-w-[210px] rounded-xl bg-secondary px-3 py-2 text-xs shadow-lg"
          onClick={() => setFeedback('')}
        >
          {feedback}
        </span>
      )}
    </span>
  )
}
