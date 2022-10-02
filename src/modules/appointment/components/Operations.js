import React, { PropTypes } from 'react'
import { Button, DatePicker } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
import './operations.less'

export default class Operations extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func,
    defaultValue: PropTypes.string,
  }
  state = {
    isOpen: false,
  }
  handleBtnClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
  handleOpenChange = (status) => {
    if (!status) {
      this.setState({ isOpen: status })
    }
  }
  render() {
    const { isOpen } = this.state
    const { defaultValue, handleChange } = this.props
    return (<div>
      <div className="i-operations-switch">
        <Button
          type="primary"
          onClick={this.handleBtnClick}
        >改期</Button>
        <DatePicker
          open={isOpen}
          showToday={false}
          defaultValue={moment(defaultValue)}
          onOpenChange={this.handleOpenChange}
          onChange={handleChange}
        />
      </div>
    </div>)
  }
}
