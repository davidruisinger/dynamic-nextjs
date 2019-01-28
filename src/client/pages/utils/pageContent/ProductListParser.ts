import React from 'react'
import {
  ElementParser,
  ParserFetchContext,
  ParserRenderContext,
} from 'PageTypes'
import { fetchProducts } from '../../../services/product/actions'
import { getProducts } from '../../../services/product/selectors'
import { ProductList } from '../../../components'

export default class ProductListParser implements ElementParser {
  static async fetchContent({ isServer, element, store }: ParserFetchContext) {
    /**
     * Fetch the products that are needed
     * NOTE: The product service takes care of filtering out the products that are already in store
     */
    await store.awaitDispatch(isServer, dispatch =>
      dispatch(
        fetchProducts({
          productIds: element.content,
        })
      )
    )
    // Get the products from the store and populate them on the content of the element
    return {
      ...element,
      content: getProducts(store.getState(), { productIds: element.content }),
    }
  }

  static render = ({ key, element }: ParserRenderContext) =>
    React.createElement(ProductList, { key, products: element.content }, null)
}
