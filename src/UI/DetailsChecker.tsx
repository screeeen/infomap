import { useState, type ReactElement } from 'react'
import { useLayerContext } from '../layerContext/useLayerContext'
import { Box, Checkbox, FormControlLabel } from '@mui/material'
import { colorBins } from '@deck.gl/carto'
import { genDomain } from '../utils/utils'
import { DOMAIN_CONFIG, LAYERS_CONFIG } from '../constants/constants'
import type { CustomStyles, DomainConfigType } from '../types/App.types'
import { type Color } from 'deck.gl'

export const DetailsChecker = ({
  filter,
}: {
  filter: string
}): ReactElement => {
  const { customStyles, showColumns, updateLayerStyle, selectedLayer } =
    useLayerContext()
  const [previousColor, setPreviousColor] = useState<Color | null>(null)

  console.log('previousColor', previousColor)

  const handleChange = ({
    previousColor,
    selectedLayer,
    columns,
  }: {
    previousColor?: Color | null
    selectedLayer: string
    columns: string[]
  }) => {
    if (!previousColor) {
      const domain = genDomain(DOMAIN_CONFIG[filter as keyof DomainConfigType])
      showColumns(columns)
      const prevColor =
        (customStyles as CustomStyles)[selectedLayer]?.getFillColor ||
        LAYERS_CONFIG[selectedLayer].style.getFillColor
      setPreviousColor(prevColor as Color)

      const [value] = columns
      updateLayerStyle(selectedLayer, {
        getFillColor: colorBins({
          attr: value,
          domain: domain,
          colors: 'Earth',
        }),
      })
    } else {
      showColumns(columns)
      updateLayerStyle(selectedLayer, {
        getFillColor: previousColor,
      })
      setPreviousColor(null)
    }
  }

  return (
    <Box px={1}>
      <Box display="flex" alignItems="center" gap={1}>
        <FormControlLabel
          label={`Show ${filter}`}
          control={
            <Checkbox
              onChange={() =>
                handleChange({
                  previousColor,
                  selectedLayer,
                  columns: [`${filter}`],
                })
              }
            />
          }
        />
      </Box>
    </Box>
  )
}
