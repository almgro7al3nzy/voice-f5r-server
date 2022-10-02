import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import registerServiceWorker from './common/registerServiceWorker'

const store = createStore()
const isDev = process.env.NODE_ENV === 'development'
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const App = require('./common/main').default // eslint-disable-line global-require
  const routes = require('./routers').default // eslint-disable-line global-require
  ReactDOM.render(<App store={store} routes={routes(store)} />, MOUNT_NODE)
}

if (isDev && module.hot) {
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react').default // eslint-disable-line global-require
    ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
  }
  render = () => {
    try {
      renderApp()
    } catch (e) {
      console.log(e, 'Error happens!')
      renderError(e)
    }
  }
  module.hot.accept([
    './common/main',
    './routers',
  ], () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      }),
    )
}
render()
registerServiceWorker()
