import { graphql, compose } from 'react-apollo'
import Calendar from '../components/Calendar'
import { getOrderedAptDays } from '../actions'

export default compose(
  graphql(getOrderedAptDays, {
    name: 'orderedAptDays',
    options: {
      fetchPolicy: 'network-only',
    },
  }),
)(Calendar)
