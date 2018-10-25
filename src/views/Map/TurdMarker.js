import React from 'react'
import { Marker } from 'react-native-maps'
import moment from 'moment'


const TurdMarker = ({ turd, navigation }) => (
  <Marker
    coordinate={{ latitude: turd.lat, longitude: turd.long }}
    image={require('./turdIcon.png')}
    centerOffset={{y: -36}}
    onPress={() => navigation.push('ShowImage', { turd, title: moment(parseInt(turd.timestamp, 10)).local().format('DD.MM.YYYY HH:mm') })}
    stopPropagation
  />
)

export default TurdMarker
