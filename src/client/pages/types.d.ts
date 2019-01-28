declare module 'PageTypes' {
  import { ReactElement } from 'react'
  import { NextContext } from 'Next'
  import { Store } from 'StoreTypes'
  import { TemplatePageContent } from '../services/template/types'

  // Declares a custome Context including the store that we add in app.tsx with the withRedux HOC
  export type PageContext = NextContext & {
    store: Store
  }

  export type ParserRenderContext = {
    key: string
    element: TemplatePageContent
  }

  export type ParserFetchContext = {
    element: TemplatePageContent
    store: Store
    isServer: boolean
  }

  export class ElementParser {
    static fetchContent: (
      context: ParserFetchContext
    ) => Promise<TemplatePageContent>
    static render: (context: ParserRenderContext) => ReactElement<any> | null
  }
}
