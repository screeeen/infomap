import type { PickingInfo } from '@deck.gl/core'

export const getTooltip = (info: PickingInfo) => {
  if (!info.object) return null

  const props = info.object.properties as Record<string, unknown>

  let html = ''

  for (const key in props) {
    html += `<div><strong>${key}:</strong> ${String(props[key])}</div>`
  }

  return {
    html,
    style: {
      backgroundColor: 'white',
      color: 'black',
      fontSize: '12px',
      padding: '8px',
    },
  }
}
