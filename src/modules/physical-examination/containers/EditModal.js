import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import EditModal from '../components/EditModal'
import { mutationAddPhysicalExamination, mutationUpdatePhysicalExamination } from '../actions/editModal'
import { closeModal } from '../../modal/reducers'
import queryPatientById from '../../patient/actions/profile'

const mapStateToProps = state => ({
  patientId: state.core.activedPatient.patientId,
})
export default compose(
  graphql(mutationAddPhysicalExamination, { name: 'mutationAddPhysicalExamination' }),
  graphql(mutationUpdatePhysicalExamination, { name: 'mutationUpdatePhysicalExamination' }),
  connect(mapStateToProps, { closeModal }),
  graphql(queryPatientById, {
    options: props => ({
      variables: {
        patientId: props.patientId,
      },
    }),
  }),
)(EditModal)
