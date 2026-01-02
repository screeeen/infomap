import { Slider } from '@mui/material'
import { Typography } from '@carto/react-ui'
import { LAYERS_CONFIG } from '../constants/constants'
import type { ILayerStyle } from '../types/App.types'
import { RadiusEditor } from './RadiusEditor'
import { Box } from '@mui/material'

export const MapStyleEditor = ({
  layersVisibility,
  customStyles,
  setCustomStyles,
  onStyleUpdate,
  onStyleReset,
}: {
  layersVisibility: Record<string, boolean>
  customStyles: Partial<ILayerStyle>
  setCustomStyles: (customStyles: string) => void
  onStyleUpdate: (layerKey: string, styleUpdates: Partial<ILayerStyle>) => void
  onStyleReset: (layerKey: string) => void
}) => {
  const selectedLayer = Object.keys(layersVisibility).find(
    key => layersVisibility[key]
  )

  const layerConfig = LAYERS_CONFIG[selectedLayer]
  const hasFillColor = layerConfig?.style?.getFillColor

  const handleColorChange = (
    layerKey: string,
    colorIndex: number,
    value: number
  ) => {
    const currentStyle = customStyles[layerKey] || {}
    const currentColor = currentStyle.getFillColor ||
      LAYERS_CONFIG[layerKey].style.getFillColor || [0, 0, 0]

    const newColor = [...currentColor]
    newColor[colorIndex] = value

    onStyleUpdate(layerKey, { getFillColor: newColor as number[] })
  }

  return (
    <>
      {hasFillColor && selectedLayer && (
        <Box p={1}>
          <Typography variant="body2">Color</Typography>

          {['R', 'G', 'B'].map((label, index) => {
            const currentStyle = customStyles[selectedLayer] || {}
            const currentColor = currentStyle.getFillColor ||
              layerConfig.style.getFillColor || [0, 0, 0]

            return (
              <Box key={label} px={1}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body2">{label}:</Typography>

                  <Slider
                    min={0}
                    max={255}
                    value={currentColor[index]}
                    onChange={(_, value) =>
                      handleColorChange(selectedLayer, index, value as number)
                    }
                    sx={{ flex: 1 }}
                  />
                  <Typography variant="body2">{currentColor[index]}</Typography>
                </Box>
              </Box>
            )
          })}
          <RadiusEditor
            selectedLayer={selectedLayer}
            onStyleUpdate={onStyleUpdate}
            customStyles={customStyles}
          />
        </Box>
      )}
    </>
  )
}
