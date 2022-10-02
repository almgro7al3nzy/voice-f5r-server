import { connect } from 'react-redux'
import { setActivePatient } from '../../../modules/left-nav/actions/patientList'
import { PatientLayout as PatientLayoutComponent } from '../components'

const PatientLayout = connect(null, {
  setActivePatient,
})(PatientLayoutComponent)

export default PatientLayout
