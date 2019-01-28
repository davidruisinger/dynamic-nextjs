import reducer from '../reducer'
import * as actions from '../actions'
import { templateMock } from './_mocks'

const initialState = reducer(undefined, {} as any)

describe('template service reducer', () => {
  describe('initial state', () => {
    it('should match the snapshot', () => {
      expect(initialState).toMatchSnapshot()
    })
  })

  let fetchingState, successState, errorState
  describe('fetchTemplate action', () => {
    it('should set isFetching', () => {
      const action = actions.fetchTemplate()
      fetchingState = reducer(initialState, action)
      expect(fetchingState.isFetching).toBeTruthy()
    })
  })

  describe('fetchTemplateSuccess action', () => {
    it('should unset isFetching and set the template', () => {
      const action = actions.fetchTemplateSuccess({ template: templateMock })
      successState = reducer(fetchingState, action)
      expect(successState.isFetching).toBeFalsy()
      expect(successState.template).toEqual(templateMock)
    })
  })

  describe('fetchTemplateFail action', () => {
    it('should unset isFetching and set an error', () => {
      const errorMessage = 'Test error'
      const action = actions.fetchTemplateFail({ message: 'Test error' })
      errorState = reducer(fetchingState, action)
      expect(errorState.isFetching).toBeFalsy()
      expect(errorState.error).toBe(errorMessage)
    })
  })

  describe('fetchTemplate action', () => {
    it('should set isFetching and clear the error when re-trying', () => {
      const action = actions.fetchTemplate()
      const retryState = reducer(errorState, action)
      expect(retryState.isFetching).toBeTruthy()
      expect(retryState.error).toBe(null)
    })
  })
})
