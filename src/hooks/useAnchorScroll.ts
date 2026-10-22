import { useEffect, useRef, type MouseEvent } from 'react'
import { useNavigate } from 'react-router'

const SCROLL_DURATION = 250

export function useAnchorScroll() {
  const navigate = useNavigate()
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const cancel = () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
    }
    const events = ['wheel', 'touchstart', 'pointerdown'] as const
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        [
          'ArrowUp',
          'ArrowDown',
          'PageUp',
          'PageDown',
          'Home',
          'End',
          ' ',
          'Escape',
        ].includes(event.key)
      )
        cancel()
    }
    window.addEventListener('keydown', onKeyDown)
    events.forEach((event) =>
      window.addEventListener(event, cancel, { passive: true }),
    )
    return () => {
      cancel()
      window.removeEventListener('keydown', onKeyDown)
      events.forEach((event) => window.removeEventListener(event, cancel))
    }
  }, [])

  return (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return

    const hash = event.currentTarget.hash
    const target = document.getElementById(hash.slice(1))
    if (!target) return

    event.preventDefault()
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current)
    frameRef.current = null
    const start = window.scrollY
    const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0
    const end = Math.max(
      0,
      Math.min(
        start + target.getBoundingClientRect().top - margin,
        document.documentElement.scrollHeight - window.innerHeight,
      ),
    )
    void navigate(hash, { preventScrollReset: true })

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top: end, behavior: 'instant' })
      return
    }

    const startedAt = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - startedAt) / SCROLL_DURATION, 1)
      const eased = 1 - (1 - progress) ** 3
      window.scrollTo({
        top: start + (end - start) * eased,
        behavior: 'instant',
      })
      frameRef.current =
        progress < 1 ? window.requestAnimationFrame(step) : null
    }
    frameRef.current = window.requestAnimationFrame(step)
  }
}
