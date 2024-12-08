import '@styles/commons/Theme.scss'
import '@styles/App.scss'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Market } from '@views/market/Market'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'primeicons/primeicons.css'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { CustomToast, showErrorToast } from '@views/commons/CustomToast'
import { CommonContext } from '@contexts/commonContext'

const queryClient = new QueryClient()

function App() {
  const toastRef: MutableRefObject<any> = useRef(null)

  function showErrorMessage(message: string) {
    showErrorToast(toastRef, message)
  }

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

export default App
