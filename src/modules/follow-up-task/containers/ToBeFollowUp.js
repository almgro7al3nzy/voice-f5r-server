import { compose, graphql } from 'react-apollo'
import ToBeFollowUp from '../components/ToBeFollowUp'
import { queryFollowUps } from '../actions'

export default compose(
  graphql(queryFollowUps),
)(ToBeFollowUp)
