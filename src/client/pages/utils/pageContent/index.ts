import { Store } from 'StoreTypes'
import MarkdownParser from './MarkdownParser'
import ProductListParser from './ProductListParser'
import { TemplatePageContent } from '../../../services/template/types'

export const fetchPageContent = async ({
  pageContent = [],
  store,
  isServer,
}: {
  pageContent: TemplatePageContent[]
  store: Store
  isServer: boolean
}) => {
  let fetchedContent = []

  for (const element of pageContent) {
    switch (element.type) {
      case 'Markdown':
        fetchedContent.push(
          await MarkdownParser.fetchContent({
            store,
            isServer,
            element,
          })
        )
        break

      case 'ProductList':
        fetchedContent.push(
          await ProductListParser.fetchContent({
            store,
            isServer,
            element,
          })
        )
        break

      default:
        // The element is not supported
        break
    }
  }
  return fetchedContent
}

export const renderPageContent = ({
  pageContent = [],
}: {
  pageContent: TemplatePageContent[]
}) =>
  pageContent.map((element, index) => {
    const key = `${element.type}_${index}`
    switch (element.type) {
      case 'Markdown':
        return MarkdownParser.render({ key, element })

      case 'ProductList':
        return ProductListParser.render({ key, element })

      default:
        return null
    }
  })
