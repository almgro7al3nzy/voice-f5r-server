import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import AddPatient from '../components'
import { mutationAddPatient, mutationUpdatePatient } from '../actions'
import { closeModal } from '../../modal/reducers'
import { togglePatientSider } from '../../left-nav/actions'

export default compose(
  graphql(mutationAddPatient, { name: 'mutationAddPatient' }),
  graphql(mutationUpdatePatient, { name: 'mutationUpdatePatient' }),
  connect(null, { closeModal, togglePatientSider }),
)(AddPatient)
