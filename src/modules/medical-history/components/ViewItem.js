import React, { PropTypes } from 'react'
import find from 'lodash/find'
import isString from 'lodash/isString'
import { RowItem, StyledOptionsItem, OrderNumberLabel } from './styled-components'
import * as medicalInfos from '../constants'

const getValue = (type, option) => find(medicalInfos[type].options, o => o.key === option)

const ViewItem = ({ type, optionsValue, isMedical, isAllergy }) => {
  const optionsInValue = isString(optionsValue) ? [optionsValue] : optionsValue
  return (<RowItem marginBottom={5}>
    <OrderNumberLabel>{medicalInfos[type].label}</OrderNumberLabel>
    <div>
      {
        (optionsInValue && optionsInValue.length) ? optionsInValue.map((option, index) => {
          let text = isString(optionsValue) ? optionsValue : `${index + 1}、${getValue(type, option).label}`
          if (isMedical && type === 'otherMedicalHistory') {
            text = '无其他病史'
          }
          if (isAllergy && type === 'allergyHistory') {
            text = '无其他过敏史'
          }
          return <StyledOptionsItem key={option.key}>{text || '无'}</StyledOptionsItem>
        }) : <StyledOptionsItem>无</StyledOptionsItem>
      }
    </div>
  </RowItem>)
}
ViewItem.propTypes = {
  type: PropTypes.string.isRequired,
  optionsValue: PropTypes.any.isRequired,
  isMedical: PropTypes.bool,
  isAllergy: PropTypes.bool,
}
export default ViewItem
