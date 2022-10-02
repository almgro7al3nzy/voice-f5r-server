import React, { PropTypes } from 'react'
import { Form } from 'antd'
import * as OPTIONS_MEDICAL from '../constants'
import { RowItem, RowItemLabel, StyledCheckboxGroup } from './styled-components'

const FormItem = Form.Item

const getOptions = type => OPTIONS_MEDICAL[type].options.map((o) => {
  const temp = {
    label: o.label,
    value: o.key,
  }
  return temp
})

const ICheckboxGroup = (props) => {
  const { type, onChange, getFieldDecorator, initialValue } = props
  return (<RowItem>
    <RowItemLabel>{OPTIONS_MEDICAL[type].label}</RowItemLabel>
    <FormItem>
      {
        getFieldDecorator(OPTIONS_MEDICAL[type].key, {
          initialValue,
        })(
          <StyledCheckboxGroup options={getOptions(type)} onChange={onChange} />,
        )
      }
    </FormItem>
  </RowItem>)
}

ICheckboxGroup.propTypes = {
  getFieldDecorator: PropTypes.func,
  onChange: PropTypes.func,
  type: PropTypes.string.isRequired,
  initialValue: PropTypes.array,
}

export default ICheckboxGroup
