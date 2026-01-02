import type { ReactNode } from 'react'
import type { ILayerStyle } from '../types/App.types'

export interface LayerContextType {
  layersVisibility: Record<string, boolean>
  selectedLayer: string
  customStyles: Record<string, Partial<ILayerStyle>>
  toggleLayer: (layer: string) => void
  updateLayerStyle: (
    layerKey: string,
    styleUpdates: Partial<ILayerStyle>
  ) => void
  resetLayerStyle: (layerKey: string) => void
}

export interface LayerProviderProps {
  children: ReactNode
}
