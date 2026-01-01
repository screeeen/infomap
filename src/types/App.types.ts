export type CartoConfigType = {
  apiBaseUrl: string
  accessToken: string
  connectionName: string
}

export type SourceType = 'table' | 'tileset'

export interface ILayerStyle {
  pointRadiusMinPixels?: number
  getFillColor?: number[]
  getLineColor?: number[]
  lineWidthMinPixels?: number
}

export interface ILayerConfig {
  id: string
  tableName: string
  sourceType: SourceType
  style: ILayerStyle
  displayName?: string
  description?: string
}
