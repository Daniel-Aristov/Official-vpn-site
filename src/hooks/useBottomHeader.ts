import { useEffect, useRef, useState } from 'react'

/** Keep the bottom navigation hidden until the original header scrolls away. */
export function useBottomHeader(onPositionChange?: () => void) {
  const headerRef = useRef<HTMLElement>(null)
  const previousVisibilityRef = useRef(false)
  const [isBottomHeaderVisible, setIsBottomHeaderVisible] = useState(false)

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const observer = new IntersectionObserver(([entry]) => {
      const isVisible =
        !entry.isIntersecting && entry.boundingClientRect.bottom <= 0
      if (isVisible === previousVisibilityRef.current) return
      previousVisibilityRef.current = isVisible
      onPositionChange?.()
      setIsBottomHeaderVisible(isVisible)
    })

    observer.observe(header)
    return () => observer.disconnect()
  }, [onPositionChange])

  return { headerRef, isBottomHeaderVisible }
}
