import type { ReactNode } from 'react'
import type { CustomStyles, ILayerStyle } from '../types/App.types'

export interface LayerContextType {
  layersVisibility: Record<string, boolean>
  selectedLayer: string
  customStyles: CustomStyles | (() => void)
  toggleLayer: (layer: 'stores' | 'demographics') => void
  updateLayerStyle: (
    layerKey: string,
    styleUpdates: Partial<ILayerStyle>
  ) => void
  showColumns: (columns: string[]) => void
  columns: string[] | undefined
}

export interface LayerProviderProps {
  children: ReactNode
}
