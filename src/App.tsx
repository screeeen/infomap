import { CartoMap } from './CartoMap'
import { LayerProvider } from './layerContext/LayerProvider'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from '@carto/react-ui'

import { Provider } from 'react-redux'
import { store } from './store/store'

function App(): React.ReactNode {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <LayerProvider>
            <CartoMap />
          </LayerProvider>
        </CssBaseline>
      </ThemeProvider>
    </Provider>
  )
}

export default App
