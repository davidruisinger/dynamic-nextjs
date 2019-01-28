import { ActionType, getType } from 'typesafe-actions'
import * as actions from './actions'
import { Template } from './types'

export type TemplateState = Readonly<{
  template: Template
  isFetching: boolean
  error: string
}>

const initialState: TemplateState = {
  template: null,
  isFetching: false,
  error: null,
}

export default (
  state: TemplateState = initialState,
  action: ActionType<typeof actions>
): TemplateState => {
  switch (action.type) {
    case getType(actions.fetchTemplate):
      return {
        ...state,
        isFetching: true,
        error: null,
      }

    case getType(actions.fetchTemplateSuccess):
      return {
        ...state,
        template: action.payload.template,
        isFetching: false,
      }

    case getType(actions.fetchTemplateFail):
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
      }

    default:
      return state
  }
}
