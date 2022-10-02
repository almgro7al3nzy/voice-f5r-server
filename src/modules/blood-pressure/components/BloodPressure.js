import React, { PropTypes } from 'react'
import RightMeasurementHistoryTable from './RightMeasurementHistoryTable.js'
import LeftMeasurementHistoryTable from './LeftMeasurementHistoryTable.js'
import './blood-pressure-table.css'

const BloodPressure = (props) => {
  const { activedPatient } = props
  const patient = activedPatient.patientId
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '65%', marginRight: '10px', flexShrink: 0 }}>
          <div>
            <LeftMeasurementHistoryTable patientId={patient} {...props} />
          </div>
        </div>
        <div style={{ width: '35%', paddingRight: '10px', flexShrink: 0 }}>
          <RightMeasurementHistoryTable patientId={patient} {...props} />
        </div>
      </div>
    </div>
  )
}
BloodPressure.propTypes = {
  activedPatient: PropTypes.object.isRequired,
}

export default BloodPressure
