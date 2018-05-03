import styled from 'styled-components'
import { CameraKitCamera } from 'react-native-camera-kit'
import { palette } from 'styled-theme'

export const StyledView = styled.View`
  height: 100%;
  justify-content: flex-end;
  background: #EFEFF4;
`

export const StyledImage = styled.Image`
  flex: 1;
`

export const StyledBottomView = styled.View`
  align-self: center;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  margin: 10px 0px;
`

const StyledCameraKitCameraWrapper = ComponentName => styled(ComponentName)`
  flex: 10;
`
export const StyledCameraKitCamera = StyledCameraKitCameraWrapper(CameraKitCamera)
