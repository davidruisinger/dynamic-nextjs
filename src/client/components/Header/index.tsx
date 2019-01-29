import React, { FunctionComponent } from 'react'
import styled from '../_utils/styledComponents'
import Container from '../Container'

const Wrapper = styled.header`
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
