import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'


// i18n (nuevo)
import './i18n' // inicializa i18next antes de renderizar

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        {/* <UserProvider> */}
          <App />
        {/* </UserProvider> */}
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)
