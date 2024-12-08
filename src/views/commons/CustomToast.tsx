import { CustomToastProps } from '@utils/customProps/commonCustomProps'
import { Toast } from 'primereact/toast'
import { MutableRefObject } from 'react'

export function CustomToast({ toastRef }: CustomToastProps) {
  return <Toast ref={toastRef} position="bottom-center" />
}

export function showErrorToast(ref: MutableRefObject<any>, message: string): void {
  ref.current.show({
    severity: 'error',
    content: () => (
      <div>
        <i className="pi pi-times-circle" />
        <p>{message}</p>
      </div>
    ),
    life: 100000,
  })
}
