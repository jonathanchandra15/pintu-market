import { ProgressSpinner } from 'primereact/progressspinner'
import '@styles/commons/Loading.scss'

export function Loading() {
  return (
    <div className="l-loading">
      <ProgressSpinner />
    </div>
  )
}
