import React from 'react'
import { Card } from 'antd'
import FollowUpConditionCard from '../containers/FollowUpConditionCard'
import MedicinesCondition from './MedicinesCondition'

const RightPane = props => (
  <div gutter={10}>
    <Card title="随访SOAP情况" bordered>
      <FollowUpConditionCard />
    </Card>
    <MedicinesCondition {...props} />
  </div>)
export default RightPane
