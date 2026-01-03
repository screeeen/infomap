import { useState } from 'react'
import type { ILayerStyle } from '../types/App.types'
import type { LayerProviderProps } from './LayerContext.types'
import { LayerContext } from './LayerContext'

export const LayerProvider: React.FC<LayerProviderProps> = ({ children }) => {
  const [layersVisibility, setLayersVisibility] = useState({
    stores: false,
    demographics: true,
  })

  const [customStyles, setCustomStyles] = useState<
    Record<string, Partial<ILayerStyle>>
  >({})

  const [columns, setColumns] = useState<string[] | undefined>(undefined)

  const toggleLayer = (layer: keyof typeof layersVisibility) => {
    setLayersVisibility(prev => ({
      ...prev,
      [layer]: !prev[layer],
    }))
  }

  const updateLayerStyle = (
    layerKey: string,
    styleUpdates: Partial<ILayerStyle>
  ) => {
    setCustomStyles(prev => ({
      ...prev,
      [layerKey]: {
        ...(prev[layerKey] || {}),
        ...styleUpdates,
      },
    }))
  }

  const selectedLayer =
    (
      Object.keys(layersVisibility) as Array<keyof typeof layersVisibility>
    ).find(key => layersVisibility[key]) || 'stores'

  const handleColumns = (columns: string[] | undefined) => setColumns(columns)

  return (
    <LayerContext.Provider
      value={{
        layersVisibility,
        selectedLayer,
        customStyles,
        toggleLayer,
        updateLayerStyle,
        handleColumns,
        columns,
      }}
    >
      {children}
    </LayerContext.Provider>
  )
}
