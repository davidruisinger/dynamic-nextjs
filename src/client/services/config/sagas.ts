import { getType } from 'typesafe-actions'
import { put, takeLatest, call, select } from 'redux-saga/effects'
import { Config } from './types'
import * as actions from './actions'
import { getBaseUrl, getConfig } from './selectors'

export function* fetchConfigSaga() {
  try {
    // Return if we already have a config
    const existingConfig = yield select(getConfig)
    if (existingConfig) return
    // Otherwise go ahead and fetch it
    const baseUrl = yield select(getBaseUrl)
    if (!baseUrl) throw new Error('Missing base URL')
    const response: Response = yield call(fetch, baseUrl)
    const json: Config = yield call([response, response.json])
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    yield put(actions.fetchConfigSuccess({ config: json }))
  } catch (e) {
    yield put(
      actions.fetchConfigFail({
        message: e.message || 'Unknown error',
      })
    )
  }
}

export default [takeLatest(getType(actions.fetchConfig), fetchConfigSaga)]
