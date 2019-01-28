import { createAction } from 'typesafe-actions'
import { Config } from './types'

/**
 * Redux action to set the shopId.
 * @param {Object} config
 * @param {string} config.shopId - The shopId for this client.
 */
export const setShopId = createAction('SET_SHOP_ID', resolve => {
  return ({ shopId }: { shopId: string }) => resolve({ shopId })
})

/**
 * Redux action to set the baseUrl for config requests.
 * @param {Object} config
 * @param {string} config.baseUrl - The baseUrl of the config service.
 */
export const setBaseUrl = createAction('SET_CONFIG_BASE', resolve => {
  return ({ baseUrl }: { baseUrl: string }) => resolve({ baseUrl })
})

/**
 * Redux action to fetch the config from remote.
 */
export const fetchConfig = createAction('GET_CONFIG_REQUEST', resolve => {
  return () => resolve()
})

/**
 * Redux action to process the fetched config.
 * @param {Object} result
 * @param {string} result.config - The fetched config object.
 */
export const fetchConfigSuccess = createAction(
  'GET_CONFIG_SUCCESS',
  resolve => {
    return ({ config }: { config: Config }) => resolve({ config })
  }
)

/**
 * Redux action to process an error while fetching the config.
 * @param {Object} error
 * @param {string} error.message - The error message.
 */
export const fetchConfigFail = createAction('GET_CONFIG_FAIL', resolve => {
  return ({ message }: { message: string }) => resolve({ message })
})
