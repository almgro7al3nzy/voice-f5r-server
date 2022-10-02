import { connect } from 'react-redux'
import Modal from '../components'

const mapStateToProps = state => ({
  modal: state.modal,
})

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch({ type: 'MODAL_HIDE' }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal)
