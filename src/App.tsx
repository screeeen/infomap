import DeckGL from 'deck.gl'
import { VectorTileLayer } from '@deck.gl/carto'
import { vectorTableSource } from '@carto/api-client'
import { cartoConfig } from './cartoConfig/cartoConfig'
import { INITIAL_VIEW_STATE } from './App.constants'

function App(): React.ReactNode {
  const data = vectorTableSource({
    ...cartoConfig,
    tableName: 'carto-demo-data.demo_tables.retail_stores',
  })

  const layers = [
    new VectorTileLayer({
      id: 'places',
      data: data,
      pointRadiusMinPixels: 1,
      getFillColor: [200, 0, 80],
    }),
  ]
  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    />
  )
}

export default App
