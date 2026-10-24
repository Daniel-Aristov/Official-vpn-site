import { legalOperatorDetails } from '@/data/legalDocuments'
import { supportEmail, supportTelegram } from '@/data/supportContacts'

export function LegalOperatorDetails({ number }: { number: number }) {
  return (
    <section
      className="flex flex-col gap-4"
      aria-labelledby="legal-operator-title"
    >
      <h2
        id="legal-operator-title"
        className="text-xl leading-[1.3] font-semibold"
      >
        {number}. Реквизиты и контакты
      </h2>
      <dl className="flex flex-col gap-4 rounded-2xl border border-white-10 bg-white-10 p-4">
        {legalOperatorDetails.map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-1">
            <dt className="font-medium">{label}</dt>
            <dd className="text-white-80">{value}</dd>
          </div>
        ))}
        <div className="flex flex-col gap-1">
          <dt className="font-medium">Электронная почта</dt>
          <dd>
            <a
              href={`mailto:${supportEmail}`}
              className="break-all text-white-80 underline underline-offset-4"
            >
              {supportEmail}
            </a>
          </dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="font-medium">Поддержка в Telegram</dt>
          <dd>
            <a
              href={supportTelegram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-white-80 underline underline-offset-4"
            >
              {supportTelegram.handle}
            </a>
          </dd>
        </div>
      </dl>
    </section>
  )
}
