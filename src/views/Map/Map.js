import React, { Component } from 'react'
import { ActivityIndicator, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import { CameraKitCamera } from 'react-native-camera-kit'
import { StyledView, StyledMap, StyledButtonList } from './Map.style'
import { getDogshits, getTurd, clearImage } from './../../redux/dogshits/actions'
import TurdMarker from './TurdMarker'
import RoundButton from './../../components/RoundButton'

@connect(
  state => ({
    dogshitsState: state.dogshits,
  }),
  {
    getDogshits,
    getTurd,
    clearImage,
  },
)
class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      position: null,
      permissionDeniedGeolocation: false,
      permissionGrantedCamera: true,
    }
  }

  componentDidMount() {
    this.props.getDogshits()
    navigator.geolocation.getCurrentPosition(this.storePositionInState, this.showMessageIfLocationAccessDenied)
  }

  storePositionInState = position => this.setState({ ...this.state, position })

  showMessageIfLocationAccessDenied = () => this.setState({ permissionDeniedGeolocation: true })

  centerMap = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.mapView.animateToCoordinate(
        {
          latitude: Number(position.coords.latitude),
          longitude: Number(position.coords.longitude),
        },
        3000,
      )
    }, this.showMessageIfLocationAccessDenied)
  }

  handleAddImage = async () => {
    const permissionGrantedCamera = await CameraKitCamera.checkDeviceCameraAuthorizationStatus()

    console.log('permissionGrantedCamera', permissionGrantedCamera)

    this.setState({ permissionGrantedCamera })
    if (this.state.permissionGrantedCamera) {
      this.props.navigation.push('AddImage')
    } else {
      await CameraKitCamera.requestDeviceCameraAuthorization()
    }
  }

  renderButtons = () => (
    <StyledButtonList>
      <RoundButton onPress={this.handleAddImage}>
        <Icon name="add" size={25} color="#FFFFFF" />
      </RoundButton>
      <RoundButton onPress={() => this.centerMap()}>
        <Icon name="gps-fixed" size={25} color="#FFFFFF" />
      </RoundButton>
    </StyledButtonList>
  )

  renderMap = () => (
    <StyledMap
      ref={(mapView) => { this.mapView = mapView }}
      initialRegion={{
        latitude: this.state.position.coords.latitude,
        longitude: this.state.position.coords.longitude,
        latitudeDelta: 0.0015,
        longitudeDelta: 0.00121,
      }}
      showsUserLocation
      followUserLocation
    >
      {this.props.dogshitsState.records.map(turd => (
        <TurdMarker
          key={`turd_${turd.id}`}
          turd={turd}
          navigation={this.props.navigation}
        />
      ))}
    </StyledMap>
  )

  render() {
    if (this.state.permissionDeniedGeolocation) {
      return <StyledView><Text>You need to allow location access in your phone&apos;s settings otherwise you cannot use the turd map</Text></StyledView>
    }

    if (!this.state.permissionGrantedCamera) {
      return <StyledView><Text>You need to allow access to your camera to add turds</Text></StyledView>
    }

    return (
      <StyledView>
        { this.state.position === null
          ? <ActivityIndicator />
          : this.renderMap()
        }
        {this.renderButtons()}
      </StyledView>
    )
  }
}

export default Map
