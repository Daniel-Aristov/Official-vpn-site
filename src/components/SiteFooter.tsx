import { Link } from 'react-router'
import { BrandLogo } from '@/components/BrandLogo'
import { legalDocumentLinks } from '@/data/legalDocuments'

export function SiteFooter() {
  return (
    <footer className="mt-6 flex flex-col gap-4 px-4 pb-24 min-[1000px]:px-0">
      <hr className="border-0 border-t border-white-20" />
      <a
        href="#"
        aria-label="OFL VPS — главная"
        className="flex h-10 items-center self-start"
      >
        <BrandLogo variant="footer" />
      </a>
      <nav aria-label="Информация о сервисе" className="flex flex-col gap-0.5">
        {legalDocumentLinks.map(({ id, title, href }) => (
          <Link
            key={id}
            to={href}
            className="py-1 text-base leading-[1.3] font-medium transition-opacity duration-150 hover:opacity-70"
          >
            {title}
          </Link>
        ))}
      </nav>
      <p className="text-base leading-[1.3] text-white-80">© 2026 OFL VPS.</p>
    </footer>
  )
}
