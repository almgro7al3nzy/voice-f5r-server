import React, { PropTypes } from 'react'
import SafeBloodPressure from './SafeBloodPressure.js'
import BPMeasureModule from '../containers/BPMeasureModule.js'
import RightPulseTrendCard from './RightPulseTrendCard.js'
import RightBloodPressureCard from './RightBloodPressureCard.js'

const RightMeasurementHistoryTable = props => (
  <div>
    <RightBloodPressureCard patientId={props.activedPatient.patientId} {...props} />
    <RightPulseTrendCard patientId={props.activedPatient.patientId} />
    <SafeBloodPressure {...props} />
    <BPMeasureModule />
  </div>
)
RightMeasurementHistoryTable.propTypes = {
  activedPatient: PropTypes.object.isRequired,
}
export default RightMeasurementHistoryTable
