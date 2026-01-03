import type { Color } from '@deck.gl/core'

export type CartoConfigType = {
  apiBaseUrl: string
  accessToken: string
  connectionName: string
}

export type SourceType = 'table' | 'tileset'

export interface ILayerStyle {
  pointRadiusMinPixels?: number
  getFillColor?: Color
  getLineColor?: Color
  lineWidthMinPixels?: number
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
