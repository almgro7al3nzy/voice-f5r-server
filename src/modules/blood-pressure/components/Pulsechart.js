import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactEcharts from 'echarts-for-react'
import styled from 'styled-components'
import moment from 'moment'
import { graphql } from 'react-apollo'
import { queryhistory } from '../actions'
import { withLoading } from '../../../common/withLoading'

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
const queryVariables = {
  options: props => ({
    variables: {
      id: props.patientId,
      after: props.startDate || moment()
        .subtract(6, 'days')
        .startOf('day')._d,
      before: props.endDate,
    },
  }),
}

const mapStateToProps = (state, ownProps) => ({
  startDate: ownProps.startDate,
  endDate: ownProps.endDate,
  period: ownProps.period,
})

class Pulsechart extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (this.props.period === nextProps.period) return
    refetchs(nextProps)
  }
  render() {
    const { data } = this.props
    const history = data.me ? data.me.healthCareTeams[0].patient.bloodPressureMeasurements : []
    console.log(history)
    const dataPulseArr = []
    let max = 0
    let min = 100
    if (Array.isArray(history)) {
      history.forEach((element) => {
        if (element.heartRate > max) {
          max = element.heartRate
        }
        if (element.heartRate < min) {
          min = element.heartRate
        }
        dataPulseArr.push(element.heartRate)
      })
    }
    const dataGuidesArr = []
    const GuidesVal = 75
    for (let GuidesNum = 0; GuidesNum < dataPulseArr.length; GuidesNum += 1) {
      dataGuidesArr.push(GuidesVal)
    }
    function getOption() {
      return {
        legend: {
          data: [],
        },
        toolbox: {
          show: true,
          feature: {
            type: 'line',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        grid: {
          right: '4',
        },
        xAxis: {
          type: 'category',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
            color: 'red',
          },
          boundaryGap: false,
          data: [],
        },
        yAxis: {
          type: 'value',
          min(value) {
            return Math.round((value.min - 20) / 10) * 10
          },
          max(value) {
            return value.max <= 75 ? 75 : value.max + 20
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
            width: 30,
          },
          minInterval: 5,
          maxInterval: 20,
        },
        series: [
          {
            type: 'line',
            lineStyle: {
              normal: {
                color: '#8f0f1f',
                width: '1',
              },
            },
            itemStyle: {
              normal: {
                color: '#8f0f1f',
                width: '1',
              },
            },
            data: dataPulseArr.reverse(),
          },
          {
            type: 'line',
            symbol: 'none',
            lineStyle: {
              normal: {
                color: '#00bab1',
                width: '1',
              },
            },
            data: dataGuidesArr,
          },
        ],
      }
    }
    return (
      <div>
        <Musk>
          <ReactEcharts
            option={getOption()}
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '250px',
              width: '100%',
              position: 'absolute',
              left: '0',
              top: '-54',
            }}
            className="react_for_echarts"
          />
        </Musk>
      </div>
    )
  }
}
export const Musk = styled.div`
  height: 163px;
  position: relative;
`
Pulsechart.propTypes = {
  data: PropTypes.object.isRequired,
  period: PropTypes.string.isRequired,
}
export default connect(mapStateToProps, {})(
  graphql(queryhistory, queryVariables)(withLoading(Pulsechart)),
)
