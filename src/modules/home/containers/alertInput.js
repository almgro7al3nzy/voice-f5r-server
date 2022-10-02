import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import OverproofHandleAlert from '../components/OverproofButtonGroup'
import { queryOverproof, updateOverproofPatient } from '../actions/query.js'
import { closeModal } from '../../modal/reducers'

export default compose(
  graphql(queryOverproof, { name: 'queryOverproof' }),
  graphql(updateOverproofPatient, { name: 'updateOverproofPatient' }),
  connect(null, { closeModal }),
)(OverproofHandleAlert)
