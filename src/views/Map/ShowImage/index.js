import React, { Component } from 'react'
import { Dimensions, ActivityIndicator } from 'react-native'
import { StyledView, StyledImage } from './ShowImage.style'

class ShowImage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation
    return {
      title: `${state.params.title}`,
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  render() {
    const turd = this.props.navigation.getParam('turd')
    const length = Dimensions.get('window').width
    const displayImage = this.state.isLoading ? 'none' : 'block'

    return (
      <StyledView>

        { this.state.isLoading ? <ActivityIndicator size="large" /> : null }

        <StyledImage
          onLoadEnd={() => { this.setState({ isLoading: false }) }}
          resizeMode="contain"
          source={{ uri: turd.image_url }}
          key={turd.image_url}
          
          style={[{width: 0, height: 0,},
            !this.state.isLoading && {width: length, height: length,}]}
        />
      </StyledView>
    )
  }
}

export default ShowImage
