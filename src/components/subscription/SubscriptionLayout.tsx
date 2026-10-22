import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { BackIcon } from '@/components/icons/BackIcon'

export function SubscriptionLayout({
  children,
  backTo = '/',
}: {
  children: ReactNode
  backTo?: string
}) {
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-[640px] flex-col text-base leading-[1.3] text-white tracking-[-0.3px]">
      <header className="px-4 py-4">
        <Link
          to={backTo}
          aria-label="Назад"
          className="flex size-8 items-center justify-center rounded-full transition-transform duration-200 ease-out active:scale-95"
        >
          <BackIcon />
        </Link>
      </header>
      <main className="flex flex-1 flex-col gap-6 px-4">
        {children}
      </main>
      <footer className="mx-4 mt-6 border-t border-white-20 pt-6 pb-[max(24px,env(safe-area-inset-bottom))] text-white-80">
        © 2026 OFL VPS. Серверы на любой вкус!
      </footer>
    </div>
  )
}

