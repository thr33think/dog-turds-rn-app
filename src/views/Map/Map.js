import React, { Component } from 'react'
import { ActivityIndicator, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import { StyledView, StyledMap, StyledButton, StyledButtonList } from './Map.style'
import { getDogshits, getTurd, clearImage } from './../../redux/dogshits/actions'
import TurdMarker from './TurdMarker'

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
      permissionDeniedGeolocation: '',
    }
  }

  componentDidMount() {
    this.props.getDogshits()
    navigator.geolocation.getCurrentPosition(this.storePositionInState, this.showMessageIfLocationAccessDenied)
  }

  storePositionInState = position => this.setState({ ...this.state, position })

  showMessageIfLocationAccessDenied = () => this.setState({ permissionDeniedGeolocation: true })

  centerMap = () => {
    console.log('center map called')
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

  renderButtons = () => (
    <StyledButtonList>
      {/* <StyledButton onPress={() => this.props.navigation.push('AddImage')}>
        <Icon name="add" size={20} color="#FFFFFF" />
      </StyledButton> */}
      <StyledButton onPress={() => this.centerMap()}>
        <Icon name="gps-fixed" size={20} color="#FFFFFF" />
      </StyledButton>
    </StyledButtonList>
  )

  renderMap = () => (
    <StyledMap
      innerRef={(mapView) => { this.mapView = mapView }}
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
          key={turd.id}
          turd={turd}
          getTurdFn={this.props.getTurd}
          clearImageFn={this.props.clearImage}
          turdImage={this.props.dogshitsState.currentTurd}
        />
      ))}
    </StyledMap>
  )

  render() {
    if (this.state.permissionDeniedGeolocation) {
      return <StyledView><Text>You need to allow location access in your phone's settings otherwise you cannot use the turd map</Text></StyledView>
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
