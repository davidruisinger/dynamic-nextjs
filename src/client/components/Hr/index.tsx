import styled from 'styled-components'
import { ThemedComponent } from 'ComponentTypes'

const Hr = styled.hr<ThemedComponent>`
  border: 0;
  background-color: ${props => props.theme.color_canvas_first};
  height: 1px;
`

export default Hr
