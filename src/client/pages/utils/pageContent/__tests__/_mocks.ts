import {
  MarkdownElement,
  ProductListElement,
} from '../../../../services/template/types'

export const markDownElementMock: MarkdownElement = {
  type: 'Markdown',
  content: 'Some Markdown string',
}

export const productListElementMock: ProductListElement = {
  type: 'ProductList',
  content: ['1'],
}
