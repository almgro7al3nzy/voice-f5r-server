import React from 'react'
import { Router } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient,
  IntrospectionFragmentMatcher,
} from 'react-apollo'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import PropTypes from 'prop-types'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { ThemeProvider } from 'styled-components'
import theme from '../themes/theme'
import '../themes/antd-v2-compatible-reset.less'


const getUri = (isWebsocket) => {
  const env = process.env.NODE_ENV_TAG
  console.log('process.env', process.env)
  const maps = {
    production: isWebsocket
      ? 'wss://dodgy-dove.ihealthlabs.com.cn/feedback'
      : 'https://dodgy-dove.ihealthlabs.com.cn/graphql',
    stg: isWebsocket
      ? 'wss://dodgy-dove.301-stg.ihealthcn.com/feedback'
      : 'https://dodgy-dove.301-stg.ihealthcn.com/graphql',
    test: isWebsocket
      ? 'ws://120.92.208.210:3081/feedback'
      : 'http://120.92.208.210:3081/graphql',
  }
  return (
    maps[env] || (isWebsocket ? 'ws://localhost:3081/feedback' : 'http://localhost:3081/graphql')
  )
}

const httpNetworkInterface = createNetworkInterface({
  uri: getUri(),
})

httpNetworkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {} // Create the header object if needed.
      }
      req.options.headers['client-codename'] = 'TEST'
      req.options.headers['Access-Control-Allow-Origin'] = '*'
      req.options.headers.authorization = localStorage.getItem('token')
        ? localStorage.getItem('token')
        : ''
      next()
    },
  },
])
const wsUri = getUri(true)
const subscriptionClient = new SubscriptionClient(wsUri, {
  reconnect: true,
  connectionParams: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  },
})

const networkInterface = addGraphQLSubscriptions(httpNetworkInterface, subscriptionClient)

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: 'INTERFACE',
          name: 'ChatMessage',
          possibleTypes: [
            { name: 'AudioMessage' },
            { name: 'TextMessage' },
            { name: 'ImageMessage' },
          ],
        },
      ],
    },
  },
})

const client = new ApolloClient({
  networkInterface,
  fragmentMatcher,
})
const history = createBrowserHistory()

export default class Main extends React.Component {
  static propTypes = {
    store: PropTypes.any.isRequired,
    routes: PropTypes.any.isRequired,
  }
  shouldComponentUpdate() {
    return false
  }
  render() {
    return (
      <Provider store={this.props.store}>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <LocaleProvider locale={zhCN}>
              <div className="swift-snail" style={{ height: '100%' }}>
                <Router history={history} children={this.props.routes} />
              </div>
            </LocaleProvider>
          </ThemeProvider>
        </ApolloProvider>
      </Provider>
    )
  }
}
