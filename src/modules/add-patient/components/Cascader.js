import React, { PropTypes } from 'react'
import { Cascader, Form } from 'antd'
import data from '../constants/data.min'

const FormItem = Form.Item

const handleOptionsChange = (value, selectedOptions, setFieldsValue) => {
  setFieldsValue({
    'permanentPlaceOfRecidence.prefix': selectedOptions.map(o => o.label).join('/'),
  })
}

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 12 },
}

const ICascader = ({
  getFieldDecorator,
  setFieldsValue,
  permanentPlaceOfRecidence = {},
}) => {
  const { provinceCode, municipalityCode, areaCode } = permanentPlaceOfRecidence
  const initialValue = areaCode ? [provinceCode, municipalityCode, areaCode] : []
  return (<FormItem
    label="省市区"
    {...formItemLayout}
  >
    {getFieldDecorator('permanentPlaceOfRecidence.code', {
      rules: [{ required: false, message: '请选择省市区' }],
      initialValue,
    })(
      (<Cascader
        options={data.children}
        size="large"
        onChange={(value, selectedOptions) =>
          handleOptionsChange(value, selectedOptions, setFieldsValue)}
        placeholder="请选择省市"
      />),
    )}
  </FormItem>)
}


ICascader.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  setFieldsValue: PropTypes.func.isRequired,
  permanentPlaceOfRecidence: PropTypes.object,
}

export default ICascader
