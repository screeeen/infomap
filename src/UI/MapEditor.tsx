import { useState } from 'react'
import type { ILayerStyle } from '../types/App.types'
import { Header } from './Header'
import { MapUISelector } from './MapUISelector'
import { Paper } from '@mui/material'
import { MapStyleEditor } from './MapStyleEditor'

interface LayerStyleEditorProps {
  layersVisibility: Record<string, boolean>
  customStyles: Record<string, Partial<ILayerStyle>>
  setCustomStyles: (customStyles: string) => void
  onStyleUpdate: (layerKey: string, styleUpdates: Partial<ILayerStyle>) => void
  onStyleReset: (layerKey: string) => void
  toggleLayer: (layer: string) => void
}

export const LayerStyleEditor = ({
  layersVisibility,
  toggleLayer,
  customStyles,
  setCustomStyles,
  onStyleUpdate,
  onStyleReset,
}: LayerStyleEditorProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Header isOpen={isOpen} setIsOpen={setIsOpen}>
      <Paper square={false}>
        {isOpen && (
          <>
            <MapUISelector
              toggleLayer={toggleLayer}
              layersVisibility={layersVisibility}
            />
            <MapStyleEditor
              layersVisibility={layersVisibility}
              customStyles={customStyles}
              setCustomStyles={setCustomStyles}
              onStyleUpdate={onStyleUpdate}
              onStyleReset={onStyleReset}
            />
          </>
        )}
      </Paper>
    </Header>
  )
}
