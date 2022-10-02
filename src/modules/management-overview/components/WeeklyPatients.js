import React, { PropTypes } from 'react'
import { graphql } from 'react-apollo'
import moment from 'moment'
// import findIndex from 'lodash/findIndex'
import get from 'lodash/get'
import ReactEcharts from 'echarts-for-react'
import styled from 'styled-components'
import { Button } from 'antd'

import { queryPatientsAndOverproof } from '../actions'
import { UnmeasurePatientNums, UnmeasurePatientDate } from './UnmeasurePatientsItem.js'

const WeeklyPatients = (props) => {
  const patientsList = get(props, 'queryPatientsAndOverproof.me.healthCareTeams[0].patients', [])
  const unArchivePatient = patientsList.filter(item =>
    !get(item, 'boundDetails.archivedManagement'),
  )
  const overproof = get(props, 'queryPatientsAndOverproof.me.healthCareTeams[0].unmeasurePatientsList.SevenDaysOverproof', [])
  const activePatientsList = get(props, 'queryPatientsAndOverproof.me.healthCareTeams[0].unmeasurePatientsList.SevenDaysMeasure', [])
  const percentage = activePatientsList.length ?
    `${Math.round((overproof.length / activePatientsList.length) * 100)}%` : ''
  const { alertUnmeasurePatientsList } = props
  const sevenClickList = unArchivePatient.filter(item =>
    activePatientsList.indexOf(item._id) !== -1,
  )
  const overproofList = unArchivePatient.filter(item =>
    overproof.indexOf(item._id) !== -1,
  )
  function getOption() {
    return {
      title: {
        text: '7日超标率',
        top: 'bottom',
        left: 'center',
        padding: [10, 10, 23, 10],
        textStyle: {
          fontSize: 12,
          color: '#666666',
          lineHeight: 17,
          fontFamily: 'PingFangSC-Regular',
        },
      },
      series: [
        {
          name: '7日超标率',
          type: 'pie',
          radius: ['30%', '80%'],
          center: ['50%', '30%'],
          color: ['#ff5200', '#1b9a82'],
          label: {
            normal: {
              show: true,
              position: 'inner',
              fontSize: 12,
              color: '#ffffff',
            },
          },
          data: [
            {
              value: overproof.length,
              name: percentage,
            },
            {
              value: activePatientsList.length === 0 ? 1
                : activePatientsList.length - overproof.length,
            },
          ],
          hoverAnimation: false,
          legendHoverLink: false,
        },
      ],
    }
  }
  return (
    <CardContent>
      <LeftGeneralPart>
        <div>
          <div>
            <UnmeasurePatientNums>{patientsList.length}</UnmeasurePatientNums>
            <UnmeasurePatientDate>人</UnmeasurePatientDate></div>
          <UnmeasurePatientDate style={{ minWidth: '72px' }}>收治患者总数</UnmeasurePatientDate>
        </div>
        <div>
          <div><UnmeasurePatientNums>{sevenClickList.length}</UnmeasurePatientNums>
            <UnmeasurePatientDate>人</UnmeasurePatientDate></div>
          <UnmeasurePatientDate>7日内有测量</UnmeasurePatientDate>
        </div>
        <div style={{ marginTop: '15px' }}><Button onClick={() => alertUnmeasurePatientsList(props, sevenClickList, 1)}>查看</Button></div>
      </LeftGeneralPart>
      <div style={{ alignSelf: 'flex-end', paddingBottom: '18px' }}>
        <div>
          <UnmeasurePatientNums>{overproofList.length}</UnmeasurePatientNums>
          <UnmeasurePatientDate>人</UnmeasurePatientDate></div>
        <UnmeasurePatientDate style={{ minWidth: '80px' }}>7日内血压超标</UnmeasurePatientDate>
        <div style={{ marginTop: '15px' }}><Button onClick={() => alertUnmeasurePatientsList(props, overproofList, 2)}>查看</Button></div>
      </div>
      <ReactEcharts
        style={{ marginLeft: '-20px', minHeight: '200px', minWidth: '120px' }}
        option={getOption()}
      />
    </CardContent>
  )
}

const CardContent = styled.div`
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #cfcfcf;
  display: flex;
  justify-content: space-between;
`

const LeftGeneralPart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 18px;
`
WeeklyPatients.propTypes = {
  alertUnmeasurePatientsList: PropTypes.func.isRequired,
}
export default graphql(queryPatientsAndOverproof, {
  options: () => ({
    variables: {
      after: moment().subtract(6, 'days'),
    },
  }),
})(WeeklyPatients)
