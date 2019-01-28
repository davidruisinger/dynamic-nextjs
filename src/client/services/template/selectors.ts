import { createSelector } from 'reselect'
import { SERVICE_NAME } from './constants'
import { State } from 'ServicesTypes'

const getTemplateState = (state: State) => state[SERVICE_NAME]

export const getIsTemplateFetching = createSelector(
  [getTemplateState],
  templateState => templateState.isFetching
)

export const getTemplateError = createSelector(
  [getTemplateState],
  templateState => templateState.error
)

export const getTemplate = createSelector(
  [getTemplateState],
  templateState => templateState.template
)

export const getAppName = createSelector(
  [getTemplateState],
  templateState => templateState.template.meta.app_name
)

export const getAppLogo = createSelector(
  [getTemplateState],
  templateState => templateState.template.meta.app_logo
)

export const getPages = createSelector(
  [getTemplateState],
  templateState => templateState.template.pages || []
)

export const getPage = (state: State, { path }: { path: string }) =>
  getPages(state).find(page => page.href == path)

export const getPageContent = (state: State, { path }: { path: string }) =>
  (getPage(state, { path }) || { content: null }).content

export const getTemplateVariables = createSelector(
  [getTemplateState],
  templateState => templateState.template.variables
)
