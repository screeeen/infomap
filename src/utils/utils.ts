import { VectorTileLayer } from '@deck.gl/carto'
import { LAYERS_CONFIG, SOURCE_LOADERS } from '../constants/constants'
import type {
  CartoConfigType,
  DomainRangeType,
  ILayerConfig,
  ILayerStyle,
} from '../types/App.types'

export const loadSource = ({
  config,
  cartoConfig,
  columns,
}: {
  config: ILayerConfig
  cartoConfig: CartoConfigType
  columns: string[]
}) => {
  const loader = SOURCE_LOADERS[config.sourceType]

  return loader({
    ...cartoConfig,
    tableName: config.tableName,
    columns: columns,
  })
}

export const genDomain = ({ min, max, steps }: DomainRangeType) => {
  return Array.from({ length: steps }, (_, i) =>
    Math.round(min + (i * (max - min)) / (steps - 1))
  )
}

export const createLayers = ({
  layersVisibility,
  cartoConfig,
  customStyles,
  columns,
}: {
  layersVisibility: Record<string, boolean>
  cartoConfig: CartoConfigType
  customStyles?: Record<string, Partial<ILayerStyle>>
  columns?: string[]
}) =>
  Object.keys(layersVisibility)
    .filter(key => layersVisibility[key])
    .map(layerKey => {
      const config = LAYERS_CONFIG[layerKey]

      return new VectorTileLayer({
        id: config.id,
        data: loadSource({ config, cartoConfig, columns }),
        ...config.style,
        ...(customStyles?.[layerKey] ?? {}),
      })
    })
    .filter(Boolean)
