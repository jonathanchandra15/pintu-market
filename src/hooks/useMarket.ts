import { tradeAPI } from '@utils/apis/tradeAPI'
import { walletAPI } from '@utils/apis/walletAPI'
import {
  CurrencyType,
  PriceChangesMapType,
  PriceChangesResponseType,
  PriceChangeType,
  SupportedCurrenciesResponseType,
  SupportedCurrencyMapItemType,
  SupportedCurrencyMapType,
} from '@utils/customTypes/views/marketCustomType'
import { useEffect, useState } from 'react'

export function useMarket(showErrorMessage: (message: string) => void) {
  const [supportedCurrencyList, setSupportedCurrencyList] = useState<
    SupportedCurrencyMapItemType[]
  >([])
  const [supportedCurrencyMap, setSupportedCurrencyMap] =
    useState<SupportedCurrencyMapType>({})
  const [runInterval, setRunInterval] = useState<boolean>(false)

  useEffect(() => {
    initFunction()
  }, [])

  useEffect(() => {
    if (runInterval === true && Object.keys(supportedCurrencyMap).length > 0) {
      setInterval(refreshPriceChanges, 10000)
      setRunInterval(false)
    }
  }, [runInterval, supportedCurrencyMap])

  async function initFunction(): Promise<void> {
    let priceChangeObjectListResponse = await getPriceChanges()
    await getSupportedCurrencies(priceChangeObjectListResponse)
    setRunInterval(true)
  }

  async function getSupportedCurrenciesRequest(): Promise<CurrencyType[]> {
    try {
      const response: SupportedCurrenciesResponseType =
        await walletAPI.getSupportedCurrencies()
      return response.payload
    } catch (error: any) {
      showErrorMessage(error.errorMessage)
      return []
    }
  }

  async function getSupportedCurrencies(
    priceChangesMap: PriceChangesMapType
  ): Promise<void> {
    const response: CurrencyType[] = await getSupportedCurrenciesRequest()
    let newSupportedCurrencyMap: SupportedCurrencyMapType = {}

    if (response.length !== 0) {
      response.forEach((supportedCurrency: any) => {
        let currencyGroup: string = supportedCurrency.currencyGroup.toLowerCase()
        let supportedCurrencyPriceChange: PriceChangeType = priceChangesMap[currencyGroup]
        if (supportedCurrencyPriceChange !== undefined) {
          newSupportedCurrencyMap[currencyGroup] = {
            ...supportedCurrency,
            ...supportedCurrencyPriceChange,
          }
        }
      })
      setSupportedCurrencyMap(newSupportedCurrencyMap)
      setSupportedCurrencyList(Object.values(newSupportedCurrencyMap))
    }
  }

  async function getPriceChangesRequest(): Promise<PriceChangeType[]> {
    try {
      const response: PriceChangesResponseType = await tradeAPI.getPriceChanges()
      return response.payload
    } catch (error: any) {
      showErrorMessage(error.errorMessage)
      return []
    }
  }

  async function getPriceChanges(): Promise<PriceChangesMapType> {
    const response: PriceChangeType[] = await getPriceChangesRequest()
    let priceChangesMap: PriceChangesMapType = {}

    if (response.length !== 0) {
      response.forEach((priceChange: any) => {
        let currencyGroup: string = priceChange.pair.split('/')[0]
        priceChangesMap[currencyGroup] = priceChange
      })
    }
    return priceChangesMap
  }

  async function refreshPriceChanges(): Promise<void> {
    const response: PriceChangeType[] = await getPriceChangesRequest()
    let supportedCurrencyMapCopy: SupportedCurrencyMapType = { ...supportedCurrencyMap }

    if (response.length !== 0) {
      response.forEach((priceChange: any) => {
        let currency: string = priceChange.pair.split('/')[0]
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
