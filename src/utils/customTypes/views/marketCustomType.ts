export type SupportedCurrenciesResponseType = {
  code: string
  message: string
  payload: CurrencyType[]
}

export type CurrencyType = {
  currency_id: number
  currencyGroup: string
  color: string
  currencySymbol: string
  name: string
  logo: string
  decimal_point: number
  listingDate: string
  wallets: WalletType[]
}

type WalletType = {
  currency_id: number
  currencyGroup: string
  tokenSymbol: string
  decimal_point: number
  tokenType: string
  blockchain: string
  explorer: string
  listingDate: string
  blockchainName: string
  logo: string
}

export type PriceChangesResponseType = {
  code: string
  message: string
  payload: PriceChangeType[]
}

export type PriceChangeType = {
  pair: string
  latestPrice: string
  day: string
  week: string
  month: string
  year: string
}

export type PriceChangesMapType = {
  [currencyGroupInLowerCase: string]: PriceChangeType
}

export type SupportedCurrencyMapItemType = CurrencyType & PriceChangeType

export type SupportedCurrencyMapType = {
  [currencyGroupInLowerCase: string]: SupportedCurrencyMapItemType
}
