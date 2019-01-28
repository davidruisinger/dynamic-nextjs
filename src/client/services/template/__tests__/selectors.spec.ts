import { SERVICE_NAME } from '../constants'
import * as selectors from '../selectors'
import rootReducer from '../../reducer'
import { templateStateMock } from './_mocks'

const initialState = rootReducer(undefined, {} as any)

const stateMock = {
  ...initialState,
  [SERVICE_NAME]: templateStateMock,
}

describe('template selectors', () => {
  describe('getIsTemplateFetching', () => {
    it('should return a boolean representing the fetching state', () => {
      const selected = selectors.getIsTemplateFetching(stateMock)
      expect(selected).toEqual(templateStateMock.isFetching)
    })
  })

  describe('getTemplateError', () => {
    it('should return the error', () => {
      const selected = selectors.getTemplateError(stateMock)
      expect(selected).toEqual(templateStateMock.error)
    })
  })

  describe('getTemplate', () => {
    it('should return the template', () => {
      const selected = selectors.getTemplate(stateMock)
      expect(selected).toEqual(templateStateMock.template)
    })
  })

  describe('getAppName', () => {
    it('should return the name of the app', () => {
      const selected = selectors.getAppName(stateMock)
      expect(selected).toEqual(templateStateMock.template.meta.app_name)
    })
  })

  describe('getAppLogo', () => {
    it('should return the logo', () => {
      const selected = selectors.getAppLogo(stateMock)
      expect(selected).toEqual(templateStateMock.template.meta.app_logo)
    })
  })

  describe('getPages', () => {
    it('should return all pages', () => {
      const selected = selectors.getPages(stateMock)
      expect(selected).toEqual(templateStateMock.template.pages)
    })
  })

  describe('getPage', () => {
    it('should return the specific page', () => {
      const selected = selectors.getPage(stateMock, {
        path: templateStateMock.template.pages[0].href,
      })
      expect(selected).toEqual(templateStateMock.template.pages[0])
    })
  })

  describe('getPage', () => {
    it('should return undefined if a specific page does NOT exist', () => {
      const selected = selectors.getPage(stateMock, { path: '/notexistent' })
      expect(selected).toBe(undefined)
    })
  })

  describe('getPageContent', () => {
    it('should return the content of the page', () => {
      const selected = selectors.getPageContent(stateMock, {
        path: templateStateMock.template.pages[0].href,
      })
      expect(selected).toEqual(templateStateMock.template.pages[0].content)
    })
  })

  describe('getTemplateVariables', () => {
    it('should return the variables', () => {
      const selected = selectors.getTemplateVariables(stateMock)
      expect(selected).toEqual(templateStateMock.template.variables)
    })
  })
})
