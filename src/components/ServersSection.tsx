import { SectionHeading } from '@/components/UI/SectionHeading'

const locations = [
  { name: 'Польша', code: 'pl' },
  { name: 'Молдова', code: 'md' },
  { name: 'Германия', code: 'de' },
  { name: 'Румыния', code: 'ro' },
  { name: 'Финляндия', code: 'fi' },
  { name: 'Япония', code: 'jp' },
  { name: 'США', code: 'us' },
  { name: 'Россия', code: 'ru' },
  { name: 'ОАЭ', code: 'ae' },
  { name: 'Казахстан', code: 'kz' },
  { name: 'Турция', code: 'tr' },
  { name: 'Аргентина', code: 'ar' },
  { name: 'Швейцария', code: 'ch' },
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
      <div
        tabIndex={0}
        role="region"
        aria-label="Локации серверов"
        className="group/servers overflow-x-auto px-4 min-[1000px]:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-max animate-server-marquee will-change-transform group-hover/servers:[animation-play-state:paused] group-focus-within/servers:[animation-play-state:paused] motion-reduce:animate-none">
          {[false, true].map((isDuplicate) => (
            <ul
              key={String(isDuplicate)}
              aria-hidden={isDuplicate || undefined}
              className={`flex shrink-0 gap-2 pr-2 ${isDuplicate ? 'motion-reduce:hidden' : ''}`}
            >
              {locations.map(({ name, code }) => (
                <li
                  key={code}
                  className="flex shrink-0 items-center gap-2 rounded-3xl border border-white-10 bg-white-10 p-[7px]"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-white-10">
                    <img
                      src={`/assets/flags/${code}.svg`}
                      alt=""
                      width="15.24"
                      height="10.67"
                      className="h-[10.67px] w-[15.24px] rounded-[1px] object-cover"
                    />
                  </span>
                  <span className="text-lg leading-[1.3] font-semibold whitespace-nowrap">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
