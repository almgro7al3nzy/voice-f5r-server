import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'

import nutritionTabPage from '../components/nutritionTabPage'
import {
  mutationAddNutritionList,
  queryPatientNutritionList,
  mutationUpdateNutritionList,
  mutationRemoveNutritionList,
  queryPatientById,
} from '../actions'
import { withLoading } from '../../../common/withLoading'

const mapStateToProps = state => ({
  patientId: state.core.activedPatient.patientId,
  userId: state.core.userInfo._id,
})
export default compose(
  connect(mapStateToProps),
  graphql(mutationAddNutritionList, { name: 'mutationAddNutritionList' }),
  graphql(mutationUpdateNutritionList, { name: 'mutationUpdateNutritionList' }),
  graphql(mutationRemoveNutritionList, { name: 'mutationRemoveNutritionList' }),
  graphql(queryPatientNutritionList, {
    options: props => ({
      fetchPolicy: 'network-only',
      variables: {
        patientId: props.patientId,
      },
    }),
  }),
  graphql(queryPatientById, {
    name: 'queryNutriTionOfachive',
    options: props => ({
      variables: {
        patientId: props.patientId,
      },
    }),
  }),
)(withLoading(nutritionTabPage))
