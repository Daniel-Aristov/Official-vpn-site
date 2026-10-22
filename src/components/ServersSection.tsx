import { SectionHeading } from '@/components/UI/SectionHeading'
import { GermanyIcon } from '@/components/icons/GermanyIcon'
import { FinlandIcon } from '@/components/icons/FinlandIcon'
import { PolandIcon } from '@/components/icons/PolandIcon'

const locations = [
  { name: 'Германия', Icon: GermanyIcon },
  { name: 'Финляндия', Icon: FinlandIcon },
  { name: 'Польша', Icon: PolandIcon },
]

export function ServersSection() {
  return (
    <section
      id="servers"
      aria-labelledby="servers-title"
      className="flex scroll-mt-6 flex-col gap-4"
    >
      <div className="px-4 min-[1000px]:px-0">
        <SectionHeading id="servers-title" title="Серверы по всему миру">
          Выбирайте подходящую локацию и переключайтесь между серверами в
          несколько нажатий.
        </SectionHeading>
      </div>
      <ul
        tabIndex={0}
        aria-label="Локации серверов"
        className="flex gap-2 overflow-x-auto px-4 min-[1000px]:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {locations.map(({ name, Icon }) => (
          <li
            key={name}
            className="flex shrink-0 items-center gap-2 rounded-3xl border border-white-10 bg-white-10 p-[7px]"
          >
            <span className="flex size-9 items-center justify-center rounded-2xl bg-white-10">
              <Icon />
            </span>
            <span className="text-lg leading-[1.3] font-semibold">{name}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
