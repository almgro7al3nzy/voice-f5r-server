import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import PhysicalExamination from '../components/PhysicalExamination'
// import { withLoading } from '../../../common/withLoading'
import { popupAddPhysicalExamination, queryPhysicalExaminations } from '../actions'
import queryPatientById from '../../patient/actions/profile'

const mapStateToProps = state => ({
  patientId: state.core.activedPatient.patientId,
})

export default compose(
  connect(mapStateToProps, { popupAddPhysicalExamination }),
  graphql(queryPatientById, {
    name: 'queryPatientById',
    options: props => ({
      variables: {
        patientId: props.patientId,
      },
    }),
  }),
  graphql(queryPhysicalExaminations, {
    name: 'queryPhysicalExaminations',
    options: props => ({
      variables: {
        patientId: props.patientId,
      },
    }),
  }),

)(PhysicalExamination)
