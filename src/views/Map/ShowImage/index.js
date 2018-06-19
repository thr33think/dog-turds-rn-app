import React, { Component } from 'react'
import { StyledView, StyledImage, StyledText } from './ShowImage.style'

class ShowImage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation
    return {
      title: `${state.params.title}`,
    }
  }

  render() {
    const turd = this.props.navigation.getParam('turd')

    return (
      <StyledView>
        <StyledImage source={{ uri: turd.image_url }} key={turd.image_url} />
      </StyledView>
    )
  }
}

export default ShowImage
