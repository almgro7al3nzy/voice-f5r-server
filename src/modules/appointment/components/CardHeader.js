import React, { PropTypes } from 'react'
import styled from 'styled-components'
import moment from 'moment'

const mapTitle = {
  count: '总门诊数',
  FIRST: '初诊',
  QUARTER: '复诊',
  YEAR: '年诊',
  ADDITION: '加诊',
}

const CardHeader = ({
  selectedDay,
  appointmentDetail = {},
}) => (<StyledContent>
  <StyledDay>{selectedDay || moment().format('YYYY-MM-DD')}</StyledDay>
  <Count>
    {
      Object.keys(mapTitle).map(o => (<StyledCount key={o}>
        <StyledSpan>{appointmentDetail[o] || 0}</StyledSpan>
        <span>人{mapTitle[o]} </span>
      </StyledCount>))
    }
  </Count>
</StyledContent>)

const StyledContent = styled.div`
  display: flex;
  margin: 0 0 15px;
`

const StyledDay = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
`

const StyledCount = styled.div`
  margin-left: 25px;
`

const StyledSpan = styled.span`
  color: #26344b;
  font-size: 24px;
  margin-right: 5px;
`
const Count = styled.div`
  display: flex;
`
CardHeader.propTypes = {
  selectedDay: PropTypes.string,
  appointmentDetail: PropTypes.object,
}

export default CardHeader
