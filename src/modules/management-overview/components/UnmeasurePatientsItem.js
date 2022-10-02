import React, { PropTypes } from 'react'
import { Button } from 'antd'
import get from 'lodash/get'
import styled from 'styled-components'
import { unMeasureMapping } from '../constants'

const UnmeasurePatientsItem = (props) => {
  const ThreeToSevenDaysUnmeasure = get(props, 'queryPatientsAndOverproof.me.healthCareTeams[0].unmeasurePatientsList.ThreeToSevenDaysUnmeasure', []).filter(item =>
    !get(item, 'boundDetails.archivedManagement'),
  )
  const SevenToFourteenDaysUnmeasure = get(props, 'queryPatientsAndOverproof.me.healthCareTeams[0].unmeasurePatientsList.SevenToFourteenDaysUnmeasure', []).filter(item =>
    !get(item, 'boundDetails.archivedManagement'),
  )
  const ExceedFourteenDaysUnmeasure = get(props, 'queryPatientsAndOverproof.me.healthCareTeams[0].unmeasurePatientsList.ExceedFourteenDaysUnmeasure', []).filter(item =>
    !get(item, 'boundDetails.archivedManagement'),
  )
  const { timeChoose, alertUnmeasurePatientsList } = props
  let UnmeasurdPatients = []
  if (timeChoose === '3-7') {
    UnmeasurdPatients = ThreeToSevenDaysUnmeasure
  } else if (timeChoose === '7-14') {
    UnmeasurdPatients = SevenToFourteenDaysUnmeasure
  } else if (timeChoose === 14) {
    UnmeasurdPatients = ExceedFourteenDaysUnmeasure
  }
  return (
    <div>
      <div>
        <UnmeasurePatientNums>{UnmeasurdPatients.length}</UnmeasurePatientNums>
        <UnmeasurePatientDate>人</UnmeasurePatientDate>
      </div>
      <UnmeasurePatientDate>{unMeasureMapping[timeChoose]}</UnmeasurePatientDate>
      <div style={{ marginTop: '15px' }}><Button onClick={() => alertUnmeasurePatientsList(props, UnmeasurdPatients)}>查看</Button></div>
    </div>
  )
}
export const UnmeasurePatientNums = styled.span`
  font-size: 32px;
  color: #25354b;
  display: inline-block;
  margin-right: 6px;
  font-family: HelveticaNeue;
`
export const UnmeasurePatientDate = styled.span`
  font-size: 12px;
  color: #666666;
  display: inline-block;
  font-family: PingFangSC-Regular;
`
UnmeasurePatientsItem.propTypes = {
  timeChoose: PropTypes.number.isRequired,
  alertUnmeasurePatientsList: PropTypes.func.isRequired,
}
export default UnmeasurePatientsItem
