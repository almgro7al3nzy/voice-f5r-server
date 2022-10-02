import React, { PropTypes } from 'react'
import { Chart, Axis, Tooltip, Legend, Guide, Geom } from 'bizcharts'
import { Button } from 'antd'
import { graphql } from 'react-apollo'
import moment from 'moment'
import lodash from 'lodash'
import { queryChartHistory } from '../actions/ShowBPInfoPicture'
/* eslint-disable */
const ButtonGroup = Button.Group

const systolicLevel = 135
const diastolicLevel = 85
const heartRateLevel = 75

const min = 40
// 收缩压颜色
const color_systolic = '#aed581'
// 舒张压颜色
const color_diastolic = '#64b5f6'
// 平均血压颜色
const color_level = '#b5a2de'
// 脉搏颜色
const color_heartRate = '#d71f4b'
// 脉搏参考线颜色
const color_line = '#666666'

let chartIns = null

class ShowBPInfoPicture extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      BPButtonClass: props.BtnClick,
    }
    this.max = 60,
      this.cols = {
        systolic: { alias: '收缩压', min: min, max: this.max },
        diastolic: { alias: '舒张压', min: min, max: this.max },
        heartRate: { alias: '脉搏', min: min, max: this.max },
        pressureLevel: { alias: '平均血压', min: min, max: this.max },
        measuredAt: { alias: '日期', range: [0, 1], tickCount: 12 },
      }
  }

  componentWillReceiveProps(np) {
    this.getMyData(np)
  }

  setPeriod = (period) => {
    const patientId = this.props.PId
    if (period === '1month') {
      this.setState({ BPButtonClass: ['default', 'selected', 'default', 'default'] })
      this.props.data.refetch({
        id: patientId,
        after: moment()
          .subtract(1, 'months')
          .add(1, 'days')
          .startOf('day')._d,
        limit: 800,
      })
    } else if (period === '3month') {
      this.setState({ BPButtonClass: ['default', 'default', 'selected', 'default'] })
      this.props.data.refetch({
        id: patientId,
        after: moment()
          .subtract(3, 'months')
          .add(1, 'days')
          .startOf('day')._d,
        limit: 800,
      })
    } else if (period === 'all') {
      this.setState({ BPButtonClass: ['default', 'default', 'default', 'selected'] })
      this.props.data.refetch({
        id: patientId,
        after: moment()
          .subtract(50, 'years')
          .startOf('day')._d,
        limit: 800,
      })
    } else {
      this.setState({ BPButtonClass: ['selected', 'default', 'default', 'default'] })
      this.props.data.refetch({
        id: patientId,
        after: moment()
          .subtract(6, 'days')
          .startOf('day')._d,
        limit: 800,
      })
    }
  }

  getMyData(np) {
    const { data } = np
    let dataSource = []
    const newData = data.me ? data.me.healthCareTeams[0].patient.bloodPressureMeasurements : []
    const maxY = lodash.maxBy(newData, function (maxY) { return maxY.systolic })
    this.max = maxY && maxY.systolic
    this.cols = {
      systolic: { alias: '收缩压', min: min, max: this.max },
      diastolic: { alias: '舒张压', min: min, max: this.max },
      heartRate: { alias: '脉搏', min: min, max: this.max },
      pressureLevel: { alias: '平均血压', min: min, max: this.max },
      measuredAt: { alias: '日期', range: [0, 1], tickCount: 12 },
    }
    for (let i = 0; i < newData.length; i++) {
      let dataCell = {}
      dataCell.systolic = [135, newData[i].systolic]
      dataCell.diastolic = [85, newData[i].diastolic]
      dataCell.heartRate = newData[i].heartRate
      const tempBP = (newData[i].systolic - newData[i].diastolic) / 3
      dataCell.pressureLevel = newData[i].diastolic + tempBP
      dataCell.measuredAt = newData[i].measuredAt
      dataSource.push(dataCell)
    }
    this.setState({
      data: dataSource.reverse(),
    })
  }
  render() {
    const { data } = this.props
    const max = this.max
    const medicine = data.me ? data.me.healthCareTeams[0].patient.medicinesCondition : []
    const medicineData = medicine ? medicine : []
    return (
      <div>
        <div>
          <span style={{ fontSize: '14px' }}>血压趋势</span>
          <ButtonGroup style={{ float: 'right', marginRight: '50px' }}>
            <Button
              type="ghost"
              key="1"
              className={this.state.BPButtonClass[0]}
              onClick={() => this.setPeriod('default')}
            >
              7日
                </Button>
            <Button
              type="ghost"
              key="2"
              className={this.state.BPButtonClass[1]}
              onClick={() => this.setPeriod('1month')}
            >
              1个月
                </Button>
            <Button
              type="ghost"
              key="3"
              className={this.state.BPButtonClass[2]}
              onClick={() => this.setPeriod('3month')}
            >
              3个月
                </Button>
            <Button
              type="ghost"
              key="4"
              className={this.state.BPButtonClass[3]}
              onClick={() => this.setPeriod('all')}
            >
              全部
                </Button>
          </ButtonGroup>
        </div>
        <Chart
          forceFit
          data={this.state.data}
          scale={this.cols}
          onGetG2Instance={(chart) => {
            chartIns = chart;
          }}
          padding='auto'>
          <Axis
            name="measuredAt"
            visible={true}
            title={false}
            label={{
              formatter: val => {
                return moment(val).format("MM") + "月"
              },
            }} />
          <Axis name="systolic" visible={true} />
          <Axis name="diastolic" visible={false} />
          <Axis name="heartRate" visible={false} />
          <Axis name="pressureLevel" visible={false} />
          <Legend position="bottom"
            custom={true}
            allowAllCanceled={true}
            items={[
              {
                value: '收缩压',
                name: 'systolic',
                marker: { symbol: 'square', fill: color_systolic, radius: 8 }
              },
              {
                value: '舒张压',
                name: 'diastolic',
                marker: { symbol: 'square', fill: color_diastolic, radius: 8, }
              },
              {
                value: '平均动脉压',
                name: 'pressureLevel',
                marker: { symbol: 'hyphen', stroke: color_level, radius: 8, lineWidth: 1 }
              },
              {
                value: '脉搏',
                name: 'heartRate',
                marker: { symbol: 'hyphen', stroke: color_heartRate, radius: 8, lineWidth: 1 }
              },
              {
                value: '脉搏参考线',
                name: 'heartRateLevel',
                marker: {
                  symbol: 'hyphen',
                  stroke: color_line,
                  radius: 8,
                  lineWidth: 1,
                  lineDash: [0, 2, 2]
                }
              },
            ]}
            offsetY={60}
            onClick={ev => {
              const item = ev.item
              const name = item.name
              const checked = ev.checked
              const geoms = chartIns.getAllGeoms();
              for (let i = 0; i < geoms.length; i++) {
                const geom = geoms[i]
                if (geom.getYScale().field === name) {
                  if (checked) {
                    geom.show()
                  } else {
                    geom.hide()
                  }
                }
              }
            }}

          />
          <Tooltip crosshairs={{ type: 'line' }} />
          <Guide>
            <Guide.Text top={true}
              position={['101%', (max - systolicLevel) * 100 / (max - min) + "%"]}
              content={systolicLevel + "mmHg"} />
            <Guide.Text top={true}
              position={['101%', (max - diastolicLevel) * 100 / (max - min) + "%"]}
              content={diastolicLevel + "mmHg"} />
            <Guide.Line top={true}
              start={[0, heartRateLevel]}
              end={['100%', (max - heartRateLevel) * 100 / (max - min) + "%"]}
              lineStyle={{
                stroke: color_line,
                lineDash: [0, 2, 2],
                lineWidth: 1
              }}
            />
            <Guide.Text top={true}
              position={['101%', (max - heartRateLevel) * 100 / (max - min) + "%"]}
              content={heartRateLevel + "BPM"} />

            {medicineData.map((item, index) => {
              return (
                medicineData[index].prescription.medicines.map((value, i) => {
                  let medicines = medicineData[index].prescription.medicines
                  let y = 115 + (5 * i)
                  let x = 0
                  for (let j = 0; j < this.state.data.length - 1; j++) {
                    const tmpMoment = moment(this.state.data[j].measuredAt).format('YYYY-MM-DD')
                    const nTmpMoment = moment(this.state.data[j + 1].measuredAt).format('YYYY-MM-DD')
                    if (moment(tmpMoment) <= moment(medicineData[index].createdAt) && moment(medicineData[index].createdAt) < moment(nTmpMoment)) {
                      let percent = ((moment(medicineData[index].createdAt) - moment(tmpMoment)) / (moment(nTmpMoment) - moment(tmpMoment)))
                      x = (j + percent) * 100 / (this.state.data.length - 1)
                      return (
                        <div key={[index, i]}>
                          {i === 0 ?
                            <div>
                              <Guide.Line top={true}
                                start={[x + "%", "100%"]}
                                end={[x + "%", 115 + (5 * medicineData[index].prescription.medicines.length + 1) + "%"]}
                                lineStyle={{
                                  stroke: '#979797', // 线的颜色
                                  lineDash: [0, 0, 0],
                                  lineWidth: 1 // 线的宽度
                                }} // 图形样式配置
                              />
                              <Guide.Text top={true}
                                position={[x + 1 + "%", y + "%"]}
                                content={"自" + moment(medicineData[index].createdAt).format('MM/DD') + "起服用"}
                                style={{
                                  fill: '#666666'
                                }} />
                            </div> : null}
                          <Guide.Text top={true}
                            position={[x + 1 + "%", y + 5 + "%"]}
                            content={medicines[i].name + "\t" + medicines[i].dosage + "mg" + "\t" + medicines[i].usage}
                            style={{
                              fill: '#26344b'
                            }} />
                        </div>)
                    }
                  }
                  return null;
                })
              )
            })}

          </Guide>
          <Geom
            type="area"
            position="measuredAt*systolic"
            size={0}
            color="#aed581"
            tooltip={['measuredAt*systolic', (measuredAt, systolic) => {
              return {
                name: '收缩压',
                title: moment(measuredAt).format("hh:mm MM-DD"),
                value: systolic[1]
              }
            }]} />
          <Geom
            type="area"
            position="measuredAt*diastolic"
            size={0}
            color="#64b5f6"
            tooltip={['measuredAt*diastolic', (measuredAt, diastolic) => {
              return {
                name: '舒张压',
                title: moment(measuredAt).format("hh:mm MM-DD"),
                value: diastolic[1]
              }
            }]}
          />
          <Geom
            type="line"
            position="measuredAt*heartRate"
            size={1}
            color="#d71f4b"
            tooltip={['measuredAt*heartRate', (measuredAt, heartRate) => {
              return {
                name: '脉搏',
                title: moment(measuredAt).format("hh:mm MM-DD"),
                value: heartRate
              }
            }]}
          />
          <Geom
            type="line"
            position="measuredAt*pressureLevel"
            size={1}
            color={color_level}
            tooltip={['measuredAt*pressureLevel', (measuredAt, pressureLevel) => {
              return {
                name: '平均动脉压',
                title: moment(measuredAt).format("hh:mm MM-DD"),
                value: parseInt(pressureLevel)
              }
            }]}
          />
          <Geom
            type="point"
            position="measuredAt*heartRate"
            size={0}
            shape={'circle'}
            style={{ stroke: '#fff', lineWidth: 1 }} />
        </Chart>
      </div>
    )
  }
}
ShowBPInfoPicture.propTypes = {
  props: PropTypes.object.isRequired,
}

export default graphql(queryChartHistory, {
  options: (props) => {
    const { choose } = props
    let after = moment()
    switch (choose) {
      case '1month': {
        after = moment()
          .subtract(1, 'months')
          .add(1, 'days')
          .startOf('day')._d
        break
      }
      case '3month': {
        after = moment()
          .subtract(3, 'months')
          .add(1, 'days')
          .startOf('day')._d
        break
      }
      case 'all': {
        after = moment()
          .subtract(50, 'years')
          .startOf('day')._d
        break
      }
      case 'default': {
        after = moment()
          .subtract(6, 'days')
          .startOf('day')._d
        break
      }
      default:
        after = moment()
          .subtract(6, 'days')
          .startOf('day')._d
    }
    return {
      variables: {
        id: props.PId,
        after: after,
      }
    }
  }
})(ShowBPInfoPicture) 
