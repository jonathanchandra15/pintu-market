import { useMarket } from '@hooks/useMarket'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ReactSVG } from 'react-svg'
import { convertNumberToIDRCurrency } from '@utils/commonFunction'
import { CommonContext } from '@contexts/commonContext'
import { CommonContextType } from '@utils/customTypes/contexts/commonContextCustomType'
import React, { ReactElement } from 'react'
import '@styles/market/Market.scss'

export function Market(): ReactElement {
  const { showErrorMessage } = React.useContext(CommonContext) as CommonContextType
  let { supportedCurrencyList } = useMarket(showErrorMessage)

  function generatePercentageBlock(number: string): ReactElement {
    let numberInFloat: number = parseFloat(number)

    if (numberInFloat > 0) {
      return (
        <div className="l-table__row-value">
          <i className="m-currency-table__percent-icon m-font--green pi pi-sort-up-fill" />
          <p className="m-font--green m-font-inter--bold">{number}%</p>
        </div>
      )
    } else if (numberInFloat < 0) {
      return (
        <div className="l-table__row-value">
          <i className="m-currency-table__percent-icon m-font--red pi pi-sort-down-fill" />
          <p className="m-font--red m-font-inter--bold">{number}%</p>
        </div>
      )
    }
    return <p className="m-font--black m-font-inter--bold">{number}%</p>
  }

  return (
    <div className="l-market-page">
      <div className="l-market-page__title">
        <h1 className="m-font-neue">Crypto Price in Rupiah Today</h1>
      </div>
      <DataTable
        value={supportedCurrencyList}
        tableStyle={{ minWidth: '50rem' }}
        removableSort
        className="m-table m-currency-table m-font-inter"
        scrollable
        scrollHeight="80rem"
        emptyMessage="No currency."
      >
        <Column
          field="currencyGroup"
          frozen
          header="CRYPTO"
          body={(rowData) => {
            return (
              <div className="m-currency-table__currency">
                <div
                  className="m-currency-table__currency-icon"
                  style={{ color: rowData.color }}
                >
                  <ReactSVG src={rowData.logo} className="m-currency-logo" />
                </div>
                <div className="m-currency-table__currency-name">
                  <p className="m-font--black m-font-inter--bold">{rowData.name}</p>
                  <p className="m-currency-table__currency-group m-font--grey">
                    {rowData.currencyGroup}
                  </p>
                </div>
              </div>
            )
          }}
        />
        <Column
          header="Price"
          field="latestPrice"
          body={(rowData) => {
            return (
              <p className="m-font--black m-font-inter--bold">
                {convertNumberToIDRCurrency(parseFloat(rowData.latestPrice))}
              </p>
            )
          }}
          sortable
        />
        <Column
          header="24H"
          field="day"
          body={(rowData) => {
            return generatePercentageBlock(rowData.day)
          }}
          sortable
        />
        <Column
          header="1W"
          field="week"
          body={(rowData) => {
            return generatePercentageBlock(rowData.week)
          }}
          sortable
        />
        <Column
          header="1M"
          field="month"
          body={(rowData) => {
            return generatePercentageBlock(rowData.month)
          }}
          sortable
        />
        <Column
          header="1Y"
          field="year"
          body={(rowData) => {
            return generatePercentageBlock(rowData.year)
          }}
          sortable
        />
      </DataTable>
    </div>
  )
}
