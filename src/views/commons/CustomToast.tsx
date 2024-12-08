import { CustomToastProps } from '@utils/customProps/commonCustomProps'
import { Toast } from 'primereact/toast'
import { MutableRefObject } from 'react'
import '@styles/commons/CustomToast.scss'

export function CustomToast({ toastRef }: CustomToastProps) {
  return <Toast ref={toastRef} position="bottom-center" />
}

export function showErrorToast(ref: MutableRefObject<any>, message: string): void {
  ref.current.show({
    severity: 'error',
    content: () => (
      <div className="l-toast__content">
        <i className="m-toast__icon pi pi-times-circle m-icon-red" />
        <p className="m-toast__message">{message}</p>
      </div>
    ),
    life: 100000,
  })
}
