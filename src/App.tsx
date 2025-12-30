import DeckGL from 'deck.gl'
import { VectorTileLayer } from '@deck.gl/carto'
import { vectorTableSource } from '@carto/api-client'
import { cartoConfig } from './cartoConfig/cartoConfig'
import { INITIAL_VIEW_STATE } from './App.constants'
import { useCallback, useMemo, useState } from 'react'
// import { type IInitialMap } from './types/App.types'
import Map from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { BASEMAP } from '@deck.gl/carto'

function App(): React.ReactNode {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE)

  const data = vectorTableSource({
    ...cartoConfig,
    tableName: 'carto-demo-data.demo_tables.retail_stores',
  })

  const layers = useMemo(
    () => [
      new VectorTileLayer({
        id: 'places',
        data,
        pointRadiusMinPixels: 3,
        getFillColor: [200, 0, 80],
      }),
    ],
    [data]
  )

  const onViewStateChange = useCallback(({ viewState }) => {
    setViewState(viewState)
  }, [])

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
        onViewStateChange={onViewStateChange}
        style={{ position: 'absolute', inset: '0' }}
      />
    </div>
  )
}

export default App
