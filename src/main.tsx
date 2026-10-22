import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.tsx'
import './styles/index.css'

function renderApp() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
}

// Монтируем приложение только когда кадр реально виден пользователю,
// чтобы анимации входа стартовали в момент показа (одинаково при
// перезагрузке и при навигации), а не проигрывались вхолостую.
function start() {
  requestAnimationFrame(renderApp)
}

if (document.visibilityState === 'visible') {
  start()
} else {
  const onVisible = () => {
    if (document.visibilityState !== 'visible') return
    document.removeEventListener('visibilitychange', onVisible)
    start()
  }
  document.addEventListener('visibilitychange', onVisible)
}
