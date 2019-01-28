import { productListElementMock } from './_mocks'
import ProductListParser from '../ProductListParser'
import createMockStore from '../../../../store/utils/createMockStore'
import rootReducer from '../../../../services/reducer'
import { fetchProducts } from '../../../../services/product/actions'
import { SERVICE_NAME as PRODUCT_SERVICE_NAME } from '../../../../services/product/constants'
import {
  productStateMock,
  productsMock,
} from '../../../../services/product/__tests__/_mocks'

const mockState = {
  ...rootReducer(undefined, {} as any),
  [PRODUCT_SERVICE_NAME]: productStateMock,
}
const mockStore = createMockStore(mockState)

afterEach(mockStore.clearActions)
describe('ProductListParser fetchContent', () => {
  it('should create an action to fetch the products', async () => {
    const productIds = productStateMock.products.map(product => product.id)
    const fetchedElement = await ProductListParser.fetchContent({
      element: { ...productListElementMock, content: productIds },
      // @ts-ignore
      store: mockStore,
      isServer: true,
    })
    const expectedAction = fetchProducts({
      productIds,
    })
    expect(mockStore.getActions()).toEqual([expectedAction])
    expect(fetchedElement).toEqual({
      ...productListElementMock,
      content: productsMock,
    })
  })
})

describe('ProductListParser render', () => {
  it('should return a ProductListParser React component with props', () => {
    const element = ProductListParser.render({
      key: 'elementKey',
      element: { ...productListElementMock, content: productsMock },
    })
    expect(element.key).toEqual('elementKey')
    expect(element.props.products).toEqual(productsMock)
  })
})
