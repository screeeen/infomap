import type { AccessorFunction, Color } from '@deck.gl/core'
import type { Feature, Geometry, GeoJsonProperties } from 'geojson'

export type mapType = 'stores' | 'demographics'

export type CartoConfigType = {
  apiBaseUrl: string
  accessToken: string
  connectionName: string
}

export type SourceType = 'table' | 'tileset'

export interface ILayerStyle {
  pointRadiusMinPixels?: number
  getFillColor?:
    | Color
    | AccessorFunction<Feature<Geometry, GeoJsonProperties>, Color>
  getLineColor?:
    | Color
    | AccessorFunction<Feature<Geometry, GeoJsonProperties>, Color>
  lineWidthMinPixels?: number
}

export interface CustomStyles {
  [key: string]: Partial<ILayerStyle>
}

export interface ILayerConfig {
  id: string
  tableName: string
  sourceType: SourceType
  style: ILayerStyle
  displayName?: string
  description?: string
  pickable?: boolean
}

export type DomainRangeType = {
  min: number
  max: number
  steps: number
}

export type DomainConfigType = {
  revenue: DomainRangeType
  income_per_capita: DomainRangeType
}

export type DomainKey = keyof DomainConfigType
