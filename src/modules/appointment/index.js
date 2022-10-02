import React, { PropTypes } from 'react'
import get from 'lodash/get'
import ICalendar from './containers/Calendar'
import { AppointmentContainer } from './components/styled-components'
import AppointmentCard from './containers/Appointment'

const Appointment = ({ history, location }) => {
  const selectedDay = get(location, 'pathname', []).split('/')[2]
  return (<AppointmentContainer>
    <ICalendar
      history={history}
      selectedDay={selectedDay}
    />
    <AppointmentCard
      selectedDay={selectedDay}
    />
  </AppointmentContainer>)
}

Appointment.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
}

export default Appointment
