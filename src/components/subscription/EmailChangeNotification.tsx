import { useEffect, useState } from 'react'
import { CheckIcon } from '@/components/icons/CheckIcon'
import { CloseIcon } from '@/components/icons/CloseIcon'

export function EmailChangeNotification({
  email,
  onClose,
}: {
  email: string
  onClose: () => void
}) {
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsClosing(true), 3000)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isClosing) return
    const timer = window.setTimeout(onClose, 200)
    return () => window.clearTimeout(timer)
  }, [isClosing, onClose])

  return (
    <div
      className={`fixed inset-x-4 top-[max(8px,env(safe-area-inset-top))] z-80 mx-auto max-w-[608px] rounded-3xl border border-white-10 bg-black-40 p-[15px] backdrop-blur-[30px] transition-[opacity,translate] duration-200 ease-out motion-reduce:transition-none ${isClosing ? 'pointer-events-none -translate-y-3 opacity-0' : 'translate-y-0 opacity-100 starting:-translate-y-3 starting:opacity-0'}`}
    >
      <div
        className="flex flex-col gap-3 pr-10"
        role="status"
        aria-atomic="true"
      >
        <CheckIcon className="size-6 text-success [&_path]:fill-current" />
        <p className="text-[18px] font-semibold text-success">
          Почта успешно изменена
        </p>
        <p className="text-[16px] wrap-anywhere text-white-80">{email}</p>
      </div>
      <a
        href="#"
        role="button"
        aria-label="Закрыть уведомление о смене почты"
        onKeyDown={(event) => {
          if (event.key === ' ') {
            event.preventDefault()
            event.currentTarget.click()
          }
        }}
        onClick={(event) => {
          event.preventDefault()
          setIsClosing(true)
        }}
        className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-white-10 ring-1 ring-white-20 ring-inset"
      >
        <CloseIcon />
      </a>
    </div>
  )
}
