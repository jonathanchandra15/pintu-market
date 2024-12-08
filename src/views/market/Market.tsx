import { useMarket } from '@hooks/useMarket'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ReactSVG } from 'react-svg'
import { convertNumberToIDRCurrency } from '@utils/commonFunction'
import { CommonContext } from '@contexts/commonContext'
import { CommonContextType } from '@utils/customTypes/contexts/commonContextCustomType'
import React, { ReactElement } from 'react'

export function Market(): ReactElement {
  const { showErrorMessage } = React.useContext(CommonContext) as CommonContextType
  let { supportedCurrencyList } = useMarket(showErrorMessage)

  function generatePercentageBlock(number: string): ReactElement | string {
    let numberInFloat: number = parseFloat(number)

    if (numberInFloat > 0) {
      return (
        <div>
          <i className="pi pi-sort-up-fill" />
          {number}%
        </div>
      )
    } else if (numberInFloat < 0) {
      return (
        <div>
          <i className="pi pi-sort-down-fill" />
          {number}%
        </div>
      )
    }
    return `${number}%`
  }

  return (
    <div>
      <h1>Crypto Price in Rupiah Today</h1>
      <DataTable
        value={supportedCurrencyList}
        tableStyle={{ minWidth: '50rem' }}
        removableSort
      >
        <Column
          field="currencyGroup"
          body={(rowData) => {
            return (
              <div style={{ color: rowData.color }}>
                {rowData.logo !== undefined && <ReactSVG src={rowData.logo} />}
              </div>
            )
          }}
        />
        <Column
          field="currencyGroup"
          header="CRYPTO"
          body={(rowData) => {
            return (
              <div>
                <p>
                  <b>{rowData.name}</b>
                </p>
                <p>{rowData.currencyGroup}</p>
              </div>
            )
          }}
        />
        <Column
          header="Price"
          field="latestPrice"
          body={(rowData) => {
            return `${convertNumberToIDRCurrency(parseFloat(rowData.latestPrice))}`
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
