import { createSelector } from 'reselect'
import { SERVICE_NAME } from './constants'
import { State } from 'ServicesTypes'

const getProductState = (state: State) => state[SERVICE_NAME]

export const getIsProductsFetching = createSelector(
  [getProductState],
  productState => productState.isFetching
)

export const getProductsError = createSelector(
  [getProductState],
  productState => productState.error
)

export const getProducts = (
  state: State,
  { productIds = [] }: { productIds: string[] }
) =>
  getProductState(state).products.filter(product =>
    productIds.includes(product.id)
  )
