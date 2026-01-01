import { useState } from 'react'
import { LAYERS_CONFIG } from '../constants/constants'
import type { ILayerStyle } from '../types/App.types'

interface LayerStyleEditorProps {
  layersVisibility: Record<string, boolean>
  customStyles: Record<string, Partial<ILayerStyle>>
  onStyleUpdate: (layerKey: string, styleUpdates: Partial<ILayerStyle>) => void
  onStyleReset: (layerKey: string) => void
}

export const LayerStyleEditor = ({
  layersVisibility,
  customStyles,
  onStyleUpdate,
  onStyleReset,
}: LayerStyleEditorProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null)

  const visibleLayers = Object.keys(layersVisibility).filter(
    key => layersVisibility[key]
  )

  if (visibleLayers.length === 0) return null

  const handleColorChange = (
    layerKey: string,
    colorIndex: number,
    value: number
  ) => {
    const currentStyle = customStyles[layerKey] || {}
    const currentColor = currentStyle.getFillColor ||
      LAYERS_CONFIG[layerKey].style.getFillColor || [0, 0, 0]

    const newColor = [...currentColor]
    newColor[colorIndex] = value

    onStyleUpdate(layerKey, { getFillColor: newColor as number[] })
  }

  const handleRadiusChange = (layerKey: string, value: number) => {
    onStyleUpdate(layerKey, { pointRadiusMinPixels: value })
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 80,
        right: 10,
        background: 'white',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        zIndex: 1000,
        minWidth: 250,
      }}
    >
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '12px 16px',
          cursor: 'pointer',
          borderBottom: isOpen ? '1px solid #eee' : 'none',
          fontWeight: 600,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>🎨 Estilos de Capas</span>
        <span style={{ fontSize: 12 }}>{isOpen ? '▼' : '▶'}</span>
      </div>

      {/* Content */}
      {isOpen && (
        <div style={{ padding: 16 }}>
          {/* Selector de capa */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 14 }}>
              Capa:
            </label>
            <select
              value={selectedLayer || ''}
              onChange={e => setSelectedLayer(e.target.value)}
              style={{
                width: '100%',
                padding: 8,
                borderRadius: 4,
                border: '1px solid #ddd',
              }}
            >
              <option value="">Selecciona una capa</option>
              {visibleLayers.map(key => (
                <option key={key} value={key}>
                  {LAYERS_CONFIG[key].displayName || key}
                </option>
              ))}
            </select>
          </div>

          {/* Controles de estilo */}
          {selectedLayer && (
            <div>
              {/* Color Fill */}
              {LAYERS_CONFIG[selectedLayer].style.getFillColor && (
                <div style={{ marginBottom: 16 }}>
                  <label
                    style={{ display: 'block', marginBottom: 8, fontSize: 14 }}
                  >
                    Color (RGB):
                  </label>
                  {['R', 'G', 'B'].map((label, index) => {
                    const currentStyle = customStyles[selectedLayer] || {}
                    const currentColor = currentStyle.getFillColor ||
                      LAYERS_CONFIG[selectedLayer].style.getFillColor || [
                        0, 0, 0,
                      ]

                    return (
                      <div key={label} style={{ marginBottom: 8 }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                          }}
                        >
                          <span style={{ width: 20, fontSize: 12 }}>
                            {label}:
                          </span>
                          <input
                            type="range"
                            min="0"
                            max="255"
                            value={currentColor[index]}
                            onChange={e =>
                              handleColorChange(
                                selectedLayer,
                                index,
                                parseInt(e.target.value)
                              )
                            }
                            style={{ flex: 1 }}
                          />
                          <span
                            style={{
                              width: 35,
                              fontSize: 12,
                              textAlign: 'right',
                            }}
                          >
                            {currentColor[index]}
                          </span>
                        </div>
                      </div>
                    )
                  })}

                  {/* Vista previa del color */}
                  <div
                    style={{
                      marginTop: 8,
                      height: 30,
                      borderRadius: 4,
                      border: '1px solid #ddd',
                      backgroundColor: `rgb(${(
                        customStyles[selectedLayer]?.getFillColor ||
                        LAYERS_CONFIG[selectedLayer].style.getFillColor || [
                          0, 0, 0,
                        ]
                      ).join(',')})`,
                    }}
                  />
                </div>
              )}

              {/* Radio de punto */}
              {LAYERS_CONFIG[selectedLayer].style.pointRadiusMinPixels !==
                undefined && (
                <div style={{ marginBottom: 16 }}>
                  <label
                    style={{ display: 'block', marginBottom: 8, fontSize: 14 }}
                  >
                    Tamaño de punto:
                  </label>
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={
                        customStyles[selectedLayer]?.pointRadiusMinPixels ||
                        LAYERS_CONFIG[selectedLayer].style
                          .pointRadiusMinPixels ||
                        3
                      }
                      onChange={e =>
                        handleRadiusChange(
                          selectedLayer,
                          parseInt(e.target.value)
                        )
                      }
                      style={{ flex: 1 }}
                    />
                    <span
                      style={{ width: 35, fontSize: 12, textAlign: 'right' }}
                    >
                      {customStyles[selectedLayer]?.pointRadiusMinPixels ||
                        LAYERS_CONFIG[selectedLayer].style
                          .pointRadiusMinPixels ||
                        3}
                      px
                    </span>
                  </div>
                </div>
              )}

              {/* Botón reset */}
              <button
                onClick={() => onStyleReset(selectedLayer)}
                style={{
                  width: '100%',
                  padding: '8px 16px',
                  background: '#f0f0f0',
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 14,
                }}
              >
                Resetear a valores por defecto
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
