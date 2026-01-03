import type { ReactNode } from 'react'
import type { ILayerStyle } from '../types/App.types'

export interface LayerContextType {
  layersVisibility: Record<string, boolean>
  selectedLayer: string
  customStyles: Record<string, Partial<ILayerStyle>>
  toggleLayer: (layer: 'stores' | 'demographics') => void
  updateLayerStyle: (
    layerKey: string,
    styleUpdates: Partial<ILayerStyle>
  ) => void
  handleColumns: (columns: string[]) => void
  columns: string[]
}

export interface LayerProviderProps {
  children: ReactNode
}
