import React from 'react'
import { Marker, Callout } from 'react-native-maps'
import { ActivityIndicator } from 'react-native'
import { StyledView, StyledImage } from './TurdMarker.style'

const TurdMarker = ({ turd, turdImage, clearImageFn, getTurdFn }) => {
  const handlePress = () => {
    clearImageFn()
    getTurdFn(turd.id)
  }

  return (
    <Marker
      coordinate={{ latitude: turd.lat, longitude: turd.long }}
      title={turd.id}
      image={require('./poo.png')}
      onPress={() => handlePress()}
      stopPropagation
    >
      <Callout>
        <StyledView>
          { turdImage === null
            ? <ActivityIndicator />
            : <StyledImage source={{ uri: `${turdImage}` }} />
          }
        </StyledView>
      </Callout>
    </Marker>
  )
}

export default TurdMarker
