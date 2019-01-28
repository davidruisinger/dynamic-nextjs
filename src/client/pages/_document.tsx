// NOTE: This component is NEVER rendered on the client
import React from 'react'
import Document, {
  Head,
  Main,
  NextScript,
  NextDocumentContext,
  DefaultDocumentIProps,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

interface CustomDocumentIProps extends DefaultDocumentIProps {
  styleTags: React.ReactElement<{}>[]
}

class CustomDocument extends Document<CustomDocumentIProps> {
  static async getInitialProps(
    context: NextDocumentContext
  ): Promise<CustomDocumentIProps> {
    const { renderPage } = context
    // Create a new StyleSheet
    const sheet = new ServerStyleSheet()
    // Render the page and collect the styles
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
    // Get the style element
    const styleTags = sheet.getStyleElement()

    return {
      ...page,
      styleTags,
    }
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/** styled-component styles */}
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default CustomDocument
