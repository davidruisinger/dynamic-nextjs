import fetchMock from 'fetch-mock'
import { runSaga } from 'redux-saga'
import * as actions from '../actions'
import * as sagas from '../sagas'
import rootReducer from '../../reducer'
import { templateMock } from './_mocks'
import { SERVICE_NAME as CONFIG_SERVICE_NAME } from '../../config/constants'
import { getUrlTemplateBase } from '../../config/selectors'
import { configStateMock } from '../../config/__tests__/_mocks'

const stateMock = {
  ...rootReducer(undefined, {} as any),
  [CONFIG_SERVICE_NAME]: configStateMock,
}

afterEach(fetchMock.restore)
describe('template service sagas', () => {
  const urlMock = `${getUrlTemplateBase(stateMock)}/${configStateMock.shopId}`

  it('should pass the template to the store on success', async () => {
    fetchMock.mock(urlMock, {
      status: 200,
      body: templateMock,
    })

    let dispatched = []
    await runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => stateMock,
      },
      sagas.fetchTemplateSaga,
      actions.fetchTemplate()
    ).done

    expect(dispatched).toContainEqual(
      actions.fetchTemplateSuccess({ template: templateMock })
    )
  })

  it('should pass an error to the store when failing to fetch a template', async () => {
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
      sagas.fetchTemplateSaga,
      actions.fetchTemplate()
    ).done

    expect(dispatched).toContainEqual(
      actions.fetchTemplateFail({ message: 'Service Unavailable' })
    )
  })
})
