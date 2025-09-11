import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MusicPlayer from './MusicPlayer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MusicPlayer />
  </StrictMode>,
)