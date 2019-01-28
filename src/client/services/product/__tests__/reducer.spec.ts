import reducer from '../reducer'
import * as actions from '../actions'
import { productsMock } from './_mocks'

const initialState = reducer(undefined, {} as any)

describe('product service reducer', () => {
  describe('initial state', () => {
    it('should match the snapshot', () => {
      expect(initialState).toMatchSnapshot()
    })
  })

  let fetchingState, successState, errorState
  describe('fetchProducts action', () => {
    it('should set isFetching', () => {
      const action = actions.fetchProducts({
        productIds: ['1', '2'],
      })
      fetchingState = reducer(initialState, action)
      expect(fetchingState.isFetching).toBeTruthy()
    })
  })

  describe('fetchProductsSuccess action', () => {
    it('should unset isFetching and set the products', () => {
      const action = actions.fetchProductsSuccess({ products: productsMock })
      successState = reducer(fetchingState, action)
      expect(successState.isFetching).toBeFalsy()
      expect(successState.products).toEqual(productsMock)
    })

    it('should add products to an existing list of products', () => {
      const modifiedProductsMocks = [
        {
          ...productsMock[0],
          id: '2',
        },
        {
          ...productsMock[0],
          id: '3',
        },
      ]
      const action = actions.fetchProductsSuccess({
        products: modifiedProductsMocks,
      })
      successState = reducer(successState, action)
      expect(successState.products).toHaveLength(3)
      expect(successState.products).toContainEqual(modifiedProductsMocks[0])
      expect(successState.products).toContainEqual(modifiedProductsMocks[1])
    })
  })

  describe('fetchProductsFail action', () => {
    it('should unset isFetching and set an error', () => {
      const errorMessage = 'Test error'
      const action = actions.fetchProductsFail({ message: 'Test error' })
      errorState = reducer(fetchingState, action)
      expect(errorState.isFetching).toBeFalsy()
      expect(errorState.error).toBe(errorMessage)
    })
  })

  describe('fetchProducts action', () => {
    it('should set isFetching and clear the error when re-trying', () => {
      const action = actions.fetchProducts({
        productIds: ['1', '2'],
      })
      const retryState = reducer(errorState, action)
      expect(retryState.isFetching).toBeTruthy()
      expect(retryState.error).toBe(null)
    })
  })
})
