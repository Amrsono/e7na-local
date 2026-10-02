import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MallProvider } from './context/MallContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MallProvider>
      <App />
    </MallProvider>
  </StrictMode>,
)
