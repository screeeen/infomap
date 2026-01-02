import { useState } from 'react'
import { Header } from './Header'
import { MapSelector } from './MapSelector'
import { Box, Paper } from '@mui/material'
import { Fill } from './Fill'
import { Radius } from './Radius'
import { OutlineWidth } from './OutlineWidth'
import { OutLineColor } from './OutLineColor'
import { Revenue } from './Revenue'

// interface Editor {
//   layersVisibility: Record<string, boolean>
//   customStyles: Record<string, Partial<ILayerStyle>>
//   setCustomStyles: (customStyles: string) => void
//   onStyleUpdate: (layerKey: string, styleUpdates: Partial<ILayerStyle>) => void
//   onStyleReset: (layerKey: string) => void
//   toggleLayer: (layer: string) => void
// }

export const Editor = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Header isOpen={isOpen} setIsOpen={setIsOpen}>
      <Paper square={false}>
        {isOpen && (
          <Box p={1}>
            <MapSelector />
            <Fill />
            <Radius />
            <OutlineWidth />
            <OutLineColor />
            <Revenue />
          </Box>
        )}
      </Paper>
    </Header>
  )
}
