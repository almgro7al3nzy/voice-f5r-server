import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import ViewModal from '../components/ViewModal'
import { queryCaseRecords, getBPPatientInfo, queryPatientById } from '../actions/editModal'
import { popupEditCaseRecord } from '../actions'
import { withLoading } from '../../../common/withLoading'

const mapStateToProps = state => ({
  patientId: state.core.activedPatient.patientId,
})

export default compose(
  connect(mapStateToProps, { popupEditCaseRecord }),
  graphql(getBPPatientInfo, {
    name: 'queryGetBPPatientInfo',
    variables: props => ({
      patientId: props.patientId,
    }),
  }),
  graphql(queryCaseRecords, {
    variables: props => ({
      patientId: props.patientId,
    }),
  }),
  graphql(queryPatientById, {
    name: 'queryCaseOfachive',
    options: props => ({
      variables: {
        patientId: props.patientId,
      },
    }),
  }),
)(withLoading(ViewModal))
