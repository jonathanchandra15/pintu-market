import { tradeAPI } from '@utils/apis/tradeAPI'
import { walletAPI } from '@utils/apis/walletAPI'
import { useEffect, useState } from 'react'

export function useMarket() {
  const [supportedCurrencyList, setSupportedCurrencyList] = useState<any>([])
  const [supportedCurrencyMap, setSupportedCurrencyMap] = useState<any>({})

  useEffect(() => {
    initFunction()
  }, [])

  useEffect(() => {
    if (supportedCurrencyList.length > 0) {
      setTimeout(refreshPriceChanges, 10000)
    }
  }, [supportedCurrencyList])

  async function initFunction() {
    let priceChangeObjectListResponse = await getPriceChanges()
    await getSupportedCurrencies(priceChangeObjectListResponse)
  }

  async function getSupportedCurrenciesRequest() {
    try {
      const response = await walletAPI.getSupportedCurrencies()
      return response.payload
    } catch (error) {
      return []
    }
  }

  async function getSupportedCurrencies(priceChangeObjectList: any): Promise<void> {
    const response = await getSupportedCurrenciesRequest()
    let newSupportedCurrencyMap: any = {}

    if (response.length !== 0) {
      response.forEach((supportedCurrency: any) => {
        let currencyName: string = supportedCurrency.currencyGroup.toLowerCase()
        let supportedCurrencyPriceChanges = priceChangeObjectList[currencyName]
        if (supportedCurrencyPriceChanges !== undefined) {
          newSupportedCurrencyMap[currencyName] = {
            ...supportedCurrency,
            ...supportedCurrencyPriceChanges,
          }
        }
      })
      setSupportedCurrencyMap(newSupportedCurrencyMap)
      setSupportedCurrencyList(Object.values(newSupportedCurrencyMap))
    }
  }

  async function getPriceChangesRequest() {
    try {
      const response = await tradeAPI.getPriceChanges()
      return response.payload
    } catch (error) {
      return []
    }
  }

  async function getPriceChanges(): Promise<any[]> {
    const response = await getPriceChangesRequest()
    let priceChangesMap: any = {}

    if (response.length !== 0) {
      response.forEach((priceChange: any) => {
        let currency: string = priceChange.pair.split('/')[0]
        priceChangesMap[currency] = priceChange
      })
    }
    return priceChangesMap
  }

  async function refreshPriceChanges(): Promise<void> {
    const response = await getPriceChangesRequest()
    let priceChangesMap: any = {}
    let supportedCurrencyMapCopy = { ...supportedCurrencyMap }

    if (response.length !== 0) {
      response.forEach((priceChange: any) => {
        let currency: string = priceChange.pair.split('/')[0]
        priceChangesMap[currency] = priceChange
        if (supportedCurrencyMapCopy[currency] !== undefined) {
          supportedCurrencyMapCopy[currency] = {
            ...supportedCurrencyMapCopy[currency],
            ...priceChange,
          }
        }
      })
      setSupportedCurrencyMap(supportedCurrencyMapCopy)
      setSupportedCurrencyList(Object.values(supportedCurrencyMapCopy))
    }
  }

  return {
    supportedCurrencyList,
  }
}
