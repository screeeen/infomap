export const MapUISelector = ({
  layersVisibility,
  toggleLayer,
}: {
  layersVisibility: { stores: boolean; demographics: boolean }
  toggleLayer: (layer: string) => void
}) => {
  const { stores, demographics } = layersVisibility
  return (
    <div
      style={{
        position: 'absolute',
        top: 10,
        left: 10,
        background: 'rgba(255,255,255,0.9)',
        padding: 10,
        borderRadius: 4,
      }}
    >
      <label>
        <input
          type="checkbox"
          checked={stores}
          onChange={() => toggleLayer('stores')}
        />{' '}
        Stores
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={demographics}
          onChange={() => toggleLayer('demographics')}
        />{' '}
        demographics
      </label>
    </div>
  )
}
