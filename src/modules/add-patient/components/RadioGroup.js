import React, { PropTypes } from 'react'
import { Radio, Form } from 'antd'

const FormItem = Form.Item

const RadioGroup = Radio.Group

const IRaidoGroup = ({ getFieldDecorator, info, handleChange, initialValue }) => (<FormItem
  label={info.label}
  {...info.formItemLayout}
>
  {
    getFieldDecorator(info.property, {
      rules: info.rules,
      initialValue: initialValue || '',
    })(<RadioGroup
      onChange={handleChange}
    >
      {
        info.radios.map(radio => (<Radio
          key={radio.value}
          value={radio.value}
        >{radio.label}</Radio>))
      }
    </RadioGroup>)
  }
</FormItem>)

IRaidoGroup.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  handleChange: PropTypes.func,
  initialValue: PropTypes.any,
  info: PropTypes.object.isRequired,
}

export default IRaidoGroup
