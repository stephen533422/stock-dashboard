import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { queryClient } from './lib/queryClient'
import './index.css'
import './i18n'
import App from './App.tsx'

const savedTheme = localStorage.getItem('theme')
const initialTheme =
  savedTheme ??
  (globalThis.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark')
document.documentElement.dataset.theme = initialTheme

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
