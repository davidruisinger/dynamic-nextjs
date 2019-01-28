import { createGlobalStyle } from 'styled-components'
import { StyledCompProps } from 'ComponentTypes'

export default createGlobalStyle`
  html {
    width: 100%;
    height: 100%;
    font-family: 'PingFang SC', Helvetica, sans-serif;
    background-color: ${props => props.theme.color_canvas_ground};
    font-size: 16px;
    color: ${(props: StyledCompProps) => props.theme.color_text_default};
  }
  body {
    height: 100%;
    width: 100%;
  }
  #__next {
    height: 100%;
    width: 100%;
  }
  p {
    font-size: 1em;
    font-weight: 400;
  }
  h1 {
    font-size: 1.6em;
    font-weight: 600;
  }
  h2 {
    font-size: 1.4em;
    font-weight: 600;
  }
  h3 {
    font-size: 1.2em;
    font-weight: 500;
  }
  h4, h5, h6 {
    font-size: 1.1em;
    font-weight: 400;
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.color_action_primary};
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0.4);
  }
  a:active,
  a:focus {
    outline: none;
  }
`
