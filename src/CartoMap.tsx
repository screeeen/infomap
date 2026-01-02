import DeckGL from 'deck.gl'
import { cartoConfig } from './cartoConfig/cartoConfig'
import { useMemo, useState } from 'react'
import Map from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { BASEMAP } from '@deck.gl/carto'
import { createLayers } from './utils/utils'
import { LayerStyleEditor } from './UI/MapEditor'
import { INITIAL_VIEW_STATE } from './constants/constants'
import { Box } from '@mui/material'
import { useLayerContext } from './context/LayerContext'

export const CartoMap = (): React.ReactNode => {
  const { layersVisibility, customStyles } = useLayerContext()
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE)

  const layers = useMemo(
    () => createLayers(layersVisibility, cartoConfig, customStyles),
    [layersVisibility, customStyles]
  )

  return (
    <Box position="relative" width="100%" height="100%">
      <Map
        mapStyle={BASEMAP.VOYAGER}
        viewState={viewState}
        interactive={false}
        style={{ position: 'absolute', inset: 0 }}
      />
      <DeckGL
        viewState={viewState}
        controller={true}
        layers={layers}
        onViewStateChange={({ viewState }: { viewState }) =>
          setViewState(viewState)
        }
        style={{ position: 'absolute', inset: '0' }}
      />
      <LayerStyleEditor />
    </Box>
  )
}
