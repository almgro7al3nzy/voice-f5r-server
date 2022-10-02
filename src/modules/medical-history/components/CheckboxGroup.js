import React, { PropTypes } from 'react'
import { Form } from 'antd'
import * as OPTIONS_MEDICAL from '../constants'
import { RowItem, OrderNumberLabel, StyledCheckboxGroup } from './styled-components'

const FormItem = Form.Item

const getOptions = type => OPTIONS_MEDICAL[type].options.filter(item => item.key !== 'FIFTY_FIVE_FOR_MALE_SIXTY_FIVE_FOR_FEMALE')
.map((o) => {
  const temp = {
    label: o.label,
    value: o.key,
  }
  return temp
})

const ICheckboxGroup = (props) => {
  const { type, onChange, getFieldDecorator, initialValue } = props
  return (<RowItem>
    <OrderNumberLabel>{OPTIONS_MEDICAL[type].label}</OrderNumberLabel>
    <FormItem>
      {
        getFieldDecorator(OPTIONS_MEDICAL[type].key, {
          initialValue,
        })(
          <StyledCheckboxGroup isLineHeight options={getOptions(type)} onChange={onChange} />,
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
