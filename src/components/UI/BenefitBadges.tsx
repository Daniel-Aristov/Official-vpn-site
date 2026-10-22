const benefits = [
  '+10 локаций',
  'До 6 устройств',
  'Высокая скорость',
  'Защищённое соединение',
]

export function BenefitBadges() {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Преимущества подписки">
      {benefits.map((benefit) => (
        <li
          key={benefit}
          className="rounded-full bg-white-10 px-3 py-2 text-xs leading-[1.3] font-medium whitespace-nowrap text-white-50 ring-1 ring-white-20 ring-inset"
        >
          {benefit}
        </li>
      ))}
    </ul>
  )
}
