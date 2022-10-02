import React from 'react'
import get from 'lodash/get'
import { StyledTable } from './styled-components'
import { formatColumns } from './CustomRender'
import { overdueFollowedCols } from '../constants'

const getColumns = props => formatColumns(props, overdueFollowedCols)

const OverdueFollowed = (props) => {
  const TotalfollowUps = get(props, 'data.me.followUps', [])
  const followUps = TotalfollowUps.filter(item =>
    !get(item, 'patient.boundDetails.archivedManagement'),
  )
  return (<div>
    <StyledTable
      bordered
      dataSource={followUps}
      columns={getColumns(props)}
    />
  </div>)
}

export default OverdueFollowed
