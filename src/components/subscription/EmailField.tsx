import type { InputHTMLAttributes, Ref } from 'react'

type EmailFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  ref?: Ref<HTMLInputElement>
}

export function EmailField({ className = '', ...props }: EmailFieldProps) {
  return (
    <input
      {...props}
      type="email"
      name="email"
      autoComplete="email"
      inputMode="email"
      spellCheck={false}
      autoCapitalize="none"
      maxLength={254}
      required
      placeholder="email@mail.com"
      className={`h-14 w-full min-w-0 rounded-2xl border border-white-10 bg-white-10 px-4 py-2 text-base font-semibold text-white outline-none placeholder:text-white-50 focus:border-primary focus:ring-1 focus:ring-primary invalid:[&:not(:placeholder-shown):not(:focus)]:border-error ${className}`}
    />
  )
}
