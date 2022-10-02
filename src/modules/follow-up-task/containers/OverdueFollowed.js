
import { compose, graphql } from 'react-apollo'
import OverdueFollowed from '../components/OverdueFollowed'
import { queryFollowUps } from '../actions'

export default compose(
  graphql(queryFollowUps, {
    options: {
      variables: {
        overdueFlag: true,
      },
    },
  }),
)(OverdueFollowed)
