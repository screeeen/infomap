import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MapSelector } from './MapSelector'
import { useLayerContext } from '../layerContext/useLayerContext'
import '@testing-library/jest-dom'

vi.mock('../layerContext/useLayerContext', () => ({
  useLayerContext: vi.fn(),
}))

describe('MapSelector', () => {
  const toggleLayerMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useLayerContext as unknown as vi.Mock).mockReturnValue({
      layersVisibility: {
        stores: true,
        demographics: false,
      },
      toggleLayer: toggleLayerMock,
    })
  })

  it('renders checkbox with the right state', () => {
    render(<MapSelector />)

    screen.debug()

    const storesCheckbox = screen.getByRole('checkbox', { name: /stores/i })
    const demographicsCheckbox = screen.getByRole('checkbox', {
      name: /demographics/i,
    })

    expect(storesCheckbox).toBeChecked()
    expect(demographicsCheckbox).not.toBeChecked()
  })

  it('calls toggleLAyer by clicking the checkbox', () => {
    render(<MapSelector />)

    const storesCheckbox = screen.getByRole('checkbox', { name: /stores/i })
    fireEvent.click(storesCheckbox)

    expect(toggleLayerMock).toHaveBeenCalledTimes(1)
    expect(toggleLayerMock).toHaveBeenCalledWith('stores')
  })

  it('llama a toggleLayer con "demographics" al hacer click en Demographics', () => {
    render(<MapSelector />)

    const demographicsCheckbox = screen.getByRole('checkbox', {
      name: /demographics/i,
    })
    fireEvent.click(demographicsCheckbox)

    expect(toggleLayerMock).toHaveBeenCalledTimes(1)
    expect(toggleLayerMock).toHaveBeenCalledWith('demographics')
  })
})
