import DeckGL from 'deck.gl'
import Map from 'react-map-gl/maplibre'
import { cartoConfig } from './cartoConfig/cartoConfig'
import { useMemo, useState } from 'react'
import { BASEMAP } from '@deck.gl/carto'
import { createLayers } from './utils/utils'
import { Editor } from './UI/Editor'
import { INITIAL_VIEW_STATE } from './constants/constants'
import { Box } from '@mui/material'
import { useLayerContext } from './layerContext/useLayerContext'

import 'maplibre-gl/dist/maplibre-gl.css'
import { getTooltip } from './UI/getTooltip'

export const CartoMap = (): React.ReactNode => {
  const { layersVisibility, customStyles } = useLayerContext()
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE)
  const { columns } = useLayerContext()

  const layers = useMemo(
    () =>
      createLayers({ layersVisibility, cartoConfig, customStyles, columns }),
    [layersVisibility, customStyles, columns]
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
        getTooltip={getTooltip}
      />
      <Editor />
    </Box>
  )
}
