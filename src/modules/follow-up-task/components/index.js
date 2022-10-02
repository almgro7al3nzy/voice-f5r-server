import React from 'react'
import { Tabs } from 'antd'
import { StyledCard } from './styled-components'
import ToBeFollowUp from '../containers/ToBeFollowUp'
import OverdueFollowed from '../containers/OverdueFollowed'
import Unmeasurement from '../containers/Unmeasurement'

const TabPane = Tabs.TabPane

const FollowUpTask = props =>
  (<StyledCard title="随访任务" bordered={false}>
    <Tabs defaultActiveKey="toBeFollowed" size="small">
      <TabPane tab="7日内随访" key="toBeFollowed">
        <ToBeFollowUp {...props} />
      </TabPane>
      <TabPane tab="测量不足" key="unmeasurement">
        <Unmeasurement {...props} />
      </TabPane>
      <TabPane tab="逾期未随访" key="overdueFollowed">
        <OverdueFollowed {...props} />
      </TabPane>
    </Tabs>
  </StyledCard>)

export default FollowUpTask
