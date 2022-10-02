import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import EditModal from '../components/EditModal'
import { mutationAddMedicalHistory, mutationUpdateMedicalHistory, queryPatientById } from '../actions/editModal'
import { closeModal } from '../../modal/reducers'

const mapStateToProps = state => ({
  patientId: state.core.activedPatient.patientId,
})
export default compose(
  graphql(mutationAddMedicalHistory, { name: 'mutationAddMedicalHistory' }),
  graphql(mutationUpdateMedicalHistory, { name: 'mutationUpdateMedicalHistory' }),
  connect(mapStateToProps, { closeModal }),
  graphql(queryPatientById, {
    options: props => ({
      variables: {
        patientId: props.patientId,
      },
    }),
  }),
)(EditModal)
