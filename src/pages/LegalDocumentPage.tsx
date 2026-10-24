import { SubscriptionLayout } from '@/components/subscription/SubscriptionLayout'
import { LegalDocumentSection } from '@/components/legal/LegalDocumentSection'
import { LegalOperatorDetails } from '@/components/legal/LegalOperatorDetails'
import { legalDocuments, type LegalDocumentId } from '@/data/legalDocuments'

export default function LegalDocumentPage({
  documentId,
}: {
  documentId: LegalDocumentId
}) {
  const document = legalDocuments[documentId]

  return (
    <SubscriptionLayout>
      <article
        className="flex min-w-0 flex-col gap-8 [overflow-wrap:anywhere]"
        aria-labelledby="legal-title"
      >
        <header className="flex flex-col gap-3">
          <h1
            id="legal-title"
            className="text-[28px] leading-[1.3] font-semibold"
          >
            {document.title}
          </h1>
          <p className="text-white-80">{document.subtitle}</p>
        </header>
        {document.sections.map((section, index) => (
          <LegalDocumentSection
            key={section.title}
            section={section}
            number={index + 1}
          />
        ))}
        <LegalOperatorDetails number={document.sections.length + 1} />
      </article>
    </SubscriptionLayout>
  )
}
