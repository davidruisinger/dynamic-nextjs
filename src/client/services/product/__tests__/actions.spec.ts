import * as actions from '../actions'
import { productsMock } from './_mocks'

describe('product service actions', () => {
  it('should create an action to fetch multiple products', () => {
    const productIds = ['1', '2', '3']
    const expectedAction = {
      type: 'GET_PRODUCTS_REQUEST',
      payload: {
        productIds,
      },
    }
    expect(actions.fetchProducts({ productIds })).toEqual(expectedAction)
  })
  it('should create an action to process an array of fetched products', () => {
    const expectedAction = {
      type: 'GET_PRODUCTS_SUCCESS',
      payload: {
        products: productsMock,
      },
    }
    expect(actions.fetchProductsSuccess({ products: productsMock })).toEqual(
      expectedAction
    )
  })

  it('should create an action to process an error while fetching products', () => {
    const message = 'Test error'
    const expectedAction = {
      type: 'GET_PRODUCTS_FAIL',
      payload: {
        message,
      },
    }
    expect(actions.fetchProductsFail({ message })).toEqual(expectedAction)
  })
})
