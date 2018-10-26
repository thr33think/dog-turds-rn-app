import styled from 'styled-components'
import { CameraKitCamera } from 'react-native-camera-kit'

export const StyledCenterView = styled.View`
  height: 100%;
  justify-content: center;
  background: #EFEFF4;
`

export const StyledView = styled.View`
  justify-content: flex-start;
  height: 100%;
`

export const StyledImage = styled.Image`
height: 100%;
`

export const StyledBottomView = styled.View`
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: 20px;
`

const StyledCameraKitCameraWrapper = ComponentName => styled(ComponentName)`
  height: 100%;
`
export const StyledCameraKitCamera = StyledCameraKitCameraWrapper(CameraKitCamera)
