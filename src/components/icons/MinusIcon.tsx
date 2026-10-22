import type { SVGProps } from 'react'

export function MinusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
      overflow="visible"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="fi-rr-minus" clipPath="url(#clip0_0_35)">
        <path
          id="Vector"
          d="M19.1667 9.16641H0.833327C0.37309 9.16641 -6.35783e-06 9.53951 -6.35783e-06 9.99975C-6.35783e-06 10.46 0.37309 10.8331 0.833327 10.8331H19.1667C19.6269 10.8331 20 10.46 20 9.99975C20 9.53951 19.6269 9.16641 19.1667 9.16641Z"
          fill="var(--color-white)"
        />
      </g>
      <defs>
        <clipPath id="clip0_0_35">
          <rect width="20" height="20" fill="var(--color-white)" />
        </clipPath>
      </defs>
    </svg>
  )
}
