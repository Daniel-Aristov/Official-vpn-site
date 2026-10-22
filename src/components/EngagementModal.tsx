import { useEffect, useRef } from 'react'
import { ActionLink } from '@/components/UI/ActionLink'
import { PurchaseLink } from '@/components/UI/PurchaseLink'
import { BenefitBadges } from '@/components/UI/BenefitBadges'

interface EngagementModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EngagementModal({ isOpen, onClose }: EngagementModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen) {
      dialog.showModal()
      dialog.focus()
      const previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = previousOverflow
      }
    }
    const timer = window.setTimeout(() => dialog.close(), 200)
    return () => window.clearTimeout(timer)
  }, [isOpen])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="offer-title"
      aria-describedby="offer-description"
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
      className={`fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-16px)] max-w-[386px] overflow-y-auto rounded-[32px] border border-white-10 bg-modal p-[23px] text-white outline-none backdrop:bg-overlay backdrop:transition-opacity backdrop:duration-200 motion-reduce:transition-none ${isOpen ? 'scale-100 opacity-100 transition-[opacity,transform] duration-250 ease-out starting:scale-95 starting:opacity-0' : 'scale-95 opacity-0 transition-[opacity,transform] duration-200 ease-in backdrop:opacity-0'}`}
    >
      <div className="flex flex-col gap-4 tracking-[-0.3px]">
        <div className="relative flex flex-col gap-2">
          <h2
            id="offer-title"
            className="pr-[70px] text-[28px] leading-[1.3] font-semibold"
          >
            10 ₽ — и целая
            <br />
            неделя ваша
          </h2>
          <img
            src="/assets/trial-heart.png"
            alt=""
            width="96"
            height="80"
            className="pointer-events-none absolute -top-[6px] -right-[3px] h-20 w-24 object-cover"
          />
          <p
            id="offer-description"
            className="text-base leading-[1.3] text-white-80"
          >
            Все возможности. Без ограничений.
            <br />
            Полный доступ ко всем локациям и безлимитному трафику на 7 дней.
          </p>
        </div>
        <BenefitBadges />
        <div className="flex flex-col gap-2">
          <PurchaseLink planId="trial" onClick={onClose}>
            Попробовать за 10 ₽
          </PurchaseLink>
          <ActionLink
            variant="secondary"
            onClick={(event) => {
              event.preventDefault()
              onClose()
            }}
          >
            Нет, спасибо. Давайте позже
          </ActionLink>
        </div>
      </div>
    </dialog>
  )
}
