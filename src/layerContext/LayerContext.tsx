import { createContext } from 'react'
import type { LayerContextType } from './LayerContext.types'

export const LayerContext = createContext<LayerContextType | undefined>(
  undefined
)
