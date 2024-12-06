import { walletAPI } from '@utils/apis/walletAPI'

export function useMarket() {
  async function getSupportedCurrenciesRequest() {
    const response = await walletAPI.getSupportedCurrencies()
    console.log(response)
    return response
  }

  return {
    getSupportedCurrenciesRequest,
  }
}
