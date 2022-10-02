import React, { PropTypes } from 'react'
import { Form, Input, Icon } from 'antd'
import { withApollo } from 'react-apollo'
import { isNumber, isExistMobileNumber, isWeightNumber } from '../actions'


const FormItem = Form.Item
let itemProps = {}

const MapsForItem = {
  height: {
    addonAfter: 'CM',
    label: '身高',
    message: '身高为有效数字',
    notRequired: true,
    validator: (rule, value, callback) => {
      if (value) {
        if (isNumber(value)) {
          callback()
        } else {
          callback('身高为有效数字')
        }
      } else {
        callback()
      }
    },
  },
  weight: {
    addonAfter: 'KG',
    label: '体重',
    message: '体重为有效数字',
    notRequired: true,
    validator: (rule, value, callback) => {
      if (value) {
        if (isWeightNumber(value)) {
          callback()
        } else {
          callback('体重为有效数字')
        }
      } else {
        callback()
      }
    },
  },
  mobile: {
    addonAfter: null,
    label: '手机号',
    message: '手机号不能为空',
    placeholder: '请输入',
    prefix: <Icon type="phone" />,
    validator: (rule, value, callback) => {
      if (isNumber(value, 11)) {
        if (itemProps.patientInfo && itemProps.patientInfo.mobile === value) {
          callback()
        }
        itemProps.client.query({
          query: isExistMobileNumber,
          variables: {
            mobileNumber: value,
          },
          fetchPolicy: 'network-only',
        }).then((result) => {
          if (result.data.patientByMobile) {
            callback('此手机号已被注册')
          } else {
            callback()
          }
        })
      } else {
        callback('手机号为11位有效数字')
      }
    },
  },
  fullName: {
    label: '姓名',
    message: '姓名不能为空',
    placeholder: '请输入',
  },
  HISNumber: {
    label: '病历号',
    message: '病历号不能为空',
    placeholder: 'HN',
    notRequired: true,
  },
}

const InputItem = (props) => {
  const { getFieldDecorator,
    formItemLayout,
    type,
    initialValue } = props
  itemProps = props
  return (<FormItem label={MapsForItem[type].label} {...formItemLayout}>
    {getFieldDecorator(type, {
      rules: [{
        required: !MapsForItem[type].notRequired,
        message: MapsForItem[type].message,
      }, {
        validator: MapsForItem[type].validator || ((rule, value, callback) => callback()),
      }],
      initialValue,
    })(
      <Input
        placeholder={MapsForItem[type].placeholder}
        prefix={MapsForItem[type].prefix}
        addonAfter={MapsForItem[type].addonAfter}
      />,
    )}
  </FormItem>)
}

InputItem.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  formItemLayout: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  initialValue: PropTypes.any,
}

export default withApollo(InputItem)
