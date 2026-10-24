import type { LegalSection } from '@/data/legalDocuments'

export function LegalDocumentSection({
  section,
  number,
}: {
  section: LegalSection
  number: number
}) {
  return (
    <section
      className="flex flex-col gap-3"
      aria-labelledby={`legal-section-${number}`}
    >
      <h2
        id={`legal-section-${number}`}
        className="text-xl leading-[1.3] font-semibold"
      >
        {number}. {section.title}
      </h2>
      {section.paragraphs.map((paragraph, index) => (
        <p key={paragraph} className="leading-7 text-white-80">
          {number}.{index + 1}. {paragraph}
        </p>
      ))}
      {section.items && (
        <ul className="list-disc space-y-2 pl-5 leading-7 text-white-80">
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  )
}
