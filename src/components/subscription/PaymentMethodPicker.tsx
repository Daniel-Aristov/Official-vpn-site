import { useEffect, useRef, useState } from 'react'
import { CheckoutCard } from './CheckoutCard'
import { SbpIcon } from '@/components/icons/SbpIcon'
import { ChevronDownIcon } from '@/components/icons/ChevronDownIcon'
import { CreditCardIcon } from '@/components/icons/CreditCardIcon'

const paymentMethods = [
  { id: 'sbp', label: 'Оплата СБП', Icon: SbpIcon },
  { id: 'card', label: 'Оплата картой', Icon: CreditCardIcon },
] as const

type PaymentMethod = (typeof paymentMethods)[number]

function PaymentMethodLabel({ method }: { method: PaymentMethod }) {
  const { Icon } = method
  return (
    <>
      <span className="flex h-[50px] w-[72px] shrink-0 items-center justify-center rounded-lg bg-white-10">
        <Icon className={method.id === 'card' ? 'size-6' : undefined} />
      </span>
      <span className="flex-1 font-semibold">{method.label}</span>
    </>
  )
}

export function PaymentMethodPicker() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<PaymentMethod['id']>('sbp')
  const pickerRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLAnchorElement>(null)
  const optionRef = useRef<HTMLAnchorElement>(null)
  const selected = paymentMethods.find((method) => method.id === selectedId)!

  useEffect(() => {
    if (!isOpen) return
    optionRef.current?.focus({ preventScroll: true })
    const closeOutside = (event: Event) => {
      if (
        event.target instanceof Node &&
        !pickerRef.current?.contains(event.target)
      )
        setIsOpen(false)
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('focusin', closeOutside)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('focusin', closeOutside)
    }
  }, [isOpen])

  return (
    <CheckoutCard aria-labelledby="payment-method-label">
      <h2 id="payment-method-label" className="font-medium">
        3. Выбрать способ оплаты
      </h2>
      <input type="hidden" name="paymentMethod" value={selectedId} />
      <div
        ref={pickerRef}
        className="relative z-20 h-[74px]"
        onKeyDown={(event) => {
          if (event.key === 'Escape' && isOpen) {
            event.preventDefault()
            setIsOpen(false)
            toggleRef.current?.focus({ preventScroll: true })
          }
        }}
      >
        <div className="absolute inset-x-0 top-0 overflow-hidden rounded-2xl bg-payment-method">
          <a
            ref={toggleRef}
            href="#"
            role="button"
            aria-haspopup="menu"
            aria-expanded={isOpen}
            aria-controls="payment-method-options"
            onClick={(event) => {
              event.preventDefault()
              setIsOpen(!isOpen)
            }}
            onKeyDown={(event) => {
              if (event.key === ' ') {
                event.preventDefault()
                event.currentTarget.click()
              } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault()
                setIsOpen(true)
                optionRef.current?.focus({ preventScroll: true })
              }
            }}
            className="flex min-h-[74px] items-center gap-3 rounded-2xl px-4 py-3 focus-visible:-outline-offset-2"
          >
            <PaymentMethodLabel method={selected} />
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary ring-1 ring-white-20 ring-inset">
              <ChevronDownIcon
                className={`transition-transform motion-reduce:transition-none ${isOpen ? 'rotate-180 duration-250 ease-out' : 'rotate-0 duration-200 ease-in'}`}
              />
            </span>
          </a>
          <div
            id="payment-method-options"
            role="menu"
            aria-labelledby="payment-method-label"
            aria-hidden={!isOpen}
            inert={!isOpen}
            className={`grid transition-[grid-template-rows,opacity] motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr] opacity-100 duration-250 ease-out' : 'grid-rows-[0fr] opacity-0 duration-200 ease-in'}`}
          >
            <div className="overflow-hidden">
              {paymentMethods
                .filter((method) => method.id !== selectedId)
                .map((method) => (
                  <a
                    ref={optionRef}
                    href="#"
                    role="menuitem"
                    key={method.id}
                    onClick={(event) => {
                      event.preventDefault()
                      setSelectedId(method.id)
                      setIsOpen(false)
                      toggleRef.current?.focus({ preventScroll: true })
                    }}
                    onKeyDown={(event) => {
                      if (event.key === ' ') {
                        event.preventDefault()
                        event.currentTarget.click()
                      } else if (
                        ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(
                          event.key,
                        )
                      ) {
                        event.preventDefault()
                      }
                    }}
                    className="flex min-h-[74px] items-center gap-3 rounded-2xl px-4 py-3 hover:bg-white-10 focus-visible:-outline-offset-2"
                  >
                    <PaymentMethodLabel method={method} />
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </CheckoutCard>
  )
}
