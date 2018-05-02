import { StackNavigator } from 'react-navigation'
import Map from './views/Map'

export const RootRoutes = StackNavigator({
  Map: {
    screen: Map,
  },
}, {
  headerMode: 'none',
})

export default RootRoutes
