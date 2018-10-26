import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { readFile } from 'react-native-fs'
import { connect } from 'react-redux'
import { ActivityIndicator, Dimensions, ImageEditor, ImageStore } from 'react-native'
import RoundButton from './../../../components/RoundButton'
import { StyledView, StyledImage, StyledCameraKitCamera, StyledBottomView, StyledCenterView } from './AddImage.style'
import { addDogshit } from './../../../redux/dogshits/actions'
import NavigationService from './../../../services/NavigationService'

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

  async componentWillMount() {
    const cameraGranted = await StyledCameraKitCamera.requestDeviceCameraAuthorization()
    if (!cameraGranted) {
      NavigationService.navigate('Map')
    }
  }

  handleCapture = async () => {
    const image = await this.camera.capture(false)
    ImageEditor.cropImage(image.uri, {
      offset: { x: 0, y: 0 },
      size: { width: image.width, height: image.width },
      displaySize: { width: 1080, height: 1080 },
      resizeMode: 'contain',
    }, async (croppedURI) => {
      ImageStore.getBase64ForTag(croppedURI, (base64Data) => {
        this.setState({ imageCaptured: base64Data })
        ImageStore.removeImageForTag(croppedURI)
      }, (err) => {
        this.setState({ imageCaptured: null })
        console.warn(err)
      })
    }, (err) => {
      this.setState({ imageCaptured: null })
      console.warn(err)
    })
    // const base64Image = await readFile(image.uri, 'base64')
    // this.setState({ imageCaptured: base64Image })
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

  renderImageDone = () => {
    const length = Dimensions.get('window').width

    return (
      <StyledView>
        <StyledImage
          style={{ height: length, width: length }}
          source={{ uri: `data:image/jpeg;base64,${this.state.imageCaptured}` }}
        />
        <StyledBottomView>
          <RoundButton onPress={this.handleImageOk}>
            <Icon name="ios-checkmark-outline" size={50} color="#FFFFFF" />
          </RoundButton>
        </StyledBottomView>
      </StyledView>
    )
  }

  renderTakeImage = () => (
    <StyledView>
      <StyledCameraKitCamera
        style={{ height: Dimensions.get('window').width || 0 }}
        ref={(camera) => { this.camera = camera }}
        cameraOptions={{
          flashMode: 'auto',
          focusMode: 'on',
          zoomMode: 'on',
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
