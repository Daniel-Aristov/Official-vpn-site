import { Navigate, Route, Routes } from 'react-router'
import { AppBackground } from '@/components/UI/AppBackground'
import MainPage from '@/pages/MainPage'

function App() {
  return (
    <AppBackground>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppBackground>
  )
}

export default App
