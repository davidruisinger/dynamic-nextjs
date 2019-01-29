import styled from '../_utils/styledComponents'

interface Props {
  alignSelf?:
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'stretch'
  basis?: string
  grow?: number
  order?: number
  shrink?: number
}

const FlexItem = styled.div<Props>`
  order: ${props => props.order};
  flex-grow: ${props => props.grow};
  flex-shrink: ${props => props.shrink};
  flex-basis: ${props => props.basis};
  align-self: ${props => props.alignSelf};
`

FlexItem.defaultProps = {
  alignSelf: 'auto',
  basis: 'auto',
  grow: 0,
  order: 0,
  shrink: 0,
}

export default FlexItem
