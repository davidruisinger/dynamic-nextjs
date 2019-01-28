import { SERVICE_NAME } from '../constants'
import * as selectors from '../selectors'
import rootReducer from '../../reducer'
import { productStateMock, productsMock } from './_mocks'

const initialState = rootReducer(undefined, {} as any)

const stateMock = {
  ...initialState,
  [SERVICE_NAME]: {
    ...productStateMock,
    products: [
      { ...productsMock[0], id: '1' },
      { ...productsMock[0], id: '2' },
      { ...productsMock[0], id: '3' },
    ],
  },
}

describe('product selectors', () => {
  describe('getIsProductsFetching', () => {
    it('should return a boolean representing the fetching state', () => {
      const selected = selectors.getIsProductsFetching(stateMock)
      expect(selected).toEqual(productStateMock.isFetching)
    })
  })

  describe('getProductsError', () => {
    it('should return the error', () => {
      const selected = selectors.getProductsError(stateMock)
      expect(selected).toEqual(productStateMock.error)
    })
  })

  describe('getProducts', () => {
    it('should return the requested products', () => {
      const selected = selectors.getProducts(stateMock, {
        productIds: ['2', '3'], // We do NOT request the first product from the mock above
      })
      expect(selected).toHaveLength(2)
      expect(selected).toEqual(stateMock[SERVICE_NAME].products.slice(1))
    })
  })

  describe('getProducts', () => {
    it('should only return products that are in store', () => {
      const selected = selectors.getProducts(stateMock, {
        productIds: ['1', 'notexistent'],
      })
      expect(selected).toHaveLength(1)
      expect(selected).toContainEqual(stateMock[SERVICE_NAME].products[0])
    })
  })

  describe('getProducts', () => {
    it('should still work if productIds are missing', () => {
      const selected = selectors.getProducts(stateMock, {
        productIds: undefined,
      })
      expect(selected).toEqual([])
    })
  })
})
