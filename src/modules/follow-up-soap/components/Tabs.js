import React, { PropTypes } from 'react'
import moment from 'moment'
import { Menu } from './styled-components'
import { Label } from './Label'
import { ASSESSMENT_SEVERITY, SOAP_CATEGORY } from '../constants'

const pickColors = severity =>
  SOAP_CATEGORY.map((category) => {
    const item = severity[category.value]
    return { color: ASSESSMENT_SEVERITY[item].color, key: category.value }
  })

export const Tabs = ({ soaps, activeSoapId, onLableClick }) => (
  <Menu>
    {soaps &&
      soaps.map((data, index) => {
        const { createdBy, severity, phoneFollowUpAt, _id, overdue } = data
        const dateStr = moment(phoneFollowUpAt).format('YYYY年MM月DD日')

        let labelText = ''
        if (overdue) {
          labelText = `${dateStr} 【逾期】`
        } else {
          const { fullName } = createdBy
          labelText = `${dateStr} ${fullName}`
        }
        const colors = pickColors(severity)
        return (
          <Label
            key={_id}
            overdue={overdue}
            content={labelText}
            colors={colors}
            isActive={activeSoapId ? _id === activeSoapId : index === 0}
            onClick={() => overdue || onLableClick(_id)}
          />
        )
      })}
  </Menu>
)

Tabs.propTypes = {
  soaps: PropTypes.array,
  activeSoapId: PropTypes.string,
  onLableClick: PropTypes.func.isRequired,
}
