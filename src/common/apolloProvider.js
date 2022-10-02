
import { ApolloClient, createNetworkInterface } from 'react-apollo'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:3081/graphql',
})

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}  // Create the header object if needed.
    }
    req.options.headers['client-codename'] = 'TEST'
    req.options.headers['Access-Control-Allow-Origin'] = '*'
    req.options.headers.authorization = localStorage.getItem('token') || null
    next()
  },
}])

const client = new ApolloClient({
  networkInterface,
})

export default client
