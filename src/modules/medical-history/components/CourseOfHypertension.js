import React, { PropTypes } from 'react'
import { Form } from 'antd'
import { RowItem, StyledInput, OrderNumberLabel } from './styled-components'
import { courseOfHypertension as constantInfo } from '../constants'
import { isNumber, isBetween } from '../../common/utils'

const getValue = (courseOfHypertension, pIndex) => {
  const dates = courseOfHypertension.split('-')
  return dates.length > 1 ? dates[pIndex] : ''
}
const mapOptions = {
  year: {
    range: [1900, new Date().getFullYear()],
    msg: '年份',
  },
  month: {
    range: [1, 12],
    msg: '月份',
  },
}

const validator = (rule, value, callback, type) => {
  const max = mapOptions[type].range[1]
  const min = mapOptions[type].range[0]
  const isInRange = isBetween(value, min, max)
  if (value && isNumber(value) && isInRange) {
    callback()
  } else {
    callback(`有效${mapOptions[type].msg}是${min}~${max}`)
  }
}

const formFields = [
  {
    key: `${constantInfo.key}.year`,
    rules: [
      {
        validator: (rule, value, callback) => validator(rule, value, callback, 'year'),
      },
    ],
    initialValue: courseOfHypertension => getValue(courseOfHypertension, 0),
    placeholder: '1990',
    addonAfter: '年',
    width: 60,
  },
  // {
  //   key: `${constantInfo.key}.month`,
  //   rules: [
  //     {
  //       validator: (rule, value, callback) => validator(rule, value, callback, 'month'),
  //     },
  //   ],
  //   initialValue: courseOfHypertension => getValue(courseOfHypertension, 1),
  //   placeholder: '02',
  //   addonAfter: '月',
  //   width: 40,
  //   marginLeft: 15,
  // },
]

const FormItem = Form.Item

const CourseOfHypertension = ({
  getFieldDecorator,
  courseOfHypertension = '',
  setFieldsValue,
}) =>
  (<RowItem isInline>
    <OrderNumberLabel>{constantInfo.label}</OrderNumberLabel>
    {
      formFields.map((formField) => {
        const {
        rules, initialValue, placeholder,
          addonAfter, width, key, marginLeft,
      } = formField
        const props = { placeholder, addonAfter, width, marginLeft }
        return (<FormItem key={key}>
          {
            getFieldDecorator(key, {
              rules, initialValue: initialValue(courseOfHypertension),
            })(<StyledInput
              {...props}
              onBlur={(e) => {
                const { value } = e.target
                if (/month/g.test(key) && value && value < 10 && value.length < 2) {
                  setFieldsValue({
                    [key]: `0${value}`,
                  })
                }
              }}
            />)
          }
        </FormItem>)
      })
    }
  </RowItem>)

CourseOfHypertension.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  setFieldsValue: PropTypes.func.isRequired,
  courseOfHypertension: PropTypes.func.isRequired,
}
export default CourseOfHypertension
