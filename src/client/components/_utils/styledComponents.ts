// By default every styled component will have the theme prop set to any
// See https://www.styled-components.com/docs/api#typescript
//
// So we re-export the styled function with our custom theme type (TemplateVariables)
import * as styledComponents from 'styled-components'
import { ThemedStyledComponentsModule } from 'styled-components'
import { TemplateVariables } from '../../services/template/types'

export type Theme = TemplateVariables & {
  appName: string
  appLogo: string
}

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<Theme>

export { css, createGlobalStyle, keyframes, ThemeProvider }
export default styled
