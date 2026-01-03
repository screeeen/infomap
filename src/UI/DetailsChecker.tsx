import { useState, type ReactElement } from 'react'
import { useLayerContext } from '../layerContext/useLayerContext'
import { Box, Checkbox, FormControlLabel } from '@mui/material'
import { colorBins } from '@deck.gl/carto'
import { genDomain } from '../utils/utils'
import { DOMAIN_CONFIG } from '../constants/constants'
import type { DomainConfigType } from '../types/App.types'

export const DetailsChecker = ({
  filter,
}: {
  filter: string
}): ReactElement => {
  const { handleColumns, updateLayerStyle, selectedLayer } = useLayerContext()
  const [showFilter, setShowFilter] = useState<boolean>()

  const handleChange = ({
    showFilter,
    selectedLayer,
    columns,
  }: {
    showFilter?: boolean
    selectedLayer: string
    columns?: string[]
  }) => {
    if (!showFilter) {
      const domain = genDomain(DOMAIN_CONFIG[filter as keyof DomainConfigType])
      handleColumns(columns)
      const [value] = columns
      console.log('value', value)
      updateLayerStyle(selectedLayer, {
        getFillColor: colorBins({
          attr: value,
          domain: domain,
          colors: 'Earth',
        }),
      })
      setShowFilter(true)
    } else {
      handleColumns(undefined)
      updateLayerStyle(selectedLayer, {
        getFillColor: [200, 0, 0],
      })
      setShowFilter(false)
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
                  showFilter,
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
