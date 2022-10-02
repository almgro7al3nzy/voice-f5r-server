import { graphql, compose } from 'react-apollo'
import moment from 'moment'
import Appointment from '../components/AppointmentCard'
import { getAppointments, mutationUpdateAppointment } from '../actions'

export default compose(
  graphql(mutationUpdateAppointment),
  graphql(getAppointments, {
    options: props => ({
      variables: {
        selectedDay: props.selectedDay || moment().format('YYYY-MM-DD'),
      },
    }),
  },
),
)(Appointment)
