import type { ReactElement } from 'react'
import { useLayerContext } from '../layerContext/useLayerContext'
import { Box, Checkbox } from '@mui/material'

export const Revenue = (): ReactElement => {
  const { selectedLayer, customStyles, updateLayerStyle } = useLayerContext()

  const handleChange = () => console.log('chcchch')

  return (
    <Box px={1}>
      <Box display="flex" alignItems="center" gap={1}>
        <Checkbox onChange={handleChange}>Show Revenue</Checkbox>
      </Box>
    </Box>
  )
}
