import { useState } from 'react'
import { Header } from './Header'
import { MapSelector } from './MapSelector'
import { Box, Paper } from '@mui/material'
import { Fill } from './Fill'
import { Radius } from './Radius'
import { OutlineWidth } from './OutlineWidth'
import { OutLineColor } from './OutLineColor'
import { DetailsChecker } from './DetailsChecker'
import { useLayerContext } from '../layerContext/useLayerContext'

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
  const { columns } = useLayerContext()

  return (
    <Header isOpen={isOpen} setIsOpen={setIsOpen}>
      <Paper square={false}>
        {isOpen && (
          <Box p={1}>
            <MapSelector />
            {!columns && <Fill />}
            <Radius />
            <OutlineWidth />
            <OutLineColor />
            <DetailsChecker filter="revenue" />
            <DetailsChecker filter="income_per_capita" />
          </Box>
        )}
      </Paper>
    </Header>
  )
}
