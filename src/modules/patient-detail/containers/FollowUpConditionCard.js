import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import FollowUpConditionCard from '../components/FollowUpConditionCard'

import { getPatientFollowUpCondition } from '../actions'

const mapStateToProps = state => ({
  activedPatient: state.core.activedPatient,
})
export default compose(
  connect(mapStateToProps),
  graphql(getPatientFollowUpCondition, {
    name: 'getPatientFollow',
    options: props => ({
      fetchPolicy: 'network-only',
      variables: {
        patientId: props.activedPatient.patientId || props.patientId,
      },
    }),
  }),
)(FollowUpConditionCard)
