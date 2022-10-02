import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import { closeModal } from '../../modal/reducers'

import BloodPressure from '../components/BloodPressure'
import { updateSafeRange, queryBPHistory, queryFollowUp, ShowInfoPicture, queryPatientById } from '../actions'
import { overBPOpinion, mutationAddTheBPDescrible } from '../actions/overBPOpinion'

const mapStateToProps = state => ({
  activedPatient: state.core.activedPatient,
})
export default compose(
  connect(mapStateToProps, { ShowInfoPicture, overBPOpinion }),
  graphql(updateSafeRange, { name: 'updateSafeRange' }),
  graphql(mutationAddTheBPDescrible, { name: 'mutationAddTheBPDescrible' }),
  graphql(queryFollowUp, {
    name: 'queryFollowUp',
    options: props => ({
      fetchPolicy: 'network-only',
      variables: {
        patientId: props.activedPatient.patientId || props.patientId,
        isShowForBP: true,
      },
    }),
  }),
  graphql(queryBPHistory, {
    name: 'queryBPHistory',
    options: props => ({
      fetchPolicy: 'network-only',
      variables: {
        id: props.activedPatient.patientId || props.patientId,
        after: 'all',
      },
    }),
  }),
  graphql(queryPatientById, {
    name: 'queryBPOfachive',
    options: props => ({
      variables: {
        patientId: props.activedPatient.patientId || props.patientId,
      },
    }),
  }),
  connect(null, { closeModal }),
)(BloodPressure)
