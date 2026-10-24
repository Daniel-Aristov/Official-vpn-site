import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import { AppBackground } from '@/components/UI/AppBackground'
import MainPage from '@/pages/MainPage'
import SubscriptionPage from '@/pages/SubscriptionPage'
import SubscriptionResultPage from '@/pages/SubscriptionResultPage'
import LegalDocumentPage from '@/pages/LegalDocumentPage'
import { legalDocumentLinks } from '@/data/legalDocuments'
import { getSeoTags } from '@/lib/seo'

function App() {
  const { pathname } = useLocation()
  useEffect(() => {
    const nodes = getSeoTags(pathname, import.meta.env.VITE_SITE_URL).map(
      ({ tag, attributes, content }) => {
        const element = document.createElement(tag)
        element.setAttribute('data-seo', '')
        for (const [name, value] of Object.entries(attributes ?? {})) {
          element.setAttribute(name, value)
        }
        if (content !== undefined) element.textContent = content
        return element
      },
    )
    document.head
      .querySelectorAll('[data-seo]')
      .forEach((node) => node.remove())
    document.head.append(...nodes)
    return () => nodes.forEach((node) => node.remove())
  }, [pathname])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <AppBackground>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/subscribe" element={<SubscriptionPage />} />
        <Route
          path="/subscribe/success"
          element={<SubscriptionResultPage status="success" />}
        />
        <Route
          path="/subscribe/error"
          element={<SubscriptionResultPage status="error" />}
        />
        {legalDocumentLinks.map(({ id, href }) => (
          <Route
            key={id}
            path={href}
            element={<LegalDocumentPage documentId={id} />}
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppBackground>
  )
}

export default App
