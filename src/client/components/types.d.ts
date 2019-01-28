declare module 'ComponentTypes' {
  import { TemplateVariables } from '../services/template/types'

  export type ThemedComponent = {
    theme?: TemplateVariables & {
      appName: string
      appLogo: string
    }
  }
}
