import styled from 'styled-components'
import { Dimensions } from 'react-native'
import MapView from 'react-native-maps'
import { palette } from 'styled-theme'

const StyledMapWrapper = ComponentName => styled(ComponentName)`
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').height};
  flex: 1;
`
export const StyledMap = StyledMapWrapper(MapView)

export const StyledView = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
  flex: 1;
`

export const StyledButtonList = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  flex: 1;
  margin-right: 10;
  align-items: flex-end;
  justify-content: flex-end;
`
