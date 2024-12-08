import { CommonContextType } from '@utils/customTypes/contexts/commonContextCustomType'
import { createContext } from 'react'

export const CommonContext = createContext<CommonContextType>({
  showErrorMessage: () => {},
})
