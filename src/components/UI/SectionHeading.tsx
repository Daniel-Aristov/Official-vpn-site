import type { ReactNode } from 'react'

interface SectionHeadingProps {
  id: string
  title: ReactNode
  children?: ReactNode
}

export function SectionHeading({ id, title, children }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 id={id} className="text-[28px] leading-[1.3] font-semibold">
        {title}
      </h2>
      {children && <p className="text-base leading-[1.3]">{children}</p>}
    </div>
  )
}
