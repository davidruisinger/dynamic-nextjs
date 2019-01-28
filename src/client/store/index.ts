import { createStore, applyMiddleware, Dispatch } from 'redux'
import createSagaMiddleware, { END, SagaMiddleware } from 'redux-saga'
import { State } from 'ServicesTypes'
import { Store } from 'StoreTypes'

import rootReducer from '../services/reducer'
import rootSaga from '../services/sagas'

const sagaMiddleware = createSagaMiddleware()

const bindMiddleware = (middleware: SagaMiddleware<any>[]) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}
function configureStore(initialState: State): Store {
  /**
   * Creates an enhanced store object that allows us to dispatch actions
   * and await the corresponding sagas to finish.
   * This can be used to e.g. fetch some data before rendering a page
   *
   * Heavily inspired by https://medium.com/@victor36max/using-redux-saga-with-next-js-2b5d5add1ec6
   *
   * NOTE: This approach is currently not working with redux-saga@1.0.0
   */
  const store = {
    ...createStore(rootReducer, initialState, bindMiddleware([sagaMiddleware])),
    sagaTask: null,
    runSaga() {
      // Avoid running twice
      if (this.sagaTask) {
        return
      }
      // Run and asign the running sagaTask to our store object
      this.sagaTask = sagaMiddleware.run(rootSaga)
    },
    async awaitDispatch(
      isServer: boolean,
      actionsDispatcher: (_: Dispatch) => void
    ) {
      // Run the saga(if it is not already running)
      this.runSaga()
      // Dispatch the requested actions
      actionsDispatcher(this.dispatch)
      // If no saga is running we are done
      if (!this.sagaTask) {
        return
      }
      /**
       * This is where the magic happens:
       * Dispatching the END action will terminate all sagas will be terminated.
       * If the saga has still some forked tasks which are still running,
       * it will wait for all the child tasks to terminate before terminating the Task.
       *
       * We can use await to wait until those child tasks have been terminated
       */
      this.dispatch(END)
      await this.sagaTask.done

      // Remove the sagaTask from the store object
      this.sagaTask = null

      // If awaitDispatch was called on the client we want the saga to continue running
      if (!isServer) {
        this.runSaga()
      }
    },
  }
  // Initial run
  store.runSaga()
  return store
}

export default configureStore
