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
      getFillColor: [200, 0, 80],
      lineWidthMinPixels: 1, // outline size
      getLineColor: [255, 0, 0, 255], // outline color
      pointRadiusMinPixels: 3, // radius
    },
  },
  demographics: {
    id: 'demographics-layer',
    tableName: 'carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup',
    sourceType: 'tileset',
    displayName: 'Demografía',
    style: {
      getFillColor: [0, 120, 100, 10],
      lineWidthMinPixels: 1,
      getLineColor: [0, 0, 0, 50],
    },
  },
}

export const INITIAL_VIEW_STATE = {
  latitude: 39.8097343,
  longitude: -98.5556199,
  zoom: 6,
  bearing: 0,
  pitch: 30,
}

export const storesSource = 'carto-demo-data.demo_tables.retail_stores'
export const demographicsSource =
  '`carto-demo-data.demo_tilesets.sociodemographics_usa_blockgroup'
