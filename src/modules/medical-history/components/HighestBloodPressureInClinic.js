import React, { PropTypes } from 'react'
import { Form, Col } from 'antd'
import get from 'lodash/get'
import { highestBloodPressureInClinic } from '../constants'
import { RowItem, OrderNumberLabel, StyledInput, StyledRow } from './styled-components'
import { handlecheckChange } from '../actions/editModal'

import { isNumber, isBetween } from '../../common/utils'

const validator = (rule, value, callback) => {
  if (value && isNumber(value) && isBetween(value, 0, 300)) {
    callback()
  } else {
    callback('请输入有效的血压数值')
  }
}

const FormItem = Form.Item

const formItems = [
  {
    colSpan: 5,
    property: 'highestBloodPressureInClinic.systolic',
    rules: [
      validator,
    ],
  },
  {
    colSpan: 1,
    label: '/',
    property: 'slash',
    isLabel: true,
  },
  {
    colSpan: 5,
    property: 'highestBloodPressureInClinic.diastolic',
    rules: [
      {
        required: true,
        message: '请输入有效的血压数值',
        validator,
      },
    ],
  },
  {
    colSpan: 3,
    label: 'mmHg',
    property: 'unit',
    isLabel: true,
  },
]

const HighestBloodPressureInClinic = (props) => {
  const { form: { getFieldDecorator }, medicalHistory = {} } = props
  return (<RowItem isInline>
    <OrderNumberLabel>{highestBloodPressureInClinic.label}</OrderNumberLabel>
    <StyledRow gutter={5} width={270}>
      {
        formItems.map(formItem => (<Col key={formItem.property} span={formItem.colSpan}>
          {
            formItem.isLabel ? <span>{formItem.label}</span>
              : <FormItem>
                {
                    getFieldDecorator(formItem.property, {
                      rules: formItem.rules,
                      initialValue: get(medicalHistory, formItem.property, ''),
                    })(
                      <StyledInput
                        onChange={e => handlecheckChange(e.target.value, formItem.property, props)}
                      />,
                    )
                  }
              </FormItem>
          }
        </Col>))
      }
    </StyledRow>

  </RowItem>)
}

HighestBloodPressureInClinic.propTypes = {
  form: PropTypes.object,
  medicalHistory: PropTypes.object,
}

export default HighestBloodPressureInClinic
