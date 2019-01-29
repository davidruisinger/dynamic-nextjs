import 'jest-styled-components'
import React from 'react'
import testRenderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import ProductPrice from './index'
import { templateMock } from '../../services/template/__tests__/_mocks'
import { productsMock } from '../../services/product/__tests__/_mocks'
import { Product } from '../../services/product/types'

const productWithoutDiscount: Product = {
  ...productsMock[0],
  price_eur_regular: 100,
  price_eur_discounted: 100,
}
const productWithDiscount: Product = {
  ...productWithoutDiscount,
  price_eur_discounted: 90,
}

const regularPriceTree = testRenderer
  .create(
    <ThemeProvider theme={templateMock.variables}>
      <ProductPrice product={productWithoutDiscount} />
    </ThemeProvider>
  )
  .toJSON()
const discountedPriceTree = testRenderer
  .create(
    <ThemeProvider theme={templateMock.variables}>
      <ProductPrice product={productWithDiscount} />
    </ThemeProvider>
  )
  .toJSON()

describe('<ProductPrice />', () => {
  it('matches the snapshot', () => {
    expect(regularPriceTree).toMatchSnapshot()
    expect(discountedPriceTree).toMatchSnapshot()
  })

  it('renders a single price if there is no discount', () => {
    expect(regularPriceTree.children).toHaveLength(1)
    expect(regularPriceTree.children[0].children[0]).toEqual('€ 1')
  })

  it('renders the regular and the discounted price if there is a discount', () => {
    // 3 child nodes because we have a node with a ' ' (space character) inbetween
    expect(discountedPriceTree.children).toHaveLength(3)
    expect(discountedPriceTree.children[0].children[0]).toEqual('€ 1')
    expect(discountedPriceTree.children[1]).toEqual(' ')
    expect(discountedPriceTree.children[2].children[0]).toEqual('€ 0.9')
  })

  it('renders with the correct colors', () => {
    // 3 child nodes because we have a node with a ' ' (space character) inbetween
    expect(regularPriceTree.children[0]).toHaveStyleRule(
      'color',
      templateMock.variables.color_text_highlight
    )
    expect(discountedPriceTree.children[0]).toHaveStyleRule(
      'color',
      templateMock.variables.color_text_semi
    )
    expect(discountedPriceTree.children[2]).toHaveStyleRule(
      'color',
      templateMock.variables.color_text_highlight
    )
  })
})
