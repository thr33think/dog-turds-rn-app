import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'
import { store, persistor } from './src/redux/store'
import { RootRoutes } from './src/rootRoutes'
import NavigationService from './src/services/NavigationService'
import theme from './src/theme'


const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme.themedefault}>
        <RootRoutes ref={(navigatorRef) => { NavigationService.setTopLevelNavigator(navigatorRef) }} />
      </ThemeProvider>
    </PersistGate>
  </Provider>
)

export default App
