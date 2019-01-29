import styled from '../_utils/styledComponents'

interface Props {
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'stretch'
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
}
const FlexBox = styled.div<Props>`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: ${props => props.direction};
  flex-wrap: ${props => props.wrap};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  align-content: ${props => props.alignContent};
`
FlexBox.defaultProps = {
  alignItems: 'stretch',
  alignContent: 'stretch',
  direction: 'row',
  justifyContent: 'flex-start',
  wrap: 'nowrap',
}

export default FlexBox
