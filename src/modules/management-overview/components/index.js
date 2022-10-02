import React from 'react'
import { Card } from 'antd'
import styled from 'styled-components'
import WeeklyPatients from './WeeklyPatients.js'
import UnmeasurePatients from './UnmeasurePatients.js'

const ManagementOverview = props => (
  <div style={{ width: '100%' }}>
    <StyledCard title="管理概况" bordered>
      <WeeklyPatients {...props} />
      <UnmeasurePatients {...props} />
    </StyledCard>
  </div>
)

const StyledCard = styled(Card) `
  height: calc(100vh - 105px);
  overflow-y:scroll;
`
export default ManagementOverview
