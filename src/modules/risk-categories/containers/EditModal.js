import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import EditModal from '../components/EditModal'
import { mutationAddRiskCategory, queryLatestRiskCategory } from '../actions'
import { closeModal } from '../../modal/reducers'

const mapStateToProps = state => ({
  patientId: state.core.activedPatient.patientId,
})
export default compose(
  connect(mapStateToProps, { closeModal }),
  graphql(queryLatestRiskCategory, {
    name: 'queryLatestRiskCategory',
    variables: props => ({
      patientId: props.patientId,
    }),
  }),
  graphql(mutationAddRiskCategory, { name: 'mutationAddRiskCategory' }),
)(EditModal)
