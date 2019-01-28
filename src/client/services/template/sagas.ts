import { getType } from 'typesafe-actions'
import { select, put, takeLatest, call } from 'redux-saga/effects'
import { Template } from './types'
import * as actions from './actions'
import { fetchConfigSaga } from '../config/sagas'
import { getShopId, getUrlTemplateBase } from '../config/selectors'

export function* fetchTemplateSaga() {
  try {
    // Ensure that the config is already loaded...
    yield call(fetchConfigSaga)
    // ... get the shopId & base URL...
    const shopId = yield select(getShopId)
    if (!shopId) throw new Error('shopId missing')
    const baseUrl = yield select(getUrlTemplateBase)
    if (!baseUrl) throw new Error('baseUrl missing')
    // ..and start fetching the template
    const response: Response = yield call(fetch, `${baseUrl}/${shopId}`)
    const json: Template = yield call([response, response.json])
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    yield put(actions.fetchTemplateSuccess({ template: json }))
  } catch (e) {
    yield put(
      actions.fetchTemplateFail({
        message: e.message || 'Unknown error',
      })
    )
  }
}

export default [takeLatest(getType(actions.fetchTemplate), fetchTemplateSaga)]
