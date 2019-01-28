import * as actions from '../actions'
import { configMock } from './_mocks'

describe('config service actions', () => {
  it('should create an action to set the baseUrl', () => {
    const baseUrl = 'https://example.com'
    const expectedAction = {
      type: 'SET_CONFIG_BASE',
      payload: {
        baseUrl,
      },
    }
    expect(actions.setBaseUrl({ baseUrl })).toEqual(expectedAction)
  })

  it('should create an action to set the shopId', () => {
    const shopId = '1a2b3c'
    const expectedAction = {
      type: 'SET_SHOP_ID',
      payload: {
        shopId,
      },
    }
    expect(actions.setShopId({ shopId })).toEqual(expectedAction)
  })

  it('should create an action to fetch the config', () => {
    const expectedAction = {
      type: 'GET_CONFIG_REQUEST',
    }
    expect(actions.fetchConfig()).toEqual(expectedAction)
  })

  it('should create an action to process a fetched config', () => {
    const expectedAction = {
      type: 'GET_CONFIG_SUCCESS',
      payload: {
        config: configMock,
      },
    }
    expect(actions.fetchConfigSuccess({ config: configMock })).toEqual(
      expectedAction
    )
  })

  it('should create an action to process an error while fetching the config', () => {
    const message = 'Test error'
    const expectedAction = {
      type: 'GET_CONFIG_FAIL',
      payload: {
        message,
      },
    }
    expect(actions.fetchConfigFail({ message })).toEqual(expectedAction)
  })
})
