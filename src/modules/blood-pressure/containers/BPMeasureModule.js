import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import {
  queryBPMeasureModule,
  mutateUpdateBPMeasureModule,
  mutateAddBPMeasureModule,
  queryPatientById,
} from '../actions'
import BPMeasureModule from '../components/BPMeasureModule'

const mapStateToProps = state => ({
  patientId: state.core.activedPatient.patientId,
})

export default compose(
  connect(mapStateToProps, null),
  graphql(queryBPMeasureModule, {
    options: props => ({
      fetchPolicy: 'network-only',
      variables: {
        patientId: props.patientId,
      },
    }),
  }),
  graphql(queryPatientById, {
    name: 'queryCheckOfachive',
    options: props => ({
      variables: {
        patientId: props.patientId,
      },
    }),
  }),
  graphql(mutateUpdateBPMeasureModule, { name: 'updateBPMeasureModule' }),
  graphql(mutateAddBPMeasureModule, { name: 'addBPMeasureModule' }),
)(BPMeasureModule)
