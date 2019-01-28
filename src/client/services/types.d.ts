declare module 'ServicesTypes' {
  import { StateType, ActionType } from 'typesafe-actions'

  export type State = StateType<typeof import('./reducer').default>
  export type Action = ActionType<typeof import('./action').default>
}
