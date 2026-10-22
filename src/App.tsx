import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import { AppBackground } from '@/components/UI/AppBackground'
import MainPage from '@/pages/MainPage'
import SubscriptionPage from '@/pages/SubscriptionPage'
import SubscriptionResultPage from '@/pages/SubscriptionResultPage'

function App() {
  const { pathname } = useLocation()
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppBackground>
  )
}

export default App
