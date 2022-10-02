// 营养模块React的主体
import React, { PropTypes } from 'react'
import { Input, Table, Button, Alert } from 'antd'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import omit from 'lodash/omit'
import styled from 'styled-components'
import { foodDataList, getCellMerge } from './foodDataList'
import { queryPatientNutritionList } from '../actions'
import './tableHeadStyle.css'

/* eslint-disable */
const { TextArea } = Input


const EditableCell = ({ editable, value, onChange, onBlur, disabled }) => (
  <div>
    {editable
      ? <InputStyle
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={() => onBlur()}
        disabled={disabled}
      />
      : value
    }
  </div>
)

class NutritionForm extends React.Component {
  constructor(props) {
    super(props)
    const { nutritionData } = props
    const tempData = nutritionData.batchInputs ? cloneDeep(nutritionData.batchInputs) : cloneDeep(foodDataList)
    this.columns = [{
      title: '食物种类',
      dataIndex: 'category',
      className: 'column-foodCategory',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        }
        const CellMerge = getCellMerge()
        for (let i = 0; i < CellMerge.length; i += 1) {
          if (index === CellMerge[i].indexOfCategory[0]) {
            obj.props.rowSpan = CellMerge[i].count
          } else {
            for (let j = 1; j < CellMerge[i].indexOfCategory.length; j += 1) {
              if (index === CellMerge[i].indexOfCategory[j]) {
                obj.props.rowSpan = 0
              }
            }
          }
        }
        return obj
      },
    }, {
      title: '食物名称',
      className: 'column-foodName',
      dataIndex: 'name',
      render: (text, record, index) => this.renderColumns(text, false, record, 'name', index),
    }, {
      title: '早餐',
      dataIndex: 'breakfast',
      render: (text, record, index) => this.renderColumns(text, this.state.isColorEditable, record, 'breakfast', index),
    },
    {
      title: '加餐-1',
      dataIndex: 'addMileB',
      render: (text, record, index) => this.renderColumns(text, this.state.isColorEditable, record, 'addMileB', index),
    },
    {
      title: '午餐',
      dataIndex: 'lunch',
      render: (text, record, index) => this.renderColumns(text, this.state.isColorEditable, record, 'lunch', index),
    },
    {
      title: '加餐-2',
      dataIndex: 'addMileL',
      render: (text, record, index) => this.renderColumns(text, this.state.isColorEditable, record, 'addMileL', index),
    },
    {
      title: '晚餐',
      dataIndex: 'dinner',
      render: (text, record, index) => this.renderColumns(text, this.state.isColorEditable, record, 'dinner', index),
    }, {
      title: '加餐-3',
      dataIndex: 'addMileN',
      render: (text, record, index) => this.renderColumns(text, this.state.isColorEditable, record, 'addMileN', index),
    }, {
      title: '合计',
      dataIndex: 'total',
      // className: 'column-total',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        }
        if (index === 0) {
          obj.props.rowSpan = foodDataList.length - 4
          return obj
        } else if (index !== 0 && index < foodDataList.length - 4) {
          obj.props.rowSpan = 0;
          return obj
        } else {
          return <div className='column-total'>{value}</div>
        }
      },
    }]
    this.state = ({
      isNew: nutritionData && nutritionData._id === 'new-nt',
      data: tempData,
      remark: nutritionData.remark || '',
      saving: false,
    })
  }
  onBlur() {
    const arr = ['breakfast', 'addMileB', 'lunch', 'addMileL', 'dinner', 'addMileN']
    for (let l = 0; l < arr.length; l += 1) {
      this.getLengthways(arr[l])
    }
    this.getCrosswise()
  }
  getLengthways(mileType) {
    const newData = [...this.state.data]
    const reg = /^[0-9]+.?[0-9]*$/
    // 糖类总量
    let saccharides = 0
    // 脂肪总量
    let axunge = 0
    // 蛋白质总量
    let protein = 0
    switch (mileType) {
      case 'breakfast':
        for (let h = 0; h < newData.length - 4; h += 1) {
          if (reg.test(newData[h].breakfast)) {
            saccharides = saccharides + (newData[h].breakfast * this.getRate(h).saccharides)
            axunge = axunge + (newData[h].breakfast * this.getRate(h).axunge)
            protein = protein + (newData[h].breakfast * this.getRate(h).protein)
          }
        }
        newData[newData.length - 4].breakfast = saccharides.toFixed(0)
        newData[newData.length - 3].breakfast = axunge.toFixed(0)
        newData[newData.length - 2].breakfast = protein.toFixed(0)
        newData[newData.length - 1].breakfast = ((4 * saccharides) + (9 * axunge) + (4 * protein)).toFixed(0)
        break
      case 'addMileB':
        for (let h = 0; h < newData.length - 4; h += 1) {
          if (reg.test(newData[h].addMileB)) {
            saccharides = saccharides + (newData[h].addMileB * this.getRate(h).saccharides)
            axunge = axunge + (newData[h].addMileB * this.getRate(h).axunge)
            protein = protein + (newData[h].addMileB * this.getRate(h).protein)
          }
        }
        newData[newData.length - 4].addMileB = saccharides.toFixed(0)
        newData[newData.length - 3].addMileB = axunge.toFixed(0)
        newData[newData.length - 2].addMileB = protein.toFixed(0)
        newData[newData.length - 1].addMileB = ((4 * saccharides) + (9 * axunge) + (4 * protein)).toFixed(0)
        break
      case 'lunch':
        for (let h = 0; h < newData.length - 4; h += 1) {
          if (reg.test(newData[h].lunch)) {
            saccharides = saccharides + (newData[h].lunch * this.getRate(h).saccharides)
            axunge = axunge + (newData[h].lunch * this.getRate(h).axunge)
            protein = protein + (newData[h].lunch * this.getRate(h).protein)
          }
        }
        newData[newData.length - 4].lunch = saccharides.toFixed(0)
        newData[newData.length - 3].lunch = axunge.toFixed(0)
        newData[newData.length - 2].lunch = protein.toFixed(0)
        newData[newData.length - 1].lunch = ((4 * saccharides) + (9 * axunge) + (4 * protein)).toFixed(0)
        break
      case 'addMileL':
        for (let h = 0; h < newData.length - 4; h += 1) {
          if (reg.test(newData[h].addMileL)) {
            saccharides = saccharides + (newData[h].addMileL * this.getRate(h).saccharides)
            axunge = axunge + (newData[h].addMileL * this.getRate(h).axunge)
            protein = protein + (newData[h].addMileL * this.getRate(h).protein)
          }
        }
        newData[newData.length - 4].addMileL = saccharides.toFixed(0)
        newData[newData.length - 3].addMileL = axunge.toFixed(0)
        newData[newData.length - 2].addMileL = protein.toFixed(0)
        newData[newData.length - 1].addMileL = ((4 * saccharides) + (9 * axunge) + (4 * protein)).toFixed(0)
        break
      case 'dinner':
        for (let h = 0; h < newData.length - 4; h += 1) {
          if (reg.test(newData[h].dinner)) {
            saccharides = saccharides + (newData[h].dinner * this.getRate(h).saccharides)
            axunge = axunge + (newData[h].dinner * this.getRate(h).axunge)
            protein = protein + (newData[h].dinner * this.getRate(h).protein)
          }
        }
        newData[newData.length - 4].dinner = saccharides.toFixed(0)
        newData[newData.length - 3].dinner = axunge.toFixed(0)
        newData[newData.length - 2].dinner = protein.toFixed(0)
        newData[newData.length - 1].dinner = ((4 * saccharides) + (9 * axunge) + (4 * protein)).toFixed(0)
        break
      case 'addMileN':
        for (let h = 0; h < newData.length - 4; h += 1) {
          if (reg.test(newData[h].addMileN)) {
            saccharides = saccharides + (newData[h].addMileN * this.getRate(h).saccharides)
            axunge = axunge + (newData[h].addMileN * this.getRate(h).axunge)
            protein = protein + (newData[h].addMileN * this.getRate(h).protein)
          }
        }
        newData[newData.length - 4].addMileN = saccharides.toFixed(0)
        newData[newData.length - 3].addMileN = axunge.toFixed(0)
        newData[newData.length - 2].addMileN = protein.toFixed(0)
        newData[newData.length - 1].addMileN = ((4 * saccharides) + (9 * axunge) + (4 * protein)).toFixed(0)
        break
      default:
        newData[newData.length - 4].addMileN = 0
        newData[newData.length - 3].addMileN = 0
        newData[newData.length - 2].addMileN = 0
        newData[newData.length - 1].addMileN = 0
        break
    }
    this.setState({
      data: newData
    })
  }


  getCrosswise() {
    const newData = [...this.state.data]
    // 总量
    let total = 0
    for (let k = newData.length - 5; k < newData.length; k += 1) {
      total = parseInt(newData[k].breakfast, 10)
        + parseInt(newData[k].addMileB, 10)
        + parseInt(newData[k].lunch, 10)
        + parseInt(newData[k].addMileL, 10) + parseInt(newData[k].dinner, 10) + parseInt(newData[k].addMileN, 10)
      newData[k].total = total
    }
    this.setState({
      data: newData,
    })
  }

  getRate(index) {
    // 糖类的比率
    let saccharides = 0
    // 脂肪的比率
    let axunge = 0
    // 蛋白质的比率
    let protein = 0
    // 比率汇总
    let rate = {
      saccharides: saccharides,
      axunge: axunge,
      protein: protein
    }
    switch (index) {
      case 0: // 米面
        saccharides = 20 / 25
        axunge = 0
        protein = 2 / 25
        break
      case 1: // 谷物类
        saccharides = 20 / 120
        axunge = 0
        protein = 2 / 120
        break
      case 2: // 谷物类 杂豆
        saccharides = 55.6 / 100
        axunge = 0.8 / 10
        protein = 21.6 / 100
        break
      case 3:  // 蛋类
        saccharides = 0.75 / 50
        axunge = 5 / 50
        protein = 6.5 / 50
        break
      case 4: // 奶类
        saccharides = 6 / 160
        axunge = 5 / 160
        protein = 5 / 160
        break
      case 5: // 奶类
        saccharides = 6 / 20
        axunge = 5 / 20
        protein = 5 / 20
        break
      case 6: // 奶类
        saccharides = 6 / 25
        axunge = 5 / 25
        protein = 5 / 25
        break
      case 7:// 豆腐
        saccharides = 4 / 100
        axunge = 4 / 100
        protein = 9 / 100
        break
      case 8:// 豆腐
        saccharides = 4 / 50
        axunge = 4 / 50
        protein = 9 / 50
        break
      case 9:// 豆腐
        saccharides = 4 / 225
        axunge = 4 / 225
        protein = 9 / 225
        break
      case 10:// 肉
        saccharides = 0
        axunge = 6 / 50
        protein = 9 / 50
        break
      case 11:// 鱼
        saccharides = 0
        axunge = 6 / 150
        protein = 9 / 150
        break
      case 12:// 蔬菜
        saccharides = 17 / 500
        axunge = 0
        protein = 5 / 500
        break
      case 13:// 水果
        saccharides = 21 / 200
        axunge = 0
        protein = 1 / 200
        break
      case 14:// 油脂类
        saccharides = 0
        axunge = 1
        protein = 0
        break
      case 15:// 油脂类
        saccharides = 2 / 16
        axunge = 7 / 16
        protein = 4 / 16
        break
      case 16:// 油脂类
        saccharides = 58.3 / 100
        axunge = 15.6 / 100
        protein = 18.5 / 100
        break
      default:
        saccharides = 0
        axunge = 0
        protein = 0
    }
    rate = {
      saccharides: saccharides,
      axunge: axunge,
      protein: protein
    }
    return rate
  }
  addThePatientInformation = (e) => {
    this.setState({ remark: e.target.value })
  }
  handleChange(value, key, column) {
    const newData = [...this.state.data]
    const target = newData.filter(item => key === item.key)[0]
    if (target) {
      target[column] = value
      this.setState({ data: newData })
    }
  }
  editingClick = () => {
    this.setState({ isColorEditable: true })
  }
  saveNurtition = debounce(() => {
    const {
      mutationAddNutritionList, patientId,
      mutationUpdateNutritionList, nutritionData,
    } = this.props
    let mutate = mutationAddNutritionList
    this.setState({ saving: true })
    const { data, remark, isNew } = this.state
    const options = {
      variables: {
        patientId,
        nutritionProblem: remark,
        batchInputs: data.map(o => omit(o, '__typename')),
      },
      refetchQueries: [{
        query: queryPatientNutritionList,
        variables: {
          patientId,
        },
      }],
    }

    if (!isNew) {
      mutate = mutationUpdateNutritionList
      options.variables._id = nutritionData._id
    } else {
      options.variables.patientId = patientId
    }
    mutate(options).then(() => {
      this.setState({ isShow: true })
      this.setState({ isColorEditable: false })
      this.setState({ saving: false })
      setTimeout(() => {
        this.setState({ isShow: false })
      }, 500)
    })
  }, 500)

  renderColumns(text, editable, record, column, index) {
    let disabled = true
    if (index < this.state.data.length - 4) {
      disabled = false
    } else {
      editable = false
    }
    return (
      <EditableCell
        editable={editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
        onBlur={() => {
          this.onBlur()
        }}
        disabled={disabled}
      />
    )
  }

  render() {
    return (
      <ContainerPage>
        <div>
          {this.state.isShow ? <Alert message="保存成功" type="success" style={{ marginBottom: '10px' }} />
            : ''}
          <span style={{ fontSize: '15px' }}>备注:</span>
          <TextStyle
            placeholder="写营养问题诊断"
            onChange={(e) => {
              this.setState({ remark: e.target.value })
            }}
            value={this.state.remark}
            color={this.state.isColorEditable}
            disabled={!this.state.isColorEditable}
          />
          <Button icon="edit" style={{ width: '70px' }} onClick={this.editingClick} disabled={this.props.isEditing}>编辑</Button>
          <Button icon="save" style={{ width: '70px' }} onClick={this.saveNurtition} disabled={this.props.isEditing || this.state.saving}>保存</Button>
        </div>
        <div style={{ color: '#596d8b', padding: '10px 0px' }}>常用食物营养指标计算器（食物单位：克，计算单位：千卡)</div>
        <ColorTable
          columns={this.columns}
          dataSource={this.state.data}
          pagination={false}
          bordered
        />
      </ContainerPage>
    )
  }
}

const ContainerPage = styled.div`
  background: #ffffff;
  padding: 10px;
  overflow: auto;
  height: calc(100vh - 210px);
`
const totalStyle = styled.div`
  margin: 0px 0px 0px 0px;
  padding: 0px 0px 0px 0px;
`
const InputStyle = styled(Input) `
  margin: -5px 0;
  padding: 0px 0px 0px 0px;
  border-width:1px;
  background:rgba(248, 231, 28, 0.12);
  width: 60px;
`
const TextStyle = styled(Input) `
  margin-right: 20px;
  border-width: ${props => props.color ? '1px' : '0px'};
  background:${props => props.color ? 'rgba(248, 231, 28, 0.12)' : 'white'};
  width: 80%;
  height: 61px;
`

export const ColorTable = styled(Table) `
  .ant-table-row:nth-last-child(5) ~ tr.ant-table-row {
    background: #dce3eb;
    td:last-child {
      background: #7a8aa2;
      color : #ffffff;
    }
  }
`
EditableCell.propTypes = {
  editable: PropTypes.any,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  disabled: PropTypes.any,

}
NutritionForm.propTypes = {
  mutationAddNutritionList: PropTypes.func.isRequired,
  patientId: PropTypes.string,
  data: PropTypes.func.isRequired,

}
export default NutritionForm
