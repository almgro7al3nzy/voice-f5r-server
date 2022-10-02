import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import ProfileCom from '../components/Profile'
import { closeModal } from '../../modal/reducers'
import queryPatientById,
{
  openChatRoom,
  popupEditPatient,
  addFileAlert,
  mutationUpdatePatientAsHCPForStarred,
  mutationAddThePatientRemark,
  mutationAddTheFileManger,
} from '../actions/profile'
import { setActivePatient } from '../../left-nav/actions/patientList'
import { withLoading } from '../../../common/withLoading'

const mapStateToProps = state => ({
  activedPatient: state.core.activedPatient,
})

export default compose(
  connect(mapStateToProps, {
    openChatRoom,
    setActivePatient,
    popupEditPatient,
    addFileAlert,
  }),
  graphql(queryPatientById, {
    options: props => ({
      variables: {
        patientId: props.activedPatient.patientId || props.patientId,
      },
      fetchPolicy: 'network-only',
    }),
  }),
  graphql(mutationUpdatePatientAsHCPForStarred),
  graphql(mutationAddThePatientRemark, { name: 'mutationAddThePatientRemark' }),
  graphql(mutationAddTheFileManger, { name: 'mutationAddTheFileManger' }),
  connect(null, { closeModal }),

)(withLoading(ProfileCom))
