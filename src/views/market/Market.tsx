import { useMarket } from '@hooks/useMarket'
import { useEffect } from 'react'

export function Market() {
  let { getSupportedCurrenciesRequest } = useMarket()

  useEffect(() => {
    getSupportedCurrenciesRequest()
  }, [])
  return <p>A</p>
}
