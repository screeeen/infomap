import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CartoMap } from './CartoMap'
import { useLayerContext } from './layerContext/useLayerContext'
import { createLayers } from './utils/utils'
import { INITIAL_VIEW_STATE } from './constants/constants'

// // Mocks
vi.mock('deck.gl', () => ({
  default: vi.fn(({ children, ...props }) => (
    <div data-testid="deckgl" {...props}>
      {children}
    </div>
  )),
}))

vi.mock('react-map-gl/maplibre', () => ({
  default: vi.fn(props => <div data-testid="map" {...props} />),
}))

vi.mock(import('@deck.gl/carto'), async importOriginal => {
  const actual = await importOriginal()
  return {
    ...actual,
    BASEMAP: {
      VOYAGER: 'voyager-basemap',
    },
  }
})

vi.mock('./UI/Editor', () => ({
  Editor: vi.fn(() => <div data-testid="editor">Editor</div>),
}))

vi.mock('./UI/getTooltip', () => ({
  getTooltip: vi.fn(() => <div data-testid="tooltip">Tooltip</div>),
}))

vi.mock('./utils/utils', () => ({
  createLayers: vi.fn(() => []),
}))

vi.mock('./cartoConfig/cartoConfig', () => ({
  cartoConfig: {},
}))

vi.mock('./layerContext/useLayerContext', () => ({
  useLayerContext: vi.fn(),
}))

describe('CartoMap', () => {
  const mockLayerContext = {
    id: 'test',
    layersVisibility: { layer1: true, layer2: false },
    customStyles: { color: '#ff0000' },
    columns: ['col1', 'col2'],
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useLayerContext).mockReturnValue(mockLayerContext)
  })

  it('renders correctly', () => {
    render(<CartoMap />)

    expect(screen.getByTestId('map')).toBeInTheDocument()
    expect(screen.getByTestId('deckgl')).toBeInTheDocument()
    expect(screen.getByTestId('editor')).toBeInTheDocument()
  })

  it('calls the right params', () => {
    render(<CartoMap />)

    expect(createLayers).toHaveBeenCalledWith({
      layersVisibility: mockLayerContext.layersVisibility,
      cartoConfig: expect.any(Object),
      customStyles: mockLayerContext.customStyles,
      columns: mockLayerContext.columns,
    })
  })

  it('calcs layer when changing visibility', () => {
    const { rerender } = render(<CartoMap />)

    expect(createLayers).toHaveBeenCalledTimes(1)

    // Cambiar el contexto
    vi.mocked(useLayerContext).mockReturnValue({
      ...mockLayerContext,
      layersVisibility: { layer1: false, layer2: true },
    })

    rerender(<CartoMap />)

    expect(createLayers).toHaveBeenCalledTimes(2)
  })

  it('calc layers when changing styles', () => {
    const { rerender } = render(<CartoMap />)

    expect(createLayers).toHaveBeenCalledTimes(1)

    // Cambiar el contexto
    vi.mocked(useLayerContext).mockReturnValue({
      ...mockLayerContext,
      customStyles: { color: '#00ff00' },
    })

    rerender(<CartoMap />)

    expect(createLayers).toHaveBeenCalledTimes(2)
  })

  it('calc columns when changed', () => {
    const { rerender } = render(<CartoMap />)

    expect(createLayers).toHaveBeenCalledTimes(1)

    // Cambiar el contexto
    vi.mocked(useLayerContext).mockReturnValue({
      ...mockLayerContext,
      columns: ['col1', 'col2', 'col3'],
    })

    rerender(<CartoMap />)

    expect(createLayers).toHaveBeenCalledTimes(2)
  })

  it('renders container correctly', () => {
    const { container } = render(<CartoMap />)

    const box = container.firstChild
    expect(box).toHaveStyle({
      position: 'relative',
      width: '100%',
      height: '100%',
    })
  })

  it('keep layers memoized when deps change', () => {
    const { rerender } = render(<CartoMap />)

    expect(createLayers).toHaveBeenCalledTimes(1)

    // Mismo contexto
    vi.mocked(useLayerContext).mockReturnValue(mockLayerContext)

    rerender(<CartoMap />)

    // No debería llamarse de nuevo porque las dependencias no cambiaron
    expect(createLayers).toHaveBeenCalledTimes(1)
  })

  it('renderiza Map y DeckGL con posicionamiento absoluto', () => {
    render(<CartoMap />)

    const map = screen.getByTestId('map')
    const deckgl = screen.getByTestId('deckgl')

    expect(map).toHaveStyle({ position: 'absolute', inset: '0' })
    expect(deckgl).toHaveStyle({ position: 'absolute', inset: '0' })
  })
})
