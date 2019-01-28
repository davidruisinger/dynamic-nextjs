import { createAction } from 'typesafe-actions'
import { Product } from './types'

/**
 * Redux action to fetch multiple products by ID.
 * @param {Object} config
 * @param {string[]} config.productIds - The productIds to fetch.
 */
export const fetchProducts = createAction('GET_PRODUCTS_REQUEST', resolve => {
  return ({ productIds }: { productIds: string[] }) => resolve({ productIds })
})

/**
 * Redux action to process an array of fetched products.
 * @param {Object} result
 * @param {string} result.products - The fetched products.
 */
export const fetchProductsSuccess = createAction(
  'GET_PRODUCTS_SUCCESS',
  resolve => {
    return ({ products }: { products: Product[] }) => resolve({ products })
  }
)

/**
 * Redux action to process an error while fetching products.
 * @param {Object} error
 * @param {string} error.message - The error message.
 */
export const fetchProductsFail = createAction('GET_PRODUCTS_FAIL', resolve => {
  return ({ message }: { message: string }) => resolve({ message })
})
