import { StackNavigator } from 'react-navigation'
import Map from './Map'
import AddImage from './AddImage'

export const MapRoutes = StackNavigator({
  Map: {
    screen: Map,
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    },
  },
  AddImage: {
    screen: AddImage,
    navigationOptions: {
      gesturesEnabled: false,
      title: 'Add a turd',
    },
  },
}, {
  headerMode: 'float',
  mode: 'modal',
})

export default MapRoutes
