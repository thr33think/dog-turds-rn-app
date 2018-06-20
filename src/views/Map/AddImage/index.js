import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { readFile } from 'react-native-fs'
import { connect } from 'react-redux'
import { ActivityIndicator } from 'react-native'
import RoundButton from './../../../components/RoundButton'
import { StyledView, StyledImage, StyledCameraKitCamera, StyledBottomView, StyledCenterView } from './AddImage.style'
import { addDogshit } from './../../../redux/dogshits/actions'

@connect(
  state => ({
    dogshitsState: state.dogshits,
  }),
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
    navigator.geolocation.getCurrentPosition((position) => {
      this.props.addDogshit({
        lat: position.coords.latitude,
        long: position.coords.longitude,
        timestamp: Date.now().toString(),
        image_base64: `${this.state.imageCaptured}`,
        visible: true,
      })
    })
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
    if (this.props.dogshitsState.isLoading) {
      return <StyledCenterView><ActivityIndicator /></StyledCenterView>
    }

    if (this.state.imageCaptured) {
      return this.renderImageDone()
    }

    return this.renderTakeImage()
  }
}

export default AddImage
