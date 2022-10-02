import React, { PropTypes } from 'react'
import { Form, Col } from 'antd'
import get from 'lodash/get'
import { RowItem, StyledInput, StyledRow, RowItemLabel } from './styled-components'
import { isNumber, isBetween } from '../../common/utils'


const validatorBp = (rule, value, callback) => {
  if (value && isNumber(value) && isBetween(value, 30, 300)) {
    callback()
  } else {
    callback('请输入有效的血压数值')
  }
}

const validatorPulse = (rule, value, callback) => {
  if (value && isNumber(value) && isBetween(value, 30, 250)) {
    callback()
  } else {
    callback('请输入有效的脉搏数值')
  }
}

const FormItem = Form.Item

const formItems = [
  {
    colSpan: 5,
    property: 'systolic',
    rules: [
      validatorBp,
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
    property: 'diastolic',
    rules: [
      validatorBp,
    ],
  },
  {
    colSpan: 3,
    label: 'mmHg',
    property: 'unit',
    isLabel: true,
  },
  {
    colSpan: 5,
    label: ' ',
    property: 'pulse',
    rules: [
      validatorPulse,
    ],
  },
  {
    colSpan: 3,
    label: '脉搏',
    property: 'text',
    isLabel: true,
  },
]

const BloodPressure = (props) => {
  const { form: { getFieldDecorator }, physicalExamination = {}, rootKey, label } = props
  return (<RowItem isInline>
    <RowItemLabel>{label}</RowItemLabel>
    <StyledRow gutter={6} width={320}>
      {
        formItems.map(formItem => (<Col key={`${rootKey}.${formItem.property}`} span={formItem.colSpan}>
          {
            formItem.isLabel ? <span>{formItem.label}</span>
              : <FormItem>
                {
                  getFieldDecorator(`${rootKey}.${formItem.property}`, {
                    rules: formItem.rules,
                    initialValue: get(physicalExamination, `${rootKey}.${formItem.property}`, ''),
                  })(
                    <StyledInput />,
                  )
                }
              </FormItem>
          }
        </Col>))
      }
    </StyledRow>

  </RowItem>)
}

BloodPressure.propTypes = {
  form: PropTypes.object,
  physicalExamination: PropTypes.object,
  rootKey: PropTypes.string,
  label: PropTypes.string,
}

export default BloodPressure
