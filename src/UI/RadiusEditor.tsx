import { LAYERS_CONFIG } from '../constants/constants'
import { Typography } from '@carto/react-ui'
import { Slider } from '@mui/material'
import { Box } from '@mui/material'
import { useLayerContext } from '../context/LayerContext'

export const RadiusEditor = () => {
  const { layersVisibility, customStyles, updateLayerStyle } = useLayerContext()

  const selectedLayer = Object.keys(layersVisibility).find(
    key => layersVisibility[key]
  )

  const handleRadiusChange = (layerKey: string, value: number) => {
    updateLayerStyle(layerKey, { pointRadiusMinPixels: value })
  }

  return (
    LAYERS_CONFIG[selectedLayer].style.pointRadiusMinPixels !== undefined && (
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
  )
}
