import React, { PropTypes } from 'react'
import { AutoComplete, Button, Form } from 'antd'
import styled from 'styled-components'
// import shortid from 'shortid'
// import _ from 'lodash'
// import pinyin from 'pinyin'
import { MedicinesOption, usageArray } from '../constants'

const FormItem = Form.Item
const Option = AutoComplete.Option
let dosageObjectArray = {}
const validator = (rule, value, callback) => {
  if (!value) {
    callback('请填写剂量')
  } else {
    const patrn = /^\d+(\.\d+)?$/
    if (!patrn.exec(value)) {
      callback('请填写正确剂量')
    } else {
      callback()
    }
  }
}
class MedicineItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      medicineDataSource: MedicinesOption,
    }
  }
  onChange = (value) => {
    const temp = [...this.props.allMdcs]
    // temp[this.props.itemIndex].selection = selection
    // console.log('MedicineItem,onChange', temp[this.props.itemIndex])
    // console.table(temp)
    dosageObjectArray = Object.assign(dosageObjectArray,
      { [this.props.itemIndex]: this.getMedicineChildren(value) })
    // console.log('onChange', dosageObjectArray)
    temp[this.props.itemIndex].name = value
    // console.table(temp)
    this.props.changeEditModalState(temp)
  }
  getMedicineChildren = (value) => {
    let children = {}
    MedicinesOption.map((item) => {
      if (item.value === value) {
        children = item.children
      }
      return ''
    })
    // console.log('getMedicineChildren', children)
    return children
  }

  deleteClick = () => {
    console.log(`Your click to delete index ${this.props.itemIndex}`)
    const temp = [...this.props.allMdcs]
    // remove index of clicked item
    temp.splice(this.props.itemIndex, 1)
    // reset parent component state
    this.props.changeEditModalState(temp)
  }
  dosageChange = (value) => {
    const temp = [...this.props.allMdcs]
    temp[this.props.itemIndex].dosage = value
    this.props.changeEditModalState(temp)
  }
  usageChange = (value) => {
    const temp = [...this.props.allMdcs]
    temp[this.props.itemIndex].usage = value
    this.props.changeEditModalState(temp)
  }
  displayRender = label => (label[0] ? label[0] : '')

  handleSearch = (value) => {
    const seachMedic = []
    MedicinesOption.map((item) => {
      if (item.value.indexOf(value) >= 0) {
        seachMedic.push(item)
      }
      return ''
    })
    this.setState({
      medicineDataSource: !value ? MedicinesOption : seachMedic,
    })
  }

  renderOption = item => (
    <Option key={item.label} value={item.value ? item.value : item.label}>
      {item.label}
    </Option>)

  renderDosageOption = item => (
    <Option key={item.value} value={item.value ? item.value.toString() : item.label}>
      {item.value}
    </Option>)

  render() {
    return (
      <FlexDiv>
        <FlexDiv>
          <FormItem>
            {this.props.getFieldDecorator(`medic-${this.props.itemIndex}`, {
              rules: [{ required: true, message: '请填写处方' }],
              initialValue: this.props.currMdcs.selection[0],
            })(<AutoComplete
              dataSource={this.state.medicineDataSource.map(this.renderOption)}
              onChange={this.onChange}
              placeholder="在此选取处方药物与用法用量"
              style={{ width: '240px' }}
              onSearch={this.handleSearch}
            />)}
          </FormItem>
        </FlexDiv>
        <MarginFlexDiv>
          <FormItem>
            {this.props.getFieldDecorator(`dosage-${this.props.itemIndex}`, {
              rules: [{ validator }],
              initialValue: this.props.currMdcs.selection[1],
            })(<AutoComplete
              style={{ width: '50px' }}
              onChange={this.dosageChange}
              dataSource={(dosageObjectArray[this.props.itemIndex]
                && dosageObjectArray[this.props.itemIndex].length) > 0
                ? dosageObjectArray[this.props.itemIndex].map(this.renderDosageOption) : ''}
            />)}
          </FormItem>
        </MarginFlexDiv>
        <MarginFlexDiv>{'mg'}</MarginFlexDiv>
        <MarginFlexDiv>
          <FormItem>
            {this.props.getFieldDecorator(`usage-${this.props.itemIndex}`, {
              rules: [{ required: true, message: '请填写用法' }],
              initialValue: this.props.currMdcs.selection[2],
            })(<AutoComplete
              style={{ width: '50px' }}
              dataSource={usageArray.map(this.renderOption)}
              onChange={this.usageChange}
            />)}
          </FormItem>
        </MarginFlexDiv>
        <MarginFlexDiv>
          <Button icon="delete" style={{ border: 'none' }} onClick={this.deleteClick} />
        </MarginFlexDiv>
      </FlexDiv>
    )
  }
}

MedicineItem.propTypes = {
  changeEditModalState: PropTypes.func,
  allMdcs: PropTypes.array,
  itemIndex: PropTypes.number,
  currMdcs: PropTypes.object,
  getFieldDecorator: PropTypes.func,
  // key: PropTypes.object,
}

const FlexDiv = styled.div`
  margin-bottom:10px;
  display: flex;
  flex: auto initial initial;
`

const MarginFlexDiv = FlexDiv.extend`margin-left: 10px;`

export default MedicineItem
