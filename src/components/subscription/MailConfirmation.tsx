import { useEffect, useState } from 'react'
import { MailIcon } from '@/components/icons/MailIcon'
import { ActionLink } from '@/components/UI/ActionLink'
import { CheckoutCard } from './CheckoutCard'
import { EmailCorrectionModal } from './EmailCorrectionModal'

export function MailConfirmation({
  email,
  onEmailChange,
}: {
  email: string
  onEmailChange: (email: string) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [deadline, setDeadline] = useState(0)
  const [now, setNow] = useState(0)
  const remaining = Math.max(0, Math.ceil((deadline - now) / 1000))

  useEffect(() => {
    if (!deadline) return
    const timer = window.setInterval(() => {
      const current = Date.now()
      setNow(current)
      if (current >= deadline) window.clearInterval(timer)
    }, 1000)
    return () => window.clearInterval(timer)
  }, [deadline])

  const resend = () => {
    const current = Date.now()
    setNow(current)
    setDeadline(current + 40_000)
  }

  return (
    <>
      <CheckoutCard
        className="border border-white-10 p-[15px]"
        aria-label="Подтверждение на почту"
      >
        <div className="flex items-start gap-3">
          <span className="flex size-11.5 shrink-0 items-center justify-center rounded-2xl bg-white-10">
            <MailIcon />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <p className="wrap-break-words">
              Мы отправили на вашу почту
              <br />
              <span className="wrap-anywhere">{email}</span> подтверждение
              успешной оплаты.
            </p>
            <div className="flex flex-col items-start gap-2">
              <ActionLink
                variant="secondary"
                size="small"
                fullWidth={false}
                role="button"
                disabled={remaining > 0}
                onKeyDown={(event) => {
                  if (event.key === ' ') {
                    event.preventDefault()
                    event.currentTarget.click()
                  }
                }}
                onClick={(event) => {
                  event.preventDefault()
                  if (!remaining) resend()
                }}
              >
                {remaining ? 'Отправили еще раз' : 'Отправить ещё раз'}
              </ActionLink>
              {remaining > 0 && (
                <p
                  role="timer"
                  aria-label="До повторной отправки"
                  className="text-xs text-white-50"
                >
                  Отправить ещё раз через {remaining}с
                </p>
              )}
              <ActionLink
                variant="secondary"
                size="small"
                fullWidth={false}
                role="button"
                onKeyDown={(event) => {
                  if (event.key === ' ') {
                    event.preventDefault()
                    event.currentTarget.click()
                  }
                }}
                onClick={(event) => {
                  event.preventDefault()
                  setIsEditing(true)
                }}
              >
                {remaining ? 'Ввели не ту почту?' : 'Ввели не ту почту?'}
              </ActionLink>
            </div>
          </div>
        </div>
      </CheckoutCard>
      <EmailCorrectionModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={(nextEmail) => {
          onEmailChange(nextEmail)
          resend()
        }}
      />
    </>
  )
}
