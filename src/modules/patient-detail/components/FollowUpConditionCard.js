import React from 'react'
import get from 'lodash/get'
import { Row, Col } from 'antd'
import { LableWithStyle, ValueWithStyle, CountWithStyle, UnDataStyle } from './styled-component/FollowUpConditionCard'

const FollowUpConditionCard = (props) => {
  const followUpCondition = get(props, 'getPatientFollow.patient.followUpCondition')
  let content = ''
  if (followUpCondition) {
    content = (<div>
      <Row>
        <Col span={10}>
          <LableWithStyle>随访周期</LableWithStyle>
          <ValueWithStyle>{followUpCondition.period}周</ValueWithStyle>
        </Col>
        <Col span={14}>
          <LableWithStyle>下次随访</LableWithStyle>
          <ValueWithStyle>
            {followUpCondition.nextFollowUp}
          </ValueWithStyle>
        </Col>
      </Row>

      <Row>
        <Col span={10}>
          <LableWithStyle>已经随访</LableWithStyle>
          <CountWithStyle>
            {followUpCondition.followedCount > 0 ? `${followUpCondition.followedCount}次` : '无'}
          </CountWithStyle>
        </Col>
        <Col span={14}>
          <LableWithStyle>逾期随访</LableWithStyle>
          <CountWithStyle>
            {followUpCondition.overdueFollowedCount ? `${followUpCondition.overdueFollowedCount}次` : '无'}
          </CountWithStyle>
        </Col>
      </Row>
    </div>)
  } else {
    content = <UnDataStyle>自入组后连续7日以上未测量</UnDataStyle>
  }
  return content
}

export default FollowUpConditionCard
