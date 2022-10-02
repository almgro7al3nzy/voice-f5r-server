import React, { PropTypes } from 'react'
import { DatePicker } from 'antd'
import get from 'lodash/get'
import * as moment from 'moment'
import 'moment/locale/zh-cn'
import './calendar.css'

export default class ICalendar extends React.Component {
  static propTypes = {
    dateRender: PropTypes.func,
    orderedAptDays: PropTypes.object,
    history: PropTypes.object,
    highLightColor: PropTypes.string,
    selectedDay: PropTypes.string,
    beforeDateHighLightColor: PropTypes.string,
  }
  state = {
    currentDate: moment(),
  }
  getDateStyle = (currentDate) => {
    const dateList = get(this.props.orderedAptDays,
      'me.healthCareTeams.0.orderedAptDays', [])
    const {
      highLightColor = '#0cc4bb',
      beforeDateHighLightColor = '#BFF0EE',
    } = this.props
    const style = {}
    const currentDay = moment().format('YYYY-MM-DD')
    const tempDay = moment(currentDate).format('YYYY-MM-DD')
    if (dateList.indexOf(tempDay) !== -1) {
      if (tempDay > currentDay) {
        style.background = highLightColor
        style.color = '#ffffff'
      } else if (tempDay < currentDay) {
        style.background = beforeDateHighLightColor
      }
    }
    return style
  }
  dateRender = (currentDate) => {
    const { dateRender } = this.props
    if (typeof dateRender === 'function') {
      return dateRender(currentDate)
    }
    const style = this.getDateStyle(currentDate)
    return (
      <div className="ant-calendar-date" style={style}>
        {currentDate.date()}
      </div>
    )
  }

  handleChange = (date) => {
    const day = moment(date).format('YYYY-MM-DD')
    const { history } = this.props
    history.push(`/appointment/${day}`)
  }

  render() {
    const { selectedDay } = this.props
    return (<div>
      <DatePicker
        locale="zh-cn"
        open
        onChange={this.handleChange}
        dateRender={this.dateRender}
        defaultValue={moment(selectedDay)}
      />
    </div>)
  }
}
