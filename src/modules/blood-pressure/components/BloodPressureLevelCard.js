import React from 'react'
import { Card, Col, Row } from 'antd'
import moment from 'moment'
import styled from 'styled-components'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import { riskLevelMap, hypertensionLevelMap } from '../../common/constants'

const formatDate = (rangeDate) => {
  const day = moment(rangeDate).date()
  const mouth = moment(rangeDate).month()
  return `${mouth + 1}月${day}日`
}

const judgeStandard = standard => standard >= 70 ? '达标' : '未达标'

const showTime = (status) => {
  switch (status.type) {
    case 'V0': {
      return `${status.existFrist ? '建档时间:' : '初诊时间:'}${moment(status.changeTime).format('YYYY年MM月DD日')}`
    }
    case 'V1': {
      return `入组时间:${moment(status.changeTime).format('YYYY年MM月DD日')}`
    }
    case 'B1': {
      return `出统计圈:${moment(status.changeTime).format('YYYY年MM月DD日')}`
    }
    case 'C1': {
      return `归档时间:${moment(status.changeTime).format('YYYY年MM月DD日')}`
    }
    default:
      return '无状态'
  }
}
const showContent = (type) => {
  switch (type) {
    case 'V0': {
      return '预入组'
    }
    case 'V1': {
      return '已入组'
    }
    case 'B1': {
      return '已出圈'
    }
    case 'C1': {
      return '已归档'
    }
    default:
      return '无状态'
  }
}
const cards = [
  {
    title: '高血压等级',
    getValue: boundDetails => boundDetails.hypertensionLevel ?
      hypertensionLevelMap[boundDetails.hypertensionLevel] : '无',
    key: 'hypertensionLevel',
  },
  {
    title: '危险程度',
    key: 'riskLevel',
    getValue: boundDetails => boundDetails.riskLevel ?
      riskLevelMap[boundDetails.riskLevel] : '无',
  },
  {
    title: '达标状态',
    key: 'bpStandardPerFollowUp',
    getValue: boundDetails => boundDetails.bpStandardPerFollowUp ?
      judgeStandard(boundDetails.bpStandardPerFollowUp) : '无',
  },
  {
    title: '入组状态',
    key: 'type',
    getValue: boundDetails => boundDetails.groupStatus ? showContent(boundDetails.groupStatus[boundDetails.groupStatus.length - 1].type) : '无状态',
  },
]

const BloodPressureLevelCard = (props) => {
  const bPLevelProfileDateRange = get(props, 'getPatientInfo.patient.BPLevelProfileDateRange') || {}
  const boundDetails = get(props, 'getPatientInfo.patient.boundDetails') || {}
  const times = boundDetails.groupStatus ? showTime(boundDetails.groupStatus[boundDetails.groupStatus.length - 1]) : ''
  let timeRange = ''
  if (!isEmpty(bPLevelProfileDateRange)) {
    const startDate = formatDate(bPLevelProfileDateRange.startAt)
    const endDate = formatDate(bPLevelProfileDateRange.endAt)
    timeRange = `${startDate} ~ ${endDate}`
  }
  return (
    <Row gutter={10}>
      {
        cards.map(card => (<Col span={6} key={card.key}>
          <Card title={card.title} bordered>
            <CardContent>{card.getValue(boundDetails)}</CardContent>
            <CardTime> {card.key === 'type' ? times : timeRange}</CardTime>
          </Card>
        </Col>))
      }
    </Row>
  )
}

const CardContent = styled.div`
  font-size: 24px;
  color: #26344b;
  font-family: PingFangSC-Regular;
`
const CardTime = styled.div`
  font-size: 12px;
  color: #707070;
  font-family: PingFangSC-Regular;
`

export default BloodPressureLevelCard
