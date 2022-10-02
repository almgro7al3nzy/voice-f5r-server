import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import ManagementOverview from '../components/index.js'
import { alertUnmeasurePatientsList, queryPatientsAndOverproof } from '../actions/index.js'
import { closeModal } from '../../modal/reducers'

export default compose(
  connect(null, { alertUnmeasurePatientsList, closeModal }),
  graphql(queryPatientsAndOverproof, { name: 'queryPatientsAndOverproof' }),
)(ManagementOverview)
