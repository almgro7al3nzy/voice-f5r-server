import React from 'react'
import { Col, Row } from 'antd'
import BloodPressureLevelCard from './containers/BloodPressureLevelCard'
import PhysicalExamination from '../physical-examination/containers/PhysicalExamination'
import RightPane from './containers/RightPane'

const PatientDetails = props => (
  <div style={{ padding: '10px' }}>
    <Row gutter={10}>
      <Col span={17}>
        <BloodPressureLevelCard {...props} />
        <PhysicalExamination {...props} />
      </Col>
      <Col span={7}>
        <RightPane {...props} />
      </Col>
    </Row>
  </div>)
export default PatientDetails
