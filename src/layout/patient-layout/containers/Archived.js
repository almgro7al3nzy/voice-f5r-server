import { graphql, compose } from 'react-apollo'
import Archived from '../components/Archived'
import { queryPatientById, mutationUpdateTheFileManger } from '../actions'

export default compose(
  graphql(mutationUpdateTheFileManger, { name: 'mutationUpdateTheFileManger' }),
  graphql(queryPatientById, {
    options: props => ({
      variables: {
        patientId: props.patientId,
      },
    }),
  }),
)(Archived)

