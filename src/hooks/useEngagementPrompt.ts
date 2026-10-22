import { useEffect, useState } from 'react'

/** Show the offer once, unless the visitor has already used a page action. */
export function useEngagementPrompt(delay = 40_000) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsOpen(true), delay)

    const cancelPrompt = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        event.target.closest('a, button, [role="button"]')
      ) {
        window.clearTimeout(timer)
        document.removeEventListener('click', cancelPrompt, true)
      }
    }

    document.addEventListener('click', cancelPrompt, true)

    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('click', cancelPrompt, true)
    }
  }, [delay])

  return { isOpen, close: () => setIsOpen(false) }
}
