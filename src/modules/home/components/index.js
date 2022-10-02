import React, { PropTypes } from 'react'
import { Col, Row } from 'antd'
import BloodPressureOverproof from './BloodPressureOverproof.js'
import ManagementOverview from '../../management-overview/containers'
import FollowUpTask from '../../follow-up-task/components'

const HomeView = props => (
  <div style={{ padding: '10px' }}>
    <Row gutter={10}>
      <Col span={6}>
        <ManagementOverview history={props.history} />
      </Col>
      <Col span={11}>
        <BloodPressureOverproof
          {...props}
        />
      </Col>
      <Col span={7}>
        <FollowUpTask history={props.history} />
      </Col>
    </Row>
  </div>
  )

HomeView.propTypes = {
  history: PropTypes.object,
}

export default HomeView
