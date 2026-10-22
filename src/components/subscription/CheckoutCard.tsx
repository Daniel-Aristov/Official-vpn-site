import type { ComponentPropsWithoutRef } from 'react'

export function CheckoutCard({
  className = '',
  ...props
}: ComponentPropsWithoutRef<'section'>) {
  return (
    <section
      {...props}
      className={`flex min-w-0 flex-col gap-4 rounded-3xl bg-white-10 p-4 ${className}`}
    />
  )
}
