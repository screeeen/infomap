import type { ILayerStyle } from '../types/App.types'
import { Preview } from './MapEditor.styles'

export const ColorPreview = ({
  customStyles,
  selectedLayer,
  layerConfig,
}: {
  customStyles: Partial<ILayerStyle>
  selectedLayer: string
  layerConfig: Record<string, ILayerStyle>
}) => {
  console.log(
    '** customStyles,selectedLayer,layerConfig',
    customStyles[selectedLayer]
    // selectedLayer,
    // layerConfig
  )

  console.log(
    'cccc',
    (
      customStyles[selectedLayer]?.getFillColor ||
      layerConfig.style.getFillColor || [0, 0, 0]
    ).join(',')
  )

  return (
    <Preview
      color={(
        customStyles[selectedLayer]?.getFillColor ||
        layerConfig.style.getFillColor || [0, 0, 0]
      ).join(',')}
    />
  )
}
