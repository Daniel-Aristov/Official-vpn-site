import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { useBottomHeader } from '@/hooks/useBottomHeader'
import { useAnchorScroll } from '@/hooks/useAnchorScroll'
import { MenuIcon } from '@/components/icons/MenuIcon'
import { HeadsetIcon } from '@/components/icons/HeadsetIcon'
import { BrandLogo } from '@/components/BrandLogo'
import { supportTelegram } from '@/data/supportContacts'

const navigation = [
  { label: 'Возможности', href: '#features' },
  { label: 'Тарифы', href: '#pricing' },
  { label: 'Серверы', href: '#servers' },
  { label: 'Подключение', href: '#connection' },
  { label: 'Вопросы', href: '#faq' },
]

interface NavigationProps {
  position: 'top' | 'bottom'
  isOpen: boolean
  isActive: boolean
  onToggle: () => void
  onClose: () => void
}

function Navigation({
  position,
  isOpen,
  isActive,
  onToggle,
  onClose,
}: NavigationProps) {
  const scrollToAnchor = useAnchorScroll()
  const navigationRef = useRef<HTMLDivElement>(null)
  const menuContentRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLAnchorElement>(null)

  useLayoutEffect(() => {
    const content = menuContentRef.current
    if (!content) return
    // Keep the blur surface at its full size; only its parent's clipping changes.
    const updateHeight = () => {
      const style = getComputedStyle(content)
      const height =
        content.getBoundingClientRect().height +
        (parseFloat(style.marginTop) || 0) +
        (parseFloat(style.marginBottom) || 0)
      navigationRef.current?.style.setProperty(
        '--navigation-menu-height',
        `${height}px`,
      )
    }
    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(content)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isOpen || !isActive) return
    const onPointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !navigationRef.current?.contains(event.target)
      )
        onClose()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, isActive, onClose])

  return (
    <div
      ref={navigationRef}
      inert={!isActive}
      className={`relative isolate flex overflow-hidden rounded-[28px] border border-white-10 py-[7px] pr-[7px] pl-[15px] shadow-[0_8px_40px_var(--color-navigation-shadow)] ${position === 'bottom' ? 'flex-col-reverse' : 'flex-col'}`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 -z-10 h-[calc(56px+var(--navigation-menu-height,0px))] transform-gpu bg-white-10 backdrop-blur-[20px] ${position === 'bottom' ? 'bottom-0' : 'top-0'}`}
      />
      <div className="flex h-10 shrink-0 items-center">
        <a
          ref={toggleRef}
          href="#"
          role="button"
          aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isOpen}
          aria-controls={`navigation-${position}`}
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
          className="relative flex size-10 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ease-out active:scale-95"
        >
          <span
            className={`transition-[opacity,rotate] duration-200 ease-out ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}
          >
            <MenuIcon />
          </span>
          <span
            aria-hidden="true"
            className={`absolute inset-0 flex items-center justify-center transition-[opacity,rotate] duration-200 ease-out ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}
          >
            <span className="absolute h-px w-5 rotate-45 bg-white" />
            <span className="absolute h-px w-5 -rotate-45 bg-white" />
          </span>
        </a>
        <span aria-hidden="true" className="h-10 w-px shrink-0 bg-white-10" />
        <a
          href="#"
          aria-label="Official VPS — главная"
          className="flex min-w-0 flex-1 items-center pl-2.5"
        >
          <BrandLogo />
        </a>
        <a
          href="#pricing"
          onClick={(event) => {
            scrollToAnchor(event)
            onClose()
          }}
          className="ml-1 flex min-h-10 shrink-0 items-center justify-center rounded-full bg-primary px-4 py-2 text-base leading-6 font-semibold transition-[transform,filter] duration-200 ease-out hover:brightness-110 active:scale-[0.98]"
        >
          Купить
        </a>
      </div>
      <div
        id={`navigation-${position}`}
        inert={!isOpen}
        className={`overflow-hidden motion-reduce:transition-none ${isActive ? 'transition-[max-height,opacity]' : 'transition-none'} ${isOpen ? 'max-h-[var(--navigation-menu-height)] opacity-100 duration-250 ease-out' : 'max-h-0 opacity-0 duration-200 ease-in'}`}
      >
        <nav aria-label="Разделы страницы" className="overflow-hidden">
          <div
            ref={menuContentRef}
            className={`mr-0 border-white-10 ${position === 'bottom' ? 'mb-2 border-b pt-2 pb-1' : 'mt-2 border-t pt-1 pb-2'}`}
          >
            {navigation.map(({ label, href }) => (
              <a
                href={href}
                key={href}
                onClick={(event) => {
                  scrollToAnchor(event)
                  onClose()
                }}
                className="block rounded-xl py-2 text-base leading-[1.3] font-medium transition-opacity duration-150 hover:opacity-70"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const close = useCallback(() => setIsMenuOpen(false), [])
  const { headerRef, isBottomHeaderVisible } = useBottomHeader(close)
  const toggle = () => setIsMenuOpen((isOpen) => !isOpen)

  return (
    <>
      <header
        ref={headerRef}
        className="relative z-30 h-[72px] px-4 pt-4 min-[1000px]:px-0"
      >
        <Navigation
          position="top"
          isOpen={isMenuOpen && !isBottomHeaderVisible}
          isActive={!isBottomHeaderVisible}
          onToggle={toggle}
          onClose={close}
        />
      </header>
      <div
        inert={!isBottomHeaderVisible}
        className={`fixed inset-x-0 bottom-[max(16px,env(safe-area-inset-bottom))] z-40 mx-auto w-full max-w-[960px] px-4 min-[1000px]:px-0 ${isBottomHeaderVisible ? 'visible' : 'invisible pointer-events-none'}`}
      >
        <a
          href={supportTelegram.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написать в поддержку"
          className="mb-4 ml-auto flex size-14 items-center justify-center rounded-full border border-white-20 bg-support shadow-[0_8px_40px_var(--color-navigation-shadow)] backdrop-blur-md transition-transform duration-200 ease-out active:scale-95"
        >
          <HeadsetIcon />
        </a>
        <Navigation
          position="bottom"
          isOpen={isMenuOpen && isBottomHeaderVisible}
          isActive={isBottomHeaderVisible}
          onToggle={toggle}
          onClose={close}
        />
      </div>
    </>
  )
}
