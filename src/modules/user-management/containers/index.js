import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { closeModal } from '../../modal/reducers'
import { popupUpdateHealthCareProfessional,
  queryAllHealthCareProfessional } from '../actions'
import UserManagement from '../components'
import { withLoading } from '../../../common/withLoading'

export default compose(
  graphql(queryAllHealthCareProfessional),
  connect(null, { closeModal, popupUpdateHealthCareProfessional }),
)(withLoading(UserManagement))
