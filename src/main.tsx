import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import './shader-fallback.css'
import './share.css'

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
