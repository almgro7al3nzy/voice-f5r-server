import React, { PropTypes } from 'react'
import { Card, Button } from 'antd'
import get from 'lodash/get'
import moment from 'moment'
import { graphql } from 'react-apollo'
import styled from 'styled-components'

import { queryOverproof } from '../actions/query.js'
import OverproofTable from './OverproofTable.js'


const ButtonGroup = Button.Group
const handleState = (data) => {
  const tableDate = get(data, 'me.healthCareTeams[0].overproofPatients', [])
  let count = 0
  if (tableDate.length) {
    tableDate.map((item) => {
      if (item.state) {
        count += 1
      }
      return true
    })
  }
  return { handled: count, withoutHandle: tableDate.length - count }
}

const BtnCard = styled(Card) `
  height: calc(100vh - 105px);
  overflow-y: scroll;
  .ant-card-head-title {
    width:100%;
  }
`
const ButtonGroupStyle = styled(ButtonGroup) `
  float: right;
`

class BloodPressureOverproof extends React.Component {
  state = {
    ButtonClass: ['selected', 'default', 'default', 'default'],
  }
  render() {
    const { data } = this.props
    const refetchs = (date) => {
      if (date === 'all') {
        this.setState({ ButtonClass: ['default', 'default', 'default', 'selected'] })
        this.props.data.refetch({
          after: moment().subtract(50, 'years'),
        })
      } else if (date === '3days') {
        this.setState({ ButtonClass: ['default', 'selected', 'default', 'default'] })
        this.props.data.refetch({
          after: moment().subtract(2, 'days').startOf('day')._d,
        })
      } else if (date === '7days') {
        this.setState({ ButtonClass: ['default', 'default', 'selected', 'default'] })
        this.props.data.refetch({
          after: moment().subtract(6, 'days').startOf('day')._d,
        })
      } else {
        this.setState({ ButtonClass: ['selected', 'default', 'default', 'default'] })
        this.props.data.refetch({
          after: moment().startOf('day'),
        })
      }
    }
    const handleNums = handleState(data)
    return (
      <div>
        <BtnCard title={
          <div>
            血压异常列表
            <ButtonGroupStyle>
              <Button type="ghost" key="1" className={this.state.ButtonClass[0]} onClick={() => refetchs()}>今天</Button>
              <Button type="ghost" key="2" className={this.state.ButtonClass[1]} onClick={() => refetchs('3days')}>最近3日</Button>
              <Button type="ghost" key="3" className={this.state.ButtonClass[2]} onClick={() => refetchs('7days')}>最近7日</Button>
              <Button type="ghost" key="4" className={this.state.ButtonClass[3]} onClick={() => refetchs('all')}>全部</Button>
            </ButtonGroupStyle>
          </div>
        }
        >
          <span style={{ fontSize: '36px', color: '#b1b1b1' }}>{handleNums.handled}/</span><span style={{ fontSize: '36px', color: '#ff5200' }}>{handleNums.withoutHandle}</span> 已处理／待处理
          <OverproofTable
            {...this.props}
          />
        </BtnCard>
      </div>
    )
  }
}

BloodPressureOverproof.propTypes = {
  data: PropTypes.object.isRequired,
}
export default graphql(queryOverproof, {
  options: () => ({
    variables: {
      after: moment().startOf('day'),
    },
  }),
})(BloodPressureOverproof)
