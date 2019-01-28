import { ActionType, getType } from 'typesafe-actions'
import * as actions from './actions'
import { Config } from './types'

export type ConfigState = Readonly<{
  shopId: string
  baseUrl: string
  config: Config
  isFetching: boolean
  error: string
}>

const initialState: ConfigState = {
  shopId: null,
  baseUrl: null,
  config: null,
  isFetching: false,
  error: null,
}

export default (
  state: ConfigState = initialState,
  action: ActionType<typeof actions>
): ConfigState => {
  switch (action.type) {
    case getType(actions.setShopId):
      return {
        ...state,
        shopId: action.payload.shopId,
      }

    case getType(actions.setBaseUrl):
      return {
        ...state,
        baseUrl: action.payload.baseUrl,
      }

    case getType(actions.fetchConfig):
      return {
        ...state,
        isFetching: true,
        error: null,
      }

    case getType(actions.fetchConfigSuccess):
      return {
        ...state,
        config: action.payload.config,
        isFetching: false,
      }

    case getType(actions.fetchConfigFail):
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
      }

    default:
      return state
  }
}
