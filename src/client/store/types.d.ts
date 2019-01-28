declare module 'StoreTypes' {
  import { Store as ReduxStore, Dispatch } from 'redux'
  import { Task } from 'redux-saga'
  import { State } from 'ServicesTypes'

  // Extends the default ReduxStore type with our saga methods defined in store/index.ts
  export type Store = ReduxStore<State> & {
    sagaTask: Task
    runSaga(): void
    awaitDispatch(
      isServer: boolean,
      executer: (_: Dispatch) => void
    ): Promise<void>
  }
}
