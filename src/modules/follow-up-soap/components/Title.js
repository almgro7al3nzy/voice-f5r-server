import React, { PropTypes } from 'react'
import moment from 'moment'
import { TitleLabel, TitleText } from './styled-components'

export const Title = ({ endAt, period }) => (
  <div>
    <TitleLabel>随访周期</TitleLabel>
    <TitleText>{period || '-'}周</TitleText>
    <TitleLabel>下次随访日期</TitleLabel>
    <TitleText>
      {endAt ? moment(endAt, 'YYYY-MM-DD').add(1, 'd').format('YYYY年MM月DD日') : '----年--月--日'}
    </TitleText>
  </div>
)

Title.propTypes = {
  period: PropTypes.number,
  endAt: PropTypes.string,
}
