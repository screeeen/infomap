import { CartoMap } from './CartoMap'
import { LayerProvider } from './layerContext/LayerProvider'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { theme } from '@carto/react-ui'

function App(): React.ReactNode {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <LayerProvider>
          <CartoMap />
        </LayerProvider>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
