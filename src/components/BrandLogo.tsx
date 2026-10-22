export function BrandLogo({
  variant = 'header',
}: {
  variant?: 'header' | 'footer'
}) {
  return (
    <span className="inline-flex items-center gap-[4.289px] text-white">
      <span aria-hidden="true" className="relative size-[25.359px] shrink-0">
        <img
          src="/assets/brand-icon.png"
          alt=""
          width="156"
          height="197"
          className="pointer-events-none absolute -top-[2.667px] -left-[22.333px] h-[65.667px] w-[52px] max-w-none"
        />
      </span>
      <span
        className={`font-brand leading-[18.656px] font-bold whitespace-pre ${variant === 'footer' ? 'text-[17.155px] tracking-[-0.6862px]' : 'text-sm tracking-[-0.56px] max-[374px]:text-[11px] max-[374px]:tracking-[-0.44px]'}`}
      >
        {variant === 'footer' ? 'OFL  VPS' : 'OFFICIAL  VPS'}
      </span>
    </span>
  )
}
