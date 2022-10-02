import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'

import inspectTabPage from '../components/inspectTabPage'
import {
  mutationAddInspectReport,
  queryInspectReportById,
  popupSelectDatePicker,
  mutationRemoveInspectReport,
  openImage,
} from '../actions'
import { withLoading } from '../../../common/withLoading'
import { closeModal } from '../../modal/reducers'

const mapStateToProps = state => ({
  patientId: state.core.activedPatient.patientId,
  userId: state.core.userInfo._id,
})
export default compose(
  connect(
    mapStateToProps,
    { popupSelectDatePicker, closeModal, openImage },
  ),
  graphql(mutationAddInspectReport, { name: 'mutationAddInspectReport' }),
  graphql(mutationRemoveInspectReport, { name: 'mutationRemoveInspectReport' }),
  graphql(queryInspectReportById, {
    options: props => ({
      fetchPolicy: 'network-only',
      variables: {
        patientId: props.patientId,
        queryType: 'DATE',
      },
    }),
  }),
)(withLoading(inspectTabPage))
