import reducer from '../reducer'
import { configMock } from './_mocks'
import * as actions from '../actions'

const initialState = reducer(undefined, {} as any)

describe('config service reducer', () => {
  describe('initial state', () => {
    it('should match the snapshot', () => {
      expect(initialState).toMatchSnapshot()
    })
  })

  describe('setBaseUrl action', () => {
    it('should set the baseUrl', () => {
      const baseUrl = 'http://www.example.com'
      const action = actions.setBaseUrl({ baseUrl })
      const newState = reducer(initialState, action)
      expect(newState.baseUrl).toEqual(baseUrl)
    })
  })

  describe('setShopId action', () => {
    it('should set the shopId', () => {
      const shopId = '1a2b3c'
      const action = actions.setShopId({ shopId })
      const newState = reducer(initialState, action)
      expect(newState.shopId).toEqual(shopId)
    })
  })

  let fetchingState, successState, errorState
  describe('fetchConfig action', () => {
    it('should set isFetching', () => {
      const action = actions.fetchConfig()
      fetchingState = reducer(initialState, action)
      expect(fetchingState.isFetching).toBeTruthy()
    })
  })

  describe('fetchConfigSuccess action', () => {
    it('should unset isFetching and set config', () => {
      const action = actions.fetchConfigSuccess({ config: configMock })
      successState = reducer(fetchingState, action)
      expect(successState.isFetching).toBeFalsy()
      expect(successState.config).toEqual(configMock)
    })
  })

  describe('fetchConfigFail action', () => {
    it('should unset isFetching and set error', () => {
      const errorMessage = 'Test error'
      const action = actions.fetchConfigFail({ message: 'Test error' })
      errorState = reducer(fetchingState, action)
      expect(errorState.isFetching).toBeFalsy()
      expect(errorState.error).toBe(errorMessage)
    })
  })

  describe('fetchConfig action', () => {
    it('should set isFetching and clear the error when re-trying', () => {
      const action = actions.fetchConfig()
      const retryState = reducer(errorState, action)
      expect(retryState.isFetching).toBeTruthy()
      expect(retryState.error).toBe(null)
    })
  })
})
