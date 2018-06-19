import { StackNavigator } from 'react-navigation'
import Map from './Map'
import AddImage from './AddImage'
import ShowImage from './ShowImage'

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
  ShowImage: {
    screen: ShowImage,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
}, {
  mode: 'modal',
})

export default MapRoutes
