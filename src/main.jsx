import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ProfileProvider } from './pages/ProfileContext.jsx'
import { LogoProvider } from './pages/LogoContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LogoProvider>
      <ProfileProvider>
        <App />
      </ProfileProvider>
    </LogoProvider>
  </React.StrictMode>,
)
