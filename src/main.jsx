import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MNISTSketchRecognition from './MNISTSketchRecognition.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MNISTSketchRecognition />
  </StrictMode>,
)
