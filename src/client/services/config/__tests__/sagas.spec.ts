import fetchMock from 'fetch-mock'
import { runSaga } from 'redux-saga'
import { configMock, configStateMock } from './_mocks'
import { SERVICE_NAME } from '../constants'
import * as actions from '../actions'
import * as sagas from '../sagas'
import rootReducer from '../../reducer'

const stateMock = {
  ...rootReducer(undefined, {} as any),
  [SERVICE_NAME]: configStateMock,
}

afterEach(fetchMock.reset)
describe('config service sagas', () => {
  it('should pass the config to the store on success', async () => {
    fetchMock.mock(configStateMock.baseUrl, {
      status: 200,
      body: configMock,
    })

    let dispatched = []
    await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => ({
          ...stateMock,
          [SERVICE_NAME]: {
            ...configStateMock,
            config: null, //If there would be an existing config the saga would not fetch it again
          },
        }),
      },
      sagas.fetchConfigSaga,
      actions.fetchConfig()
    ).done

    expect(dispatched).toContainEqual(
      actions.fetchConfigSuccess({ config: configMock })
    )
  })

  it('should not fetch a new config if there is already one in the store', async () => {
    let dispatched = []
    await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => stateMock,
      },
      sagas.fetchConfigSaga,
      actions.fetchConfig()
    ).done

    expect(dispatched).toHaveLength(0)
  })

  it('should pass an error to the store when failing to fetch the config', async () => {
    fetchMock.mock(configStateMock.baseUrl, {
      status: 503,
      body: {},
    })

    let dispatched = []
    await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => ({
          ...stateMock,
          [SERVICE_NAME]: {
            ...configStateMock,
            config: null, //If there would be an existing config the saga would not fetch it again
          },
        }),
      },
      sagas.fetchConfigSaga,
      actions.fetchConfig()
    ).done

    expect(dispatched).toContainEqual(
      actions.fetchConfigFail({ message: 'Service Unavailable' })
    )
  })
})
