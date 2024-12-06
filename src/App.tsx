import '@styles/Theme.scss'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import { Button } from 'primereact/button'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Market } from '@views/market/Market'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/market" replace />} />
        <Route path="/market" element={<Market />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
