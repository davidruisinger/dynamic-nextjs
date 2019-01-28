import styled from 'styled-components'

interface Props {
  width?: string
  height?: string
  circular?: boolean
  rounded?: boolean
}

const Image = styled.img<Props>`
  object-fit: cover;
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: ${props =>
    props.circular ? '50%' : props.rounded ? '1em' : 0};
`

Image.defaultProps = {
  circular: false,
  height: 'auto',
  rounded: false,
  width: '100%',
}

export default Image
