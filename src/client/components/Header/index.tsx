import React, { FunctionComponent } from 'react'
import styled from 'styled-components'
import { ThemedComponent } from 'ComponentTypes'
import Container from '../Container'

const Wrapper = styled.header<ThemedComponent>`
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 999999;
  background-color: ${props => props.theme.color_canvas_third};
`

const Header: FunctionComponent<{}> = ({ children }) => (
  <Wrapper>
    <Container>{children}</Container>
  </Wrapper>
)

export default Header
