import type { AnchorHTMLAttributes } from 'react'
import { Link, type To } from 'react-router'

interface ActionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary'
  size?: 'regular' | 'compact' | 'small'
  fullWidth?: boolean
  to?: To
  disabled?: boolean
}

export function ActionLink({
  variant = 'primary',
  size = 'regular',
  fullWidth = true,
  to,
  href = '#',
  disabled = false,
  tabIndex,
  onClick,
  onKeyDown,
  className = '',
  children,
  ...props
}: ActionLinkProps) {
  const classes = `flex ${size === 'small' ? 'min-h-11 px-2.5 py-2.5' : `${size === 'compact' ? 'min-h-12' : 'min-h-14'} px-4 py-2`} ${fullWidth ? 'w-full' : 'w-auto'} items-center justify-center rounded-2xl text-center text-base leading-6 font-semibold ${disabled ? 'cursor-not-allowed bg-action-disabled text-white-50' : `text-white transition-[transform,filter] duration-200 ease-out hover:brightness-110 active:scale-[0.98] ${variant === 'primary' ? 'bg-primary' : 'bg-secondary'}`} ${className}`

  const anchorProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
    ...props,
    'aria-disabled': disabled || props['aria-disabled'],
    tabIndex: disabled ? -1 : tabIndex,
    onClick: (event) => {
      if (disabled) {
        event.preventDefault()
        return
      }
      onClick?.(event)
    },
    onKeyDown: (event) => {
      if (disabled) {
        if (event.key === 'Enter' || event.key === ' ') event.preventDefault()
        return
      }
      onKeyDown?.(event)
    },
  }

  if (to)
    return (
      <Link {...anchorProps} to={to} className={classes}>
        {children}
      </Link>
    )

  return (
    <a {...anchorProps} href={href} className={classes}>
      {children}
    </a>
  )
}
