import { Typography } from '@carto/react-ui'
import { Box } from '@mui/material'
import { useLayerContext } from '../context/LayerContext'

export const MapSelector = () => {
  const { layersVisibility, toggleLayer } = useLayerContext()

  const { stores, demographics } = layersVisibility
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      p={1}
    >
      <Typography variant="button">
        <input
          type="checkbox"
          checked={stores}
          onChange={() => toggleLayer('stores')}
        />
        Stores
      </Typography>
      <Typography variant="button">
        <input
          type="checkbox"
          checked={demographics}
          onChange={() => toggleLayer('demographics')}
        />
        Demographics
      </Typography>
    </Box>
  )
}
