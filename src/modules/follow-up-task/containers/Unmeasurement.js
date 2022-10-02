import { compose, graphql } from 'react-apollo'
import Unmeasurement from '../components/Unmeasurement'
import { queryUnmeasurement } from '../actions'

export default compose(
  graphql(queryUnmeasurement),
)(Unmeasurement)
