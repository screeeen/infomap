import type { ReactElement } from 'react'
import { Typography } from '@carto/react-ui'
import { useLayerContext } from '../layerContext/useLayerContext'
import { LAYERS_CONFIG } from '../constants/constants'
import { Slider } from '@mui/material'
import { Box } from '@mui/material'

export const OutlineWidth = (): ReactElement => {
  const { selectedLayer, customStyles, updateLayerStyle } = useLayerContext()

  const handleLineWidthChange = (layerKey: string, value: number) => {
    updateLayerStyle(layerKey, { lineWidthMinPixels: value })
  }

  return (
    <Box px={1}>
      <Typography variant="body2">Outline Width</Typography>
      <Box display="flex" alignItems="center" gap={1}>
        <Slider
          min={0}
          max={20}
          value={
            customStyles[selectedLayer]?.lineWidthMinPixels ||
            LAYERS_CONFIG[selectedLayer].style.lineWidthMinPixels ||
            3
          }
          onChange={e =>
            handleLineWidthChange(selectedLayer, parseInt(e.target.value))
          }
        />
        <Typography variant="button">
          {customStyles[selectedLayer]?.lineWidthMinPixels ||
            LAYERS_CONFIG[selectedLayer].style.lineWidthMinPixels ||
            3}
          px
        </Typography>
      </Box>
    </Box>
  )
}
