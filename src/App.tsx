import '@styles/Theme.scss'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import { Button } from 'primereact/button'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Market } from '@views/market/Market'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Market />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
