import * as actions from '../actions'
import { templateMock } from './_mocks'

describe('template service actions', () => {
  it('should create an action to fetch a template', () => {
    const expectedAction = {
      type: 'GET_TEMPLATE_REQUEST',
    }
    expect(actions.fetchTemplate()).toEqual(expectedAction)
  })
  it('should create an action to process a fetched template', () => {
    const expectedAction = {
      type: 'GET_TEMPLATE_SUCCESS',
      payload: {
        template: templateMock,
      },
    }
    expect(actions.fetchTemplateSuccess({ template: templateMock })).toEqual(
      expectedAction
    )
  })

  it('should create an action to process an error while fetching a template', () => {
    const message = 'Test error'
    const expectedAction = {
      type: 'GET_TEMPLATE_FAIL',
      payload: {
        message,
      },
    }
    expect(actions.fetchTemplateFail({ message })).toEqual(expectedAction)
  })
})
