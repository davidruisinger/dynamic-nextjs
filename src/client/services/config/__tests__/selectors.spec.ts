import { SERVICE_NAME } from '../constants'
import * as selectors from '../selectors'
import rootReducer from '../../reducer'
import { configStateMock } from './_mocks'

const initialState = rootReducer(undefined, {} as any)
const stateMock = {
  ...initialState,
  [SERVICE_NAME]: configStateMock,
}

describe('config selectors', () => {
  describe('getIsConfigFetching', () => {
    it('should return a boolean representing the fetching state', () => {
      const selected = selectors.getIsConfigFetching(stateMock)
      expect(selected).toEqual(configStateMock.isFetching)
    })
  })

  describe('getConfigError', () => {
    it('should return the error', () => {
      const selected = selectors.getConfigError(stateMock)
      expect(selected).toBe(configStateMock.error)
    })
  })

  describe('getShopId', () => {
    it('should return the shopId', () => {
      const selected = selectors.getShopId(stateMock)
      expect(selected).toBe(configStateMock.shopId)
    })
  })

  describe('getBaseUrl', () => {
    it('should return the baseUrl', () => {
      const selected = selectors.getBaseUrl(stateMock)
      expect(selected).toBe(configStateMock.baseUrl)
    })
  })

  describe('getConfig', () => {
    it('should return the config', () => {
      const selected = selectors.getConfig(stateMock)
      expect(selected).toBe(configStateMock.config)
    })
  })

  describe('getUrlProductBase', () => {
    it('should return the url string', () => {
      const selected = selectors.getUrlProductBase(stateMock)
      expect(selected).toBe(configStateMock.config.url_product_base)
    })
  })

  describe('getUrlTemplateBase', () => {
    it('should return the url string', () => {
      const selected = selectors.getUrlTemplateBase(stateMock)
      expect(selected).toBe(configStateMock.config.url_template_base_web)
    })
  })
})
