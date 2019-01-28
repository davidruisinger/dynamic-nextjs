import { getType } from 'typesafe-actions'
import { select, put, takeLatest, call } from 'redux-saga/effects'
import { Product } from './types'
import * as actions from './actions'
import { getProducts } from './selectors'
import { fetchConfigSaga } from '../config/sagas'
import { getShopId, getUrlProductBase } from '../config/selectors'

export function* fetchProductsSaga(
  action: ReturnType<typeof actions.fetchProducts>
) {
  try {
    // Ensure that the config is already loaded...
    yield call(fetchConfigSaga)
    // ... get the shopId & base URL...
    const shopId = yield select(getShopId)
    if (!shopId) throw new Error('shopId missing')
    const baseUrl = yield select(getUrlProductBase)
    if (!baseUrl) throw new Error('baseUrl missing')
    // ..and start fetching the template
    const { productIds } = action.payload
    // Get the existing products from the store and filter those products out
    const existingProducts = yield select(getProducts, { productIds })
    const existingProductIds = existingProducts.map(
      (product: Product) => product.id
    )
    const filteredProductIds = productIds.filter(
      id => !existingProductIds.includes(id)
    )
    const response: Response = yield call(
      fetch,
      `${baseUrl}?shop=${shopId}&id=${filteredProductIds.join('&id=')}`
    )
    const json: Product[] = yield call([response, response.json])
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    yield put(actions.fetchProductsSuccess({ products: json }))
  } catch (e) {
    yield put(
      actions.fetchProductsFail({
        message: e.message || 'Unknown error',
      })
    )
  }
}

export default [takeLatest(getType(actions.fetchProducts), fetchProductsSaga)]
