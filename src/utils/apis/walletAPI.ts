import { getRequest } from '@utils/httpRequests/httpRequestModule'

const baseUrl: string = `${process.env.REACT_APP_API_URL}/wallet`

export const walletAPI: any = {
  getSupportedCurrencies: () => {
    return getRequest(`${baseUrl}/supportedCurrencies`)
  },
}
