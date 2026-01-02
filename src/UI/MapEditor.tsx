import { useState } from 'react'
import { Header } from './Header'
import { MapSelector } from './MapSelector'
import { Box, Paper } from '@mui/material'
import { ColorEditor } from './ColorEditor'
import { RadiusEditor } from './RadiusEditor'

// interface LayerStyleEditorProps {
//   layersVisibility: Record<string, boolean>
//   customStyles: Record<string, Partial<ILayerStyle>>
//   setCustomStyles: (customStyles: string) => void
//   onStyleUpdate: (layerKey: string, styleUpdates: Partial<ILayerStyle>) => void
//   onStyleReset: (layerKey: string) => void
//   toggleLayer: (layer: string) => void
// }

export const LayerStyleEditor = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Header isOpen={isOpen} setIsOpen={setIsOpen}>
      <Paper square={false}>
        {isOpen && (
          <Box p={1}>
            <MapSelector />
            <ColorEditor />
            <RadiusEditor />
          </Box>
        )}
      </Paper>
    </Header>
  )
}
