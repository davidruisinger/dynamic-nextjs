import { Config } from '../types'
import { ConfigState } from '../reducer'

export const configMock: Config = {
  url_product_base: 'http://localhost:3001/products',
  url_template_base_web: 'http://localhost:3001/template',
  url_template_base_ios: 'http://localhost:3001/template',
  url_template_base_android: 'http://localhost:3001/template',
}

export const configStateMock: ConfigState = {
  shopId: '1a2b3c',
  baseUrl: 'https://www.example.com',
  isFetching: false,
  error: null,
  config: configMock,
}
