import { Card, Button } from 'antd'
import React from 'react'
import styled from 'styled-components'
import Pulsechart from './Pulsechart.js'

const ButtonGroup = Button.Group

class RightPulseTrendCard extends React.Component {
  state = {
    period: 'default',
    BPButtonClass: ['selected', 'default', 'default', 'default'],
  }
  render() {
    const setPeriod = (period) => {
      if (period === '1month') {
        this.setState({ BPButtonClass: ['default', 'selected', 'default', 'default'] })
      } else if (period === '3month') {
        this.setState({ BPButtonClass: ['default', 'default', 'selected', 'default'] })
      } else if (period === 'all') {
        this.setState({ BPButtonClass: ['default', 'default', 'default', 'selected'] })
      } else {
        this.setState({ BPButtonClass: ['selected', 'default', 'default', 'default'] })
      }
      this.setState({ period })
    }
    return (
      <div>
        <CardStyle
          bordered
          className="mockCardMargin"
          title={
            <div>
              <span style={{ fontSize: '14px' }}>脉搏趋势</span>
              <ButtonGroup style={{ float: 'right' }}>
                <Button
                  type="ghost"
                  key="1"
                  className={this.state.BPButtonClass[0]}
                  onClick={() => setPeriod('default')}
                >
                  7日
                </Button>
                <Button
                  type="ghost"
                  key="2"
                  className={this.state.BPButtonClass[1]}
                  onClick={() => setPeriod('1month')}
                >
                  1个月
                </Button>
                <Button
                  type="ghost"
                  key="3"
                  className={this.state.BPButtonClass[2]}
                  onClick={() => setPeriod('3month')}
                >
                  3个月
                </Button>
                <Button
                  type="ghost"
                  key="4"
                  className={this.state.BPButtonClass[3]}
                  onClick={() => setPeriod('all')}
                >
                  全部
                </Button>
              </ButtonGroup>
            </div>
          }
        >
          {<Pulsechart {...this.props} period={this.state.period} />}
        </CardStyle>
      </div>
    )
  }
}
const CardStyle = styled(Card)`
  .ant-card-head {
    .ant-card-head-title {
      float: none !important;
      width: 100%;
    }
  }
`
export default RightPulseTrendCard
