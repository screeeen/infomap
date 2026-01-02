import React, { createContext, useContext, useState } from 'react'
import type { ILayerStyle } from '../types/App.types'
import type { LayerContextType, LayerProviderProps } from './LayerContext.types'

const LayerContext = createContext<LayerContextType | undefined>(undefined)

export const useLayerContext = (): LayerContextType => {
  const context = useContext(LayerContext)
  if (!context) {
    throw new Error('useLayerContext must be used within a LayerProvider')
  }
  return context
}

export const LayerProvider: React.FC<LayerProviderProps> = ({ children }) => {
  const [layersVisibility, setLayersVisibility] = useState({
    stores: false,
    demographics: true,
  })

  const [customStyles, setCustomStyles] = useState<
    Record<string, Partial<ILayerStyle>>
  >({})

  const toggleLayer = (layer: string) => {
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

  return (
    <LayerContext.Provider
      value={{
        layersVisibility,
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
