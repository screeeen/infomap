import type {
  LngLatBoundsLike,
  PaddingOptions,
  PointLike,
  ViewState,
} from 'react-map-gl/maplibre'

export interface IInitialMap {
  latitude: number
  longitude: number
  zoom: number
  bearing: number
  pitch: number
}

export type IViewState = Partial<ViewState> & {
  bounds?: LngLatBoundsLike
  fitBoundsOptions?: {
    offset?: PointLike
    minZoom?: number
    maxZoom?: number
    padding?: number | PaddingOptions
  }
}

// export interface IViewState extends ViewState {
//   latitude: number
//   longitude: number
//   zoom: number
//   bearing: number
//   pitch: number
// }
