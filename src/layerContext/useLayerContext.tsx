import { useContext } from 'react'
import type { LayerContextType } from './LayerContext.types'
import { LayerContext } from './LayerContext'

export const useLayerContext = (): LayerContextType => {
  const context = useContext(LayerContext)
  if (!context) {
    throw new Error('useLayerContext must be used within a LayerProvider')
  }
  return context
}
