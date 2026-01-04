import { VectorTileLayer } from '@deck.gl/carto'
import { LAYERS_CONFIG } from '../constants/constants'
import type { DomainRangeType, ILayerStyle } from '../types/App.types'
import type {
  VectorTableSourceResponse,
  VectorTilesetSourceResponse,
} from '@carto/api-client'

export const genDomain = ({ min, max, steps }: DomainRangeType) => {
  return Array.from({ length: steps }, (_, i) =>
    Math.round(min + (i * (max - min)) / (steps - 1))
  )
}

export const createLayers = ({
  layersVisibility,
  sourceData,
  customStyles,
}: {
  layersVisibility: Record<string, boolean>
  sourceData: VectorTableSourceResponse | VectorTilesetSourceResponse | null
  customStyles?: Record<string, Partial<ILayerStyle>>
}) => {
  if (!sourceData) return
  return Object.keys(layersVisibility)
    .filter(key => layersVisibility[key])
    .map(layerKey => {
      const config = LAYERS_CONFIG[layerKey]

      return new VectorTileLayer({
        id: config.id,
        data: sourceData,
        pickable: config.pickable,
        ...config.style,
        ...(customStyles?.[layerKey] ?? {}),
      })
    })
    .filter(Boolean)
}
