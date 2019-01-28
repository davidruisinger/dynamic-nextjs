import configureStore from 'redux-mock-store'
import { Dispatch } from 'redux'
import { State } from 'ServicesTypes'
import rootReducer from '../../services/reducer'

export default (initialState: State = rootReducer(undefined, {} as any)) => {
  const mockStore = configureStore([])
  const defaultStore = mockStore(initialState)
  const enhancedStore = {
    ...defaultStore,
    async awaitDispatch({}, actionsDispatcher: (_: Dispatch) => void) {
      actionsDispatcher(this.dispatch)
    },
  }

  return enhancedStore
}
