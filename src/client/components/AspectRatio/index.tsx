import React, { FunctionComponent } from 'react'
import styled from '../_utils/styledComponents'

interface Props {
  width?: string
  ratio?: number
}

const Outer = styled.div<Props>`
  display: inline-block;
  position: relative;
  line-height: 0;
  width: ${props => props.width};
  padding-bottom: calc(${props => props.width} * ${props => props.ratio});
`

const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const AspectRatio: FunctionComponent<Props> = ({ children, width, ratio }) => (
  <Outer width={width} ratio={ratio}>
    <Inner>{children}</Inner>
  </Outer>
)

AspectRatio.defaultProps = {
  width: '100%',
  ratio: 1,
}

export default AspectRatio
