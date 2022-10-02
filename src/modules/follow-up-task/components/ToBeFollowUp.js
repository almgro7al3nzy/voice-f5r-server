import React, { PropTypes } from 'react'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import { StyledTable, StyledSpan, StyledTitle } from './styled-components'
import { formatColumns } from './CustomRender'
import { toBeFollowedCols } from '../constants'

const getColumns = props => formatColumns(props, toBeFollowedCols)

const Header = ({ followed, toBeFollowed }) => (<div>
  <StyledSpan>{followed}</StyledSpan>
  <StyledSpan>/</StyledSpan>
  <StyledSpan followed>{toBeFollowed}</StyledSpan>
  <StyledTitle>已随访/待随访</StyledTitle>
</div>)

const ToBeFollowUp = (props) => {
  const followUps = get(props, 'data.me.followUps', []).filter(item =>
    !get(item, 'patient.boundDetails.archivedManagement'),
  )
  const sortFollow = sortBy(followUps, o => o.surplusDays)
  const followed = get(sortFollow.filter(o => o.status === 'FOLLOWED'), 'length')
  const toBeFollowed = followUps.length - followed
  return (<div>
    <Header
      followed={followed}
      toBeFollowed={toBeFollowed}
    />
    <StyledTable
      bordered
      dataSource={sortFollow}
      columns={getColumns(props)}
    />
  </div>)
}

Header.propTypes = {
  followed: PropTypes.number,
  toBeFollowed: PropTypes.number,
}

export default ToBeFollowUp
