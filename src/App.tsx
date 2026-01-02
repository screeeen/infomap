import DeckGL from 'deck.gl'
import { cartoConfig } from './cartoConfig/cartoConfig'
import { useMemo, useState } from 'react'
// import { type IInitialMap } from './types/App.types'
import Map from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { BASEMAP } from '@deck.gl/carto'
import type { ILayerStyle } from './types/App.types'
import { createLayers } from './utils/utils'
import { LayerStyleEditor } from './UI/MapEditor'
import { INITIAL_VIEW_STATE } from './constants/constants'
import { Box } from '@mui/material'

function App(): React.ReactNode {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE)
  const [layersVisibility, setLayersVisibility] = useState({
    stores: true,
    demographics: false,
  })
  const [customStyles, setCustomStyles] = useState<
    Record<string, Partial<ILayerStyle>>
  >({})

  console.log('customStyles', customStyles)

  const layers = useMemo(
    () => createLayers(layersVisibility, cartoConfig, customStyles),
    [layersVisibility, customStyles]
  )

  const toggleLayer = (layer: string) => {
    setLayersVisibility(prev => ({
      ...prev,
      [layer]: !prev[layer],
    }))
  }

  const updateLayerStyle = (
    layerKey: string,
    styleUpdates: Partial<ILayerStyle>
  ) => {
    setCustomStyles(prev => ({
      ...prev,
      [layerKey]: {
        ...(prev[layerKey] || {}),
        ...styleUpdates,
      },
    }))
  }

  const resetLayerStyle = (layerKey: string) => {
    setCustomStyles(prev => {
      const newStyles = { ...prev }
      delete newStyles[layerKey]
      return newStyles
    })
  }

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
      <LayerStyleEditor
        layersVisibility={layersVisibility}
        customStyles={customStyles}
        setCustomStyles={setCustomStyles}
        onStyleUpdate={updateLayerStyle}
        onStyleReset={resetLayerStyle}
        toggleLayer={toggleLayer}
      />
    </Box>
  )
}

export default App
