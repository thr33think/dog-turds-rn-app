import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { readFile } from 'react-native-fs'
import { connect } from 'react-redux'
import RoundButton from './../../../components/RoundButton'
import { StyledView, StyledImage, StyledCameraKitCamera, StyledBottomView } from './AddImage.style'
import { addDogshit } from './../../../redux/dogshits/actions'

@connect(
  null,
  {
    addDogshit,
  },
)
class AddImage extends Component {
  constructor(props) {
    super(props)
    this.camera = React.createRef()
    this.state = {
      imageCaptured: null,
    }
  }

  handleCapture = async () => {
    const image = await this.camera.capture(false)
    const base64Image = await readFile(image.uri, 'base64')
    this.setState({ imageCaptured: base64Image })
  }

  handleImageOk = async () => {
    this.props.addDogshit({
      lat: this.props.navigation.getParam('position').coords.latitude,
      long: this.props.navigation.getParam('position').coords.longitude,
      timestamp: Date.now().toString(),
      image_base64: `${this.state.imageCaptured}`,
      visible: true,
    })

    this.props.navigation.push('Map')
  }

  handleRetake = async () => {
    this.setState({ imageCaptured: null })
  }

  renderImageDone = () => (
    <StyledView>
      <StyledImage source={{ uri: `data:image/jpeg;base64,${this.state.imageCaptured}` }} />
      <StyledBottomView>
        <RoundButton onPress={this.handleImageOk}>
          <Icon name="ios-checkmark-outline" size={50} color="#FFFFFF" />
        </RoundButton>
      </StyledBottomView>
    </StyledView>
  )

  renderTakeImage = () => (
    <StyledView>
      <StyledCameraKitCamera
        innerRef={(camera) => { this.camera = camera }}
        cameraOptions={{
          flashMode: 'auto',
          focusMode: 'on',
          zoomMode: 'on',
          ratioOverlay: '1:1',
          ratioOverlayColor: '#EFEFF4',
        }}
      />
      <StyledBottomView>
        <RoundButton onPress={this.handleCapture}>
          <Icon name="ios-camera" size={25} color="#FFFFFF" />
        </RoundButton>
      </StyledBottomView>
    </StyledView>
  )

  render() {
    if (this.state.imageCaptured) {
      return this.renderImageDone()
    }

    return this.renderTakeImage()
  }
}

export default AddImage
