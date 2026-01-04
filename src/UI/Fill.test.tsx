import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Fill } from './Fill'
import { useLayerContext } from '../layerContext/useLayerContext'
import '@testing-library/jest-dom'

vi.mock('../layerContext/useLayerContext', () => ({
  useLayerContext: vi.fn(),
}))

vi.mock('../constants/constants', () => ({
  LAYERS_CONFIG: {
    stores: {
      style: {
        getFillColor: [10, 20, 30, 40],
      },
    },
  },
}))

describe('Fill', () => {
  const updateLayerStyleMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useLayerContext as unknown as vi.Mock).mockReturnValue({
      selectedLayer: 'stores',
      updateLayerStyle: updateLayerStyleMock,
      customStyles: {},
    })
  })

  it('renders slide with default config values', () => {
    render(<Fill />)

    expect(screen.getByText('Fill')).toBeInTheDocument()
    expect(screen.getByText('R:')).toBeInTheDocument()
    expect(screen.getByText('G:')).toBeInTheDocument()
    expect(screen.getByText('B:')).toBeInTheDocument()
    expect(screen.getByText('A:')).toBeInTheDocument()

    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('20')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()
    expect(screen.getByText('40')).toBeInTheDocument()
  })

  it('calls updateLayerStyle when user modifies colors', () => {
    render(<Fill />)

    const sliders = screen.getAllByRole('slider')
    const redSlider = sliders[0]

    fireEvent.change(redSlider, { target: { value: 100 } })

    expect(updateLayerStyleMock).toHaveBeenCalledTimes(1)
    expect(updateLayerStyleMock).toHaveBeenCalledWith('stores', {
      getFillColor: [100, 20, 30, 40],
    })
  })

  it('uses customStyles if they exists instead of default values', () => {
    ;(useLayerContext as unknown as vi.Mock).mockReturnValue({
      selectedLayer: 'stores',
      updateLayerStyle: updateLayerStyleMock,
      customStyles: {
        stores: {
          getFillColor: [1, 2, 3, 4],
        },
      },
    })

    render(<Fill />)

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
  })
})
