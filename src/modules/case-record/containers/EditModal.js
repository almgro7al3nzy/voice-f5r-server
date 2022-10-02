import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import EditModal from '../components/EditModal'
import { mutationAddCaseRecord, mutationUpdateCaseRecord, getBPPatientInfo, updateBPSafeRange } from '../actions/editModal'
import { queryPhysicalExaminations } from '../../physical-examination/actions'
import { closeModal } from '../../modal/reducers'

const mapStateToProps = (state, ownProps) => ({
  patientId: state.core.activedPatient.patientId,
  content: ownProps.caseRecord,
})
export default compose(
  connect(mapStateToProps, { closeModal }),
  graphql(mutationAddCaseRecord, { name: 'mutationAddCaseRecord' }),
  graphql(mutationUpdateCaseRecord, { name: 'mutationUpdateCaseRecord' }),
  graphql(updateBPSafeRange, { name: 'mutationUpdateBPSafeRange' }),
  graphql(getBPPatientInfo, {
    name: 'queryGetBPPatientInfo',
    variables: props => ({
      patientId: props.patientId,
    }),
  }),
  graphql(queryPhysicalExaminations, {
    name: 'queryPhysicalExaminations',
    options: props => ({
      variables: {
        patientId: props.patientId,
      },
    }),
  }),
)(EditModal)
