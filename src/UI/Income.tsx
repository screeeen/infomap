import { useState, type ReactElement } from 'react'
import { useLayerContext } from '../layerContext/useLayerContext'
import { Box, Checkbox, FormControlLabel } from '@mui/material'
import { colorBins } from '@deck.gl/carto'
import { genDomain } from '../utils/utils'

export const Income = (): ReactElement => {
  const { handleColumns, updateLayerStyle, selectedLayer } = useLayerContext()
  const [showRevenue, setShowRevenue] = useState<boolean>()

  const handleChange = ({
    showRevenue,
    selectedLayer,
    columns,
  }: {
    showRevenue?: boolean
    selectedLayer: string
    columns?: string[]
  }) => {
    if (!showRevenue) {
      const domain = genDomain()
      handleColumns(columns)
      updateLayerStyle(selectedLayer, {
        getFillColor: colorBins({
          attr: 'revenue',
          domain: domain,
          colors: 'Earth',
        }),
      })
      setShowRevenue(true)
    } else {
      handleColumns(undefined)
      updateLayerStyle(selectedLayer, {
        getFillColor: [200, 0, 0],
      })
      setShowRevenue(false)
    }
  }

  return (
    <Box px={1}>
      <Box display="flex" alignItems="center" gap={1}>
        <FormControlLabel
          label="Show Revenue"
          control={
            <Checkbox
              onChange={() =>
                handleChange({
                  showRevenue,
                  selectedLayer,
                  columns: ['revenue'],
                })
              }
            />
          }
        />
      </Box>
    </Box>
  )
}
