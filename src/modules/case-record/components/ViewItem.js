import React, { PropTypes } from 'react'
import find from 'lodash/find'
import isString from 'lodash/isString'
import { RowItem, RowItemLabel, StyledOptionsItem } from './styled-components'
import * as medicalInfos from '../constants'

const getValue = (type, option) => find(medicalInfos[type].options, o => o.key === option)

const ViewItem = ({ type, optionsValue }) => {
  const optionsInValue = isString(optionsValue) ? [optionsValue] : optionsValue
  return (<RowItem marginBottom={5}>
    <RowItemLabel>{medicalInfos[type].label}</RowItemLabel>
    <div>
      {
      (optionsInValue && optionsInValue.length) ? optionsInValue.map((option, index) => {
        const text = isString(optionsValue) ? optionsValue : `${index + 1}、${getValue(type, option).label}`
        return <StyledOptionsItem key={option.key}>{text}</StyledOptionsItem>
      }) : <StyledOptionsItem>无</StyledOptionsItem>
    }
    </div>
  </RowItem>)
}
ViewItem.propTypes = {
  type: PropTypes.string.isRequired,
  optionsValue: PropTypes.any.isRequired,
}
export default ViewItem
