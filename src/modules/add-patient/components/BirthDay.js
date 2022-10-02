import React, { PropTypes } from 'react'
import { Row, Col, Input, Form } from 'antd'
// import { StyledFormItem } from './styled-components'
import { isNumber, isBetween } from '../../common/utils'

const FormItem = Form.Item

const mapOptions = {
  year: {
    range: [1900, 3000],
    msg: '年份',
  },
  month: {
    range: [1, 12],
    msg: '月份',
  },
  day: {
    range: [1, 31],
    msg: '日期',
  },
}

const validator = (rule, value, callback, type) => {
  const max = mapOptions[type].range[1]
  const min = mapOptions[type].range[0]
  const isInRange = isBetween(value, min, max)
  if (value) {
    if (isNumber(value) && isInRange) {
      callback()
    } else {
      callback(`有效${mapOptions[type].msg}是${min}~${max}`)
    }
  } else {
    callback()
  }
}

const getValue = (dateOfBirth, pIndex) => {
  const dates = dateOfBirth ? dateOfBirth.split('-') : ''
  return dates.length > 1 ? dates[pIndex] : ''
}

const formItems = [
  {
    colSpan: 5,
    property: 'dateOfBirth.year',
    rules: [{
      required: false,
    },
    {
      validator: (rule, value, callback) => validator(rule, value, callback, 'year'),
    },
    ],
    placeholder: '1990',
    getInitialValue: dateOfBirth => getValue(dateOfBirth, 0),
  },
  {
    colSpan: 2,
    label: '年',
    property: 'year',
    isLabel: true,
  },
  {
    colSpan: 4,
    property: 'dateOfBirth.month',
    rules: [{
      required: false,
    },
    {
      validator: (rule, value, callback) => validator(rule, value, callback, 'month'),
    },
    ],
    placeholder: '07',
    getInitialValue: dateOfBirth => getValue(dateOfBirth, 1),
  },
  {
    colSpan: 2,
    label: '月',
    property: 'month',
    isLabel: true,
  },
  {
    colSpan: 4,
    property: 'dateOfBirth.day',
    rules: [{
      required: false,
    },
    {
      validator: (rule, value, callback) => validator(rule, value, callback, 'day'),
    },
    ],
    placeholder: '15',
    getInitialValue: dateOfBirth => getValue(dateOfBirth, 2),
  },
  {
    colSpan: 1,
    label: '日',
    property: 'day',
    isLabel: true,
  },
]

const BirthDay = ({
  getFieldDecorator,
  setFieldsValue,
  dateOfBirth = '' }) => (<Row gutter={5}>
    <FormItem
      label="出生日期"
      wrapperCol={{ span: 18 }}
      labelCol={{ span: 5 }}
    >
      <Row gutter={5}>
        {
          formItems.map(formItem => (<Col key={formItem.property} span={formItem.colSpan}>
            {
              formItem.isLabel ? <span>{formItem.label}</span>
                : <FormItem>
                  {
                    getFieldDecorator(formItem.property, {
                      rules: formItem.rules,
                      initialValue: formItem.getInitialValue(dateOfBirth),
                    })(
                      <Input
                        placeholder={formItem.placeholder}
                        onBlur={(e) => {
                          const { value } = e.target
                          if (/month|day/g.test(formItem.property) && value && value < 10 && value.length < 2) {
                            setFieldsValue({
                              [formItem.property]: `0${value}`,
                            })
                          }
                        }}
                      />,
                    )
                  }
                </FormItem>
            }
          </Col>
          ))
        }
      </Row>
    </FormItem>
  </Row>)

BirthDay.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  setFieldsValue: PropTypes.func.isRequired,
  dateOfBirth: PropTypes.string,
}

export default BirthDay
