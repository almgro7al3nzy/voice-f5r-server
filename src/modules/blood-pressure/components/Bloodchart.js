import React, { PropTypes } from 'react'
import isEqual from 'lodash/isEqual'
import { connect } from 'react-redux'
import { Button } from 'antd'

import { Chart, Axis, Tooltip, Legend, Guide, Geom } from 'bizcharts'
import styled from 'styled-components'
import moment from 'moment'
import lodash from 'lodash'
import { graphql } from 'react-apollo'
import { queryhistory } from '../actions'
import { withLoading } from '../../../common/withLoading'
/* eslint-disable */

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

const refetchs = ({ data, period, patientId, startDate, endDate }) => {
  if (period === 'all') {
    data.refetch({
      id: patientId,
      after: moment()
        .subtract(50, 'years')
        .startOf('day')._d,
      limit: 800,
    })
  } else if (period === '1month') {
    data.refetch({
      id: patientId,
      after: moment()
        .subtract(1, 'months')
        .add(1, 'days')
        .startOf('day')._d,
      limit: 800,
    })
  } else if (period === '3month') {
    data.refetch({
      id: patientId,
      after: moment()
        .subtract(3, 'months')
        .add(1, 'days')
        .startOf('day')._d,
      limit: 800,
    })
  } else if (period === 'betweenDate') {
    data.refetch({
      id: patientId,
      before: new Date(endDate),
      after: new Date(startDate),
      limit: 800,
    })
  } else {
    data.refetch({
      id: patientId,
      after: moment()
        .subtract(6, 'days')
        .startOf('day')._d,
      limit: 800,
    })
  }
}

const mapStateToProps = (state, ownProps) => ({
  startDate: ownProps.startDate,
  endDate: ownProps.endDate,
  period: ownProps.period,
})

class Bloodchart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
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
    const { period, data } = this.props
    if (period !== np.period) {
      refetchs(np)
    }
    if (!np.data.loading && !isEqual(np.data, data)) {
      this.getMyData(np)
    }
  }
  getMyData(nextProps) {
    const { data } = nextProps
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
    const { data, ShowInfoPicture } = this.props
    const max = this.max
    return (
      <div>
        <Musk>
          <Chart
            forceFit
            data={this.state.data}
            scale={this.cols}
            onGetG2Instance={(chart) => {
              chartIns = chart;
            }}
            padding='auto'
            height={190}
          >
            <Axis
              name="measuredAt"
              visible={true}
              title={false}
              label={{
                formatter: val => {
                  return moment(val).format("MM") + "月"
                },
              }} />
            <Axis name="systolic" visible={true} label={
              {
                textStyle: {
                  fontSize: 10
                }
              }
            } />
            <Axis name="diastolic" visible={false} />
            <Axis name="heartRate" visible={false} />
            <Axis name="pressureLevel" visible={false} />
            <Legend position="bottom"
              custom={true}
              allowAllCanceled={true}
              itemGap={7}
              width={350}
              itemWidth={100}
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
              offsetY={10}
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
              />
              <Guide.Text top={true}
                position={['101%', (max - diastolicLevel) * 100 / (max - min) + "%"]}
              />
              <Guide.Line top={true}
                start={[0, heartRateLevel]}
                end={['100%', (max - heartRateLevel) * 100 / (max - min) + "%"]}
                lineStyle={{
                  stroke: color_line, // 线的颜色
                  lineDash: [0, 2, 2], // 虚线的设置
                  lineWidth: 1 // 线的宽度
                }} // 图形样式配置
              />
              <Guide.Text top={true}
                position={['101%', (max - heartRateLevel) * 100 / (max - min) + "%"]}
              />
            </Guide>
            <Geom
              type="area"
              position="measuredAt*systolic"
              size={0}
              color="#aed581"
              tooltip={['measuredAt*systolic', (measuredAt, systolic) => {
                return {
                  //自定义 tooltip 上显示的 title 显示内容等。
                  name: '收缩压',
                  title: moment(measuredAt).format("hh:mm MM-DD"),
                  value: systolic[1]
                };
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
                };
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
                };
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
                };
              }]}
            />
            <Geom
              type="point"
              position="measuredAt*heartRate"
              size={0}
              shape={'circle'}
              style={{ stroke: '#fff', lineWidth: 1 }} />
          </Chart>
        </Musk>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {this.props.isBtnHidden ? '' : <Button
            onClick={() =>
              ShowInfoPicture(this.props.period, this.props.patientId, this.props.Btn)}
          >
            查看详情
          </Button>}
        </div>
      </div>
    )
  }
}

const Musk = styled.div`
  height: 163px;
  position: relative;
`
Bloodchart.propTypes = {
  data: PropTypes.object.isRequired,
  period: PropTypes.string.isRequired,
  ShowInfoPicture: PropTypes.func.isRequired,
  patientId: PropTypes.object.isRequired,
}
export default connect(mapStateToProps, {})(
  graphql(queryhistory, {
    options: props => ({
      variables: {
        id: props.patientId,
        after:
          props.startDate ||
          moment()
            .subtract(6, 'days')
            .startOf('day')._d,
        before: props.endDate,
      },
    }),
  })(withLoading(Bloodchart)),
)
