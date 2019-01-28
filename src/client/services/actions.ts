// We do not really need this except for generating the global Action

import * as configActions from './config/actions'
import * as templateActions from './template/actions'
import * as productActions from './product/actions'

export default {
  config: configActions,
  template: templateActions,
  product: productActions,
}
