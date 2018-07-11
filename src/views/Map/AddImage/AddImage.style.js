import styled from 'styled-components'
import { CameraKitCamera } from 'react-native-camera-kit'
import { palette } from 'styled-theme'

export const StyledCenterView = styled.View`
  height: 100%;
  justify-content: center;
  background: #EFEFF4;
`

export const StyledView = styled.View`
  justify-content: space-around;
  height: 100%;
`

export const StyledImage = styled.Image`
`

export const StyledBottomView = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`

const StyledCameraKitCameraWrapper = ComponentName => styled(ComponentName)`
`
export const StyledCameraKitCamera = StyledCameraKitCameraWrapper(CameraKitCamera)
