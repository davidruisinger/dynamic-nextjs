import { all } from 'redux-saga/effects'

import configSagas from './config/sagas'
import templateSagas from './template/sagas'
import productSagas from './product/sagas'

export default function* rootSaga() {
  yield all([...configSagas, ...templateSagas, ...productSagas])
}
