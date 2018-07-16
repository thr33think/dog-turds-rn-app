import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { StyledView, StyledImage } from './ShowImage.style'

class ShowImage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation
    return {
      title: `${state.params.title}`,
    }
  }

  render() {
    const turd = this.props.navigation.getParam('turd')
    const length = Dimensions.get('window').width

    return (
      <StyledView>
        <StyledImage
          resizeMode="contain"
          source={{ uri: turd.image_url }}
          key={turd.image_url}
          style={{ width: length, height: length }}
        />
      </StyledView>
    )
  }
}

export default ShowImage
