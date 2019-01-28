import { ActionType, getType } from 'typesafe-actions'
import * as actions from './actions'
import { Product } from './types'

export type ProductState = Readonly<{
  products: Product[]
  isFetching: boolean
  error: string
}>

const initialState: ProductState = {
  products: [],
  isFetching: false,
  error: null,
}

export default (
  state: ProductState = initialState,
  action: ActionType<typeof actions>
): ProductState => {
  switch (action.type) {
    case getType(actions.fetchProducts):
      return {
        ...state,
        isFetching: true,
        error: null,
      }

    case getType(actions.fetchProductsSuccess):
      return {
        ...state,
        products: [...state.products, ...action.payload.products],
        isFetching: false,
      }

    case getType(actions.fetchProductsFail):
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
      }

    default:
      return state
  }
}
