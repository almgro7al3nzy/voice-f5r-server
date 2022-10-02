import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import ViewModal from '../components/ViewModal'
import { getFollowUpAndSoapsForPatient, popupEditSoap } from '../actions'
import { withLoading } from '../../../common/withLoading'
import { queryPatientById, queryLoginRole } from '../actions/queries'

const mapStateToProps = state => ({
  patientId: state.core.activedPatient.patientId,
})

export default compose(
  connect(mapStateToProps, { popupEditSoap }),
  graphql(getFollowUpAndSoapsForPatient, {
    variables: props => ({
      patientId: props.patientId,
    }),
    notifyOnNetworkStatusChange: true,
  }),
  graphql(queryLoginRole, { name: 'queryLoginRole' }),
  graphql(queryPatientById, {
    name: 'querySoapOfachive',
    options: props => ({
      variables: {
        patientId: props.patientId,
      },
    }),
  }),
)(withLoading(ViewModal))
