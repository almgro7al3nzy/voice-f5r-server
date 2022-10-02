import { graphql, compose } from 'react-apollo'
import HealthCareTeam from '../components/HealthCareTeam'
import { queryHealthCareTeams } from '../actions/updateHealthCareProfessional'

export default compose(
  graphql(queryHealthCareTeams),
)(HealthCareTeam)
