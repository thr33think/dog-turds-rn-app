import styled from 'styled-components'
import { palette } from 'styled-theme'

export const StyledRoundButton = styled.TouchableOpacity`
  background-color: ${palette('primary', 0)};
  border-radius: 25;
  width: 50;
  height: 50;
  margin-bottom: 10;
  align-items: center;
  justify-content: center;
`

export default StyledRoundButton
