import React, { PropTypes } from 'react'
import { Col } from 'antd'
import get from 'lodash/get'

import * as RadioTypes from '../constants'
import Cascader from './Cascader'
import Address from './Address'
import RadioGroup from './RadioGroup'

const showRadios = [
  { type: 'healthInsuranceType' },
  { type: 'averageMonthlyFamilyIncome' },
  { type: 'highestEducationLevel' },
  { type: 'employmentStatus' },
  { type: 'measurementDeviceStatus' },
]

const RightCol = ({ form, patientInfo = {} }) => {
  const boundDetails = get(patientInfo, 'boundDetails', {})
  const permanentPlaceOfRecidence = get(patientInfo,
    'boundDetails.permanentPlaceOfRecidence', {})
  const { getFieldDecorator } = form
  return (<Col span={12}>
    <Cascader {...form} permanentPlaceOfRecidence={permanentPlaceOfRecidence} />
    <Address {...form} permanentPlaceOfRecidence={permanentPlaceOfRecidence} />
    {
      showRadios.map(radio => (<RadioGroup
        key={radio.type}
        info={RadioTypes[radio.type]}
        getFieldDecorator={getFieldDecorator}
        initialValue={boundDetails[radio.type] || ''}
      />))
    }
  </Col>)
}


RightCol.propTypes = {
  form: PropTypes.object.isRequired,
  patientInfo: PropTypes.object,
}

export default RightCol
