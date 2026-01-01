import DeckGL from 'deck.gl'
import { VectorTileLayer } from '@deck.gl/carto'
import { vectorTableSource, vectorTilesetSource } from '@carto/api-client'
import { cartoConfig } from './cartoConfig/cartoConfig'
import {
  INITIAL_VIEW_STATE,
  storesSource,
  demographicsSource,
} from './App.constants'
import { useMemo, useState } from 'react'
// import { type IInitialMap } from './types/App.types'
import Map from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { BASEMAP } from '@deck.gl/carto'
import type { IViewState } from './types/App.types'
import { MapUISelector } from './UI/MapUISelector'

function App(): React.ReactNode {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE)
  const [layersVisibility, setLayersVisibility] = useState({
    stores: true,
    demographics: false,
  })

  const dataStores = vectorTableSource({
    ...cartoConfig,
    tableName: storesSource,
  })

  const dataDemoGraphics = vectorTilesetSource({
    ...cartoConfig,
    tableName: demographicsSource,
  })

  const layers = useMemo(() => {
    const result = []

    if (layersVisibility.stores) {
      result.push(
        new VectorTileLayer({
          id: 'stores-layer',
          data: dataStores,
          pointRadiusMinPixels: 3,
          getFillColor: [200, 0, 80],
        })
      )
    }

    if (layersVisibility.demographics) {
      result.push(
        new VectorTileLayer({
          id: 'demographics-layer',
          data: dataDemoGraphics,
          pointRadiusMinPixels: 2,
          getLineColor: [0, 0, 0, 50],
          getFillColor: [0, 120, 200, 10],
          lineWidthMinPixels: 1,
        })
      )
    }

    return result
  }, [layersVisibility])

  const toggleLayer = layer => {
    setLayersVisibility(prev => ({
      ...prev,
      [layer]: !prev[layer],
    }))
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
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
        onViewStateChange={({ viewState }: { viewState: IViewState }) =>
          setViewState(viewState)
        }
        style={{ position: 'absolute', inset: '0' }}
      />
      {/* ----------- CONTROLS -------------- */}
      <MapUISelector
        layersVisibility={layersVisibility}
        toggleLayer={toggleLayer}
      />
    </div>
  )
}

export default App
