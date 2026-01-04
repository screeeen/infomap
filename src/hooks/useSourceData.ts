import { useEffect, useState } from 'react'
import { SOURCE_LOADERS } from '../constants/constants'
import type { CartoConfigType, ILayerConfig } from '../types/App.types'
import type {
  VectorTableSourceResponse,
  VectorTilesetSourceResponse,
} from '@carto/api-client'

export const useSourceData = ({
  config,
  cartoConfig,
  columns,
}: {
  config: ILayerConfig
  cartoConfig: CartoConfigType
  columns: string[]
}): VectorTableSourceResponse | VectorTilesetSourceResponse | null => {
  const [data, setData] = useState<
    VectorTableSourceResponse | VectorTilesetSourceResponse | null
  >(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        const loader = SOURCE_LOADERS[config.sourceType]

        const result = await loader({
          ...cartoConfig,
          tableName: config.tableName,
          columns,
        })

        if (isMounted) {
          setData(result)
        }
      } catch (error) {
        console.error('Error loading source data:', error)
        if (isMounted) {
          setData(null)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [config.sourceType, config.tableName, cartoConfig, columns])

  return data
}
