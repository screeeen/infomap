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

  const resetLayerStyle = (layerKey: string) => {
    setCustomStyles(prev => {
      const newStyles = { ...prev }
      delete newStyles[layerKey]
      return newStyles
    })
  }

  const selectedLayer =
    (
      Object.keys(layersVisibility) as Array<keyof typeof layersVisibility>
    ).find(key => layersVisibility[key]) || 'stores'

  return (
    <LayerContext.Provider
      value={{
        layersVisibility,
        selectedLayer,
        customStyles,
        toggleLayer,
        updateLayerStyle,
        resetLayerStyle,
      }}
    >
      {children}
    </LayerContext.Provider>
  )
}
