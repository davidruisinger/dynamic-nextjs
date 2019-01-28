import fetchMock from 'fetch-mock'
import { runSaga } from 'redux-saga'
import * as actions from '../actions'
import * as sagas from '../sagas'
import rootReducer from '../../reducer'
import { productsMock } from './_mocks'
import { SERVICE_NAME as CONFIG_SERVICE_NAME } from '../../config/constants'
import { getUrlProductBase } from '../../config/selectors'
import { configStateMock } from '../../config/__tests__/_mocks'
import { fetchProductsSuccess } from '../actions'

const stateMock = {
  ...rootReducer(undefined, {} as any),
  [CONFIG_SERVICE_NAME]: configStateMock,
}

afterEach(fetchMock.restore)
describe('product service sagas', () => {
  const productIdsMock = ['1', '2', '3']
  const urlMock = `${getUrlProductBase(stateMock)}?shop=${
    configStateMock.shopId
  }&id=${productIdsMock.join('&id=')}`

  it('should pass the products to the store on success', async () => {
    fetchMock.mock(urlMock, {
      status: 200,
      body: productsMock,
    })

    let dispatched = []
    await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => stateMock,
      },
      sagas.fetchProductsSaga,
      actions.fetchProducts({ productIds: productIdsMock })
    ).done

    expect(dispatched).toContainEqual(
      actions.fetchProductsSuccess({ products: productsMock })
    )
  })

  it('should not fetch a product that is already in store', async () => {
    /**
     * We test this using the URL that gets mocked.
     * If another URL than the one specified as mock get's called, the saga fails and so does this test
     */
    const modifiedProductIdsMock = ['1', '4']
    // We remove the first item from the products (we'll add this to the existing products further down)
    const filteredUrlMock = `${getUrlProductBase(stateMock)}?shop=${
      configStateMock.shopId
    }&id=${modifiedProductIdsMock.slice(1).join('&id=')}`
    fetchMock.mock(filteredUrlMock, {
      status: 200,
      body: productsMock,
    })

    let dispatched = []
    /**
     * As mentioned above we add a product with the first id from the mocked productIds
     * (The one that should not appear in the URL)
     */
    const stateMockWithExistingProduct = rootReducer(
      stateMock,
      fetchProductsSuccess({
        products: [
          {
            ...productsMock[0],
            id: modifiedProductIdsMock[0],
          },
        ],
      })
    )
    await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => stateMockWithExistingProduct,
      },
      sagas.fetchProductsSaga,
      actions.fetchProducts({
        productIds: modifiedProductIdsMock,
      })
    ).done

    expect(dispatched).toContainEqual(
      actions.fetchProductsSuccess({ products: productsMock })
    )
  })

  it('should pass an error to the store when failing to fetch products', async () => {
    fetchMock.mock(urlMock, {
      status: 503,
      body: {},
    })

    let dispatched = []
    await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => stateMock,
      },
      sagas.fetchProductsSaga,
      actions.fetchProducts({ productIds: productIdsMock })
    ).done

    expect(dispatched).toContainEqual(
      actions.fetchProductsFail({ message: 'Service Unavailable' })
    )
  })
})
