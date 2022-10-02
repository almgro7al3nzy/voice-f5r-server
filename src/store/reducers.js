import { combineReducers } from 'redux'
// Add Reducers in here
import homeReducer from '../modules/home/reducers'
import modalReducer from '../modules/modal/reducers'
import coreReducer from '../layout/main-layout/reducers'
import leftNavReducer from '../modules/left-nav/reducers'
import chatReducer from '../modules/chat/reducers'
// import client from '../common/apolloProvider'

const makeRootReducer = asyncReducers => combineReducers({
  ...asyncReducers,
  ...coreReducer,
  ...homeReducer,
  ...modalReducer,
  ...leftNavReducer,
  ...chatReducer,
  // apollo: client.reducer(),
})

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) {
    console.warn(`You can't add ${key} in the reducer, please change the key and try`)
    return
  }
  const tempState = store
  tempState.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(tempState.asyncReducers))
}

export default makeRootReducer
