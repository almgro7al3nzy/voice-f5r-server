import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { popupUpdateHealthCareProfessional } from '../actions'
import Operations from '../components/Operations'

export default compose(
  connect(null, { popupUpdateHealthCareProfessional }),
)(Operations)
