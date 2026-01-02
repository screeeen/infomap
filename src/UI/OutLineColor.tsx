import type { ReactElement } from 'react'
import { Typography } from '@carto/react-ui'
import { useLayerContext } from '../layerContext/useLayerContext'
import { LAYERS_CONFIG } from '../constants/constants'
import { Slider } from '@mui/material'
import { Box } from '@mui/material'
import type { ILayerConfig } from '../types/App.types'

export const OutLineColor = (): ReactElement => {
  const { selectedLayer, customStyles, updateLayerStyle } = useLayerContext()

  const layerConfig = LAYERS_CONFIG[selectedLayer as keyof ILayerConfig]

  const handleColorChange = (
    layerKey: string,
    colorIndex: number,
    value: number
  ) => {
    const currentStyle = customStyles[layerKey] || {}
    const currentColor = currentStyle.getLineColor ||
      LAYERS_CONFIG[layerKey].style.getLineColor || [0, 0, 0]

    const newColor = [...currentColor]
    newColor[colorIndex] = value

    updateLayerStyle(layerKey, { getLineColor: newColor as number[] })
  }

  return (
    <>
      <Typography variant="body2">Outline Color</Typography>

      {['R', 'G', 'B'].map((label, index) => {
        const currentStyle = customStyles[selectedLayer] || {}
        const currentColor = currentStyle.getLineColor ||
          layerConfig.style.getLineColor || [0, 0, 0]

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
              />
              <Typography variant="body2">{currentColor[index]}</Typography>
            </Box>
          </Box>
        )
      })}
    </>
  )
}
