import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import UpdateHealthCareProfessional from '../components/UpdateHealthCareProfessional'
import {
  queryHealthCareTeams,
  mutationAddHealthCareProfessional,
  mutationUpdateHealthCareProfessional,
} from '../actions/updateHealthCareProfessional'
import { closeModal } from '../../modal/reducers'

export default compose(
  graphql(queryHealthCareTeams),
  graphql(mutationAddHealthCareProfessional, { name: 'mutationAddHealthCareProfessional' }),
  graphql(mutationUpdateHealthCareProfessional, { name: 'mutationUpdateHealthCareProfessional' }),
  connect(null, { closeModal }),
)(UpdateHealthCareProfessional)
