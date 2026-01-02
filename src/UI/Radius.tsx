import { LAYERS_CONFIG } from '../constants/constants'
import { Typography } from '@carto/react-ui'
import { Slider } from '@mui/material'
import { Box } from '@mui/material'
import { useLayerContext } from '../layerContext/useLayerContext'
import type { ReactElement } from 'react'

export const Radius = (): ReactElement => {
  const { selectedLayer, customStyles, updateLayerStyle } = useLayerContext()

  const handleRadiusChange = (layerKey: string, value: number) => {
    updateLayerStyle(layerKey, { pointRadiusMinPixels: value })
  }

  return (
    <Box px={1}>
      <Typography variant="body2">Radius</Typography>
      <Box display="flex" alignItems="center" gap={1}>
        <Slider
          min={0}
          max={20}
          value={
            customStyles[selectedLayer]?.pointRadiusMinPixels ||
            LAYERS_CONFIG[selectedLayer].style.pointRadiusMinPixels ||
            3
          }
          onChange={e =>
            handleRadiusChange(selectedLayer, parseInt(e.target.value))
          }
        />
        <Typography variant="button">
          {customStyles[selectedLayer]?.pointRadiusMinPixels ||
            LAYERS_CONFIG[selectedLayer].style.pointRadiusMinPixels ||
            3}
          px
        </Typography>
      </Box>
    </Box>
  )
}
