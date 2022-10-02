import React, { PropTypes } from 'react'
import { Table, Card, Checkbox, Button, Icon, Popover } from 'antd'

import styled from 'styled-components'
import { getRows, getStatistic } from './blood-pressure-format.js'


class ShowHistoryTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isChecked: [],
    }
  }
  onChange = ({ checkedValues, row }) => {
    const tempValue = [...this.state.isChecked]
    if (checkedValues.target.checked) {
      tempValue.push(row.bpId)
    } else {
      const index = this.state.isChecked.indexOf(row.bpId)
      if (index > -1) {
        tempValue.splice(index, 1)
      }
    }
    this.setState({
      isChecked: tempValue,
    })
  }

  setColor = (obj) => {
    const color = obj.colors.BPLEVEL.color
    switch (color) {
      case '#5EB300': {
        return 'bloodcolor1 rowBasic'
      }
      case '#F5A623': {
        return 'bloodcolor2 rowBasic'
      }
      case '#FA7252': {
        return 'bloodcolor3 rowBasic'
      }
      case '#E50037': {
        return 'bloodcolor4 rowBasic'
      }
      case '#AD1457': {
        return 'bloodcolor5 rowBasic'
      }
      case '#79B0EC': {
        return 'bloodcolor6 rowBasic'
      }
      default:
        return 'bloodcolor1 rowBasic'
    }
  }
  clearTheCheckArray = () => {
    this.setState({
      isChecked: [],
    })
  }
  content = describleShow =>
    (
      <div>
        <span>{describleShow}</span>
      </div>)

  renderContent = (value, row) => {
    const obj = {
      children: '',
      props: {},
    }
    if (row.type) {
      obj.props.colSpan = 0
    } else {
      obj.children = `${value}`
      if (row.BloodPressureValue === value) {
        obj.props.className = this.setColor(row)
        if (row.manualAddition) {
          return (<div>
            <span style={{ color: row.colors.HPLEVEL.color, textAlign: 'center', fontStyle: 'italic', fontSize: '18px' }}>{row.HPressureValue}</span>
            <span style={{ color: row.colors.LPLEVEL.color, textAlign: 'center', fontStyle: 'italic', fontSize: '18px' }}>{row.VPressureValue}</span>
          </div>)
        }
        return (<div>
          <span style={{ color: row.colors.HPLEVEL.color, textAlign: 'center', fontSize: '18px' }}>{row.HPressureValue}</span>
          <span style={{ color: row.colors.LPLEVEL.color, textAlign: 'center', fontSize: '18px' }}>{row.VPressureValue}</span>
        </div>)
      } else if (row.exception === value) {
        let tempDes = ''
        if (row.describle && row.describle.length > 5) {
          tempDes = `${row.describle.substring(0, 5)}...`
        } else {
          tempDes = row.describle
        }
        return (
          <div>
            <Checkbox style={{ marginRight: '30px' }} checked={this.state.isChecked.indexOf(row.bpId) !== -1} onChange={checkedValues => this.onChange({ checkedValues, row })} />
            <Popover content={this.content(row.describle)}>
              <Button
                style={{ width: '100px', border: 0 }}
                onClick={() =>
                  this.props.overBPOpinion(this.state.isChecked,
                    row, this.props, this.clearTheCheckArray)}
              >{row.describle ? tempDes : <Icon type="edit" style={{ color: '#596d8b' }} />}
              </Button>
            </Popover>
          </div>)
      }
    }
    return obj
  }
  render() {
    const { queryBPHistory } = this.props
    const history = queryBPHistory.me ?
      queryBPHistory.me.healthCareTeams[0].patientHistoryForBD.BPHistory : []
    const safeRange = queryBPHistory.me ?
      queryBPHistory.me.healthCareTeams[0].patientHistoryForBD.PatientInfo.boundDetails : {}
    const overproofTypes = queryBPHistory.me ?
      queryBPHistory.me.healthCareTeams[0].patientHistoryForBD.OverproofTypes : []
    const historyData = getRows(history)
    const statistic = getStatistic(history, safeRange, overproofTypes)

    const tableColumns = [
      {
        title: '时段',
        dataIndex: 'measurementSituation',
        key: 'measurementSituation',
        width: '45px',
        className: 'bloodTime',
        render(text, row) {
          if (text) {
            return {
              children: `${text}`,
            }
          }
          return {
            children: row.value,
            props: {
              colSpan: 9,
              className: 'dataRow',
            },
          }
        },
      }, {
        title: '血压值',
        dataIndex: 'BloodPressureValue',
        key: 'BloodPressureValue',
        width: '100px',
        className: 'bloodValue',
        render: this.renderContent,
      }, {
        title: '脉搏',
        dataIndex: 'pulse',
        width: '55px',
        className: 'bloodPulseNum',
        key: 'pulse',
        render: this.renderContent,
      }, {
        title: `平均${' \n '}动脉压`,
        width: '55px',
        className: 'bloodMea',
        dataIndex: 'average',
        key: 'average',
        render: this.renderContent,
      }, {
        title: '状态',
        dataIndex: 'noteLabel',
        key: 'noteLabel',
        width: '90px',
        className: 'bloodLable',
        render: this.renderContent,
      }, {
        title: '症状',
        dataIndex: 'noteSymptom',
        key: 'noteSymptom',
        width: '90px',
        className: 'bloodLable',
        render: this.renderContent,
      }, {
        title: '时间',
        width: '55px',
        className: 'bloodMeasureTime',
        dataIndex: 'measuredAt',
        key: 'measuredAt',
        render: this.renderContent,
      }, {
        title: '地点',
        width: '55px',
        className: 'bloodMeasureTime',
        dataIndex: 'city',
        key: 'city',
        render: this.renderContent,
      }, {
        title: <div style={{ flexDirection: 'column', display: 'flex' }}>
          <span >异常处理</span>
          <span >(勾选可批量处理)</span>
        </div>,
        className: 'bloodException',
        dataIndex: 'exception',
        key: 'exception',
        render: this.renderContent,
      },
    ]
    return (
      <TableDiv>
        <Card className="totalCard">
          <CardDiv>
            <div>
              <StatisticsNums>{statistic.total}</StatisticsNums>
              <StatisticsText> 次测量</StatisticsText>
            </div>
            <div>
              <StatisticsNums>{statistic.overDiastolic}</StatisticsNums>
              <StatisticsText> 次收缩压超标</StatisticsText>
            </div>
            <div>
              <StatisticsNums>{statistic.overSystolic}</StatisticsNums>
              <StatisticsText> 次舒张压超标</StatisticsText>
            </div>
            <div>
              <StatisticsNums>{statistic.average}</StatisticsNums>
              <StatisticsText> 平均血压</StatisticsText>
            </div>
            <div>
              <StatisticsNums>{statistic.standard}</StatisticsNums>
              <StatisticsText> 达标率</StatisticsText>
            </div>
          </CardDiv>
        </Card>
        <Table
          className="tableBasic histroyTableTh tableTd"
          columns={tableColumns}
          dataSource={historyData}
          bordered
          pagination={false}
          scroll={{ y: 500 }}
          useFixedHeader
        />
      </TableDiv>
    )
  }

}

const TableDiv = styled.div`
  float: center;
`
const CardDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const StatisticsNums = styled.span`
color: #26344b;
font-family: HelveticaNeue, Arial;
  font-size: 24px;
`
const StatisticsText = styled.span`
  font-family: PingFangSC;
  color: rgba(0, 0, 0, 0.5);
  font-size: 12px;
`

ShowHistoryTable.propTypes = {
  queryBPHistory: PropTypes.object.isRequired,
  overBPOpinion: PropTypes.object.isRequired,

}
export default ShowHistoryTable
