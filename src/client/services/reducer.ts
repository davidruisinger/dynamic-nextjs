import { combineReducers } from 'redux'

// Import each service reducer and it's name
import { SERVICE_NAME as configServiceName } from './config/constants'
import ConfigReducer from './config/reducer'
import { SERVICE_NAME as templateServiceName } from './template/constants'
import TemplateReducer from './template/reducer'
import { SERVICE_NAME as productServiceName } from './product/constants'
import ProductReducer from './product/reducer'

const rootReducer = combineReducers({
  [configServiceName]: ConfigReducer,
  [templateServiceName]: TemplateReducer,
  [productServiceName]: ProductReducer,
})

export default rootReducer
