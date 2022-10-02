import React, { PropTypes } from 'react'
import { Select } from 'antd'

const Option = Select.Option

const ISelect = ({ defaultValue, style, handleChange, options }) => {
  const comboStyle = {
    width: 100,
    ...style,
  }
  return (<div>
    <Select
      defaultValue={defaultValue}
      style={comboStyle}
      onChange={handleChange}
    >
      {
        options.map(option => (<Option
          value={option.key}
          key={option.key}
        >
          {option.title}
        </Option>))
      }
    </Select>
  </div>)
}

ISelect.propTypes = {
  defaultValue: PropTypes.string,
  style: PropTypes.object,
  handleChange: PropTypes.func,
  options: PropTypes.array,
}

export default ISelect
