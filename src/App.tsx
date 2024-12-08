import '@styles/commons/Theme.scss'
import '@styles/App.scss'
import '@styles/commons/Table.scss'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Market } from '@views/market/Market'
import 'primeicons/primeicons.css'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { CustomToast, showErrorToast } from '@views/commons/CustomToast'
import { CommonContext } from '@contexts/commonContext'

import '@assets/fonts/NHaasGroteskTXPro-55Rg.ttf'
import '@assets/fonts/NHaasGroteskTXPro-75Bd.ttf'
import '@assets/fonts/Inter_28pt-Regular.ttf'
import '@assets/fonts/Inter_24pt-Bold.ttf'

function App() {
  const toastRef: MutableRefObject<any> = useRef(null)

  function showErrorMessage(message: string) {
    showErrorToast(toastRef, message)
  }

  return (
    <CommonContext.Provider
      value={{
        showErrorMessage,
      }}
    >
      <CustomToast toastRef={toastRef} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/market" replace />} />
          <Route path="/market" element={<Market />} />
        </Routes>
      </BrowserRouter>
    </CommonContext.Provider>
  )
}

export default App
