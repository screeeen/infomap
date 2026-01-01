import { vectorTableSource, vectorTilesetSource } from '@deck.gl/carto'
import type { ILayerConfig } from '../types/App.types'

export const SOURCE_LOADERS = {
  table: vectorTableSource,
  tileset: vectorTilesetSource,
}

export const LAYERS_CONFIG: Record<string, ILayerConfig> = {
  stores: {
    id: 'stores-layer',
    tableName: 'carto-demo-data.demo_tables.retail_stores',
    sourceType: 'table',
    displayName: 'Tiendas',
    style: {
      pointRadiusMinPixels: 3,
      getFillColor: [200, 0, 80],
    },
  },
  demographics: {
    id: 'demographics-layer',
    tableName: 'carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup',
    sourceType: 'tileset',
    displayName: 'Demografía',
    style: {
      pointRadiusMinPixels: 2,
      getLineColor: [0, 0, 0, 50],
      getFillColor: [0, 120, 200, 10],
      lineWidthMinPixels: 1,
    },
  },
}

export const INITIAL_VIEW_STATE = {
  latitude: 39.8097343,
  longitude: -98.5556199,
  zoom: 4,
  bearing: 0,
  pitch: 30,
}

export const storesSource = 'carto-demo-data.demo_tables.retail_stores'
export const demographicsSource =
  '`carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup'
