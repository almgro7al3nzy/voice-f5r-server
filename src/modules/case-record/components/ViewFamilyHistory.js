import React, { PropTypes } from 'react'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import { RowItem, RowItemLabel, StyledOptionsItem } from './styled-components'
import { familyHistory as familyHistoryConstant } from '../constants'

const getValue = option => find(familyHistoryConstant.options, o => o.key === option)

const ViewFamilyHistory = ({ familyHistory = {} }) => {
  const { familyGroup } = familyHistoryConstant
  let isNoData = true
  return (<RowItem>
    <RowItemLabel>{familyHistoryConstant.label}</RowItemLabel>
    <div>
      {
        familyGroup.map((familyItem, familyIndex) => {
          const labelArrays = []
          const { key, label } = familyItem
          if (familyHistory && !isEmpty(familyHistory[key])) {
            labelArrays.push(<StyledOptionsItem>{label}</StyledOptionsItem>)
            const { historyCategory = [], comments = '' } = familyHistory[key]
            historyCategory.forEach((o, index) => {
              let text = `${index + 1}、${getValue(o).label}`
              if (o === 'OTHERS') {
                text += ` ${comments}`
              }
              labelArrays.push(<StyledOptionsItem>{text}</StyledOptionsItem>)
            })
            isNoData = false
          } else if ((familyIndex === familyGroup.length - 1) && isNoData) {
            labelArrays.push(<StyledOptionsItem>无</StyledOptionsItem>)
          }
          return labelArrays
        })
      }
    </div>
  </RowItem>)
}
ViewFamilyHistory.propTypes = {
  familyHistory: PropTypes.object,
}
export default ViewFamilyHistory
