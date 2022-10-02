import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import thunk from 'redux-thunk'
import reduxReset from 'redux-reset'
import makeRootReducer from './reducers'

const createStore = (initialState = {}) => {
  const isDev = process.env.NODE_ENV === 'development'
  const middlewares = [thunk]

  const enhancers = []
  let composeEnhancers = compose

  if (isDev && typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  }

  const store = createReduxStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares), ...enhancers, reduxReset()),
  )
  store.asyncReducers = {}

  if (isDev && module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default // eslint-disable-line global-require
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
export default createStore
