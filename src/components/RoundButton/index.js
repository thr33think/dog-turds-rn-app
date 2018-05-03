import React from 'react'
import { StyledRoundButton } from './RoundButton.style'

const RoundButton = props => (
  <StyledRoundButton {...props}>
    {props.children}
  </StyledRoundButton>
)

export default RoundButton
