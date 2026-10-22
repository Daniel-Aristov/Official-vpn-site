import { useEffect, useRef, useState } from 'react'
import { CloseIcon } from '@/components/icons/CloseIcon'
import { ActionLink } from '@/components/UI/ActionLink'
import { EmailField } from './EmailField'

export function EmailCorrectionModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean
  onClose: () => void
  onSave: (email: string) => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen) {
      dialog.showModal()
      inputRef.current?.focus()
      const overflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = overflow
      }
    }
    const timer = window.setTimeout(() => dialog.close(), 200)
    return () => window.clearTimeout(timer)
  }, [isOpen])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="edit-email-title"
      aria-describedby="edit-email-description"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return
        const rect = event.currentTarget.getBoundingClientRect()
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onClose()
      }}
      className={`fixed top-auto right-0 bottom-0 left-0 m-0 max-h-dvh w-full max-w-none overflow-y-auto rounded-t-[32px] rounded-b-none border border-white-10 bg-modal p-[23px] pb-[calc(23px+env(safe-area-inset-bottom))] text-base leading-[1.3] text-white tracking-[-0.3px] outline-none backdrop:bg-overlay backdrop:transition-opacity backdrop:duration-200 motion-reduce:transition-none ${isOpen ? 'translate-y-0 opacity-100 transition-[opacity,translate] duration-250 ease-out starting:translate-y-full starting:opacity-0' : 'translate-y-full opacity-0 transition-[opacity,translate] duration-200 ease-in backdrop:opacity-0'}`}
    >
      <form
        ref={formRef}
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault()
          onSave(email.trim())
          setEmail('')
          onClose()
        }}
      >
        <div className="flex items-center justify-between gap-2.5">
          <h2
            id="edit-email-title"
            className="text-2xl leading-[1.3] font-semibold"
          >
            Ввели не ту почту?
          </h2>
          <a
            href="#"
            role="button"
            aria-label="Закрыть окно смены почты"
            onKeyDown={(event) => {
              if (event.key === ' ') {
                event.preventDefault()
                event.currentTarget.click()
              }
            }}
            onClick={(event) => {
              event.preventDefault()
              onClose()
            }}
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white-10 ring-1 ring-white-20 ring-inset transition-transform duration-200 ease-out active:scale-95"
          >
            <CloseIcon />
          </a>
        </div>
        <p id="edit-email-description" className="text-white-80">
          Укажите действующий адрес электронной почты, чтобы мы отправили
          информацию о покупке.
        </p>
        <EmailField
          ref={inputRef}
          aria-label="Новый адрес электронной почты"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={() => setEmail(email.trim())}
          className="bg-white-20"
        />
        <ActionLink
          role="button"
          onKeyDown={(event) => {
            if (event.key === ' ') {
              event.preventDefault()
              event.currentTarget.click()
            }
          }}
          onClick={(event) => {
            event.preventDefault()
            formRef.current?.requestSubmit()
          }}
        >
          Отправить
        </ActionLink>
      </form>
    </dialog>
  )
}
