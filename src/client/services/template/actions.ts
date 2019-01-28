import { createAction } from 'typesafe-actions'
import { Template } from './types'

/**
 * Redux action to fetch a template from remote.
 * @param {Object} config
 * @param {string} config.shopId - The shopId for which the template should be fetched.
 */
export const fetchTemplate = createAction('GET_TEMPLATE_REQUEST', resolve => {
  return () => resolve()
})

/**
 * Redux action to process a fetched template.
 * @param {Object} result
 * @param {string} result.template - The fetched template object.
 */
export const fetchTemplateSuccess = createAction(
  'GET_TEMPLATE_SUCCESS',
  resolve => {
    return ({ template }: { template: Template }) => resolve({ template })
  }
)

/**
 * Redux action to process an error while fetching a template.
 * @param {Object} error
 * @param {string} error.message - The error message.
 */
export const fetchTemplateFail = createAction('GET_TEMPLATE_FAIL', resolve => {
  return ({ message }: { message: string }) => resolve({ message })
})
