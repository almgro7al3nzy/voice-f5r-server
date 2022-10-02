import React, { PropTypes } from 'react'
import { Card, Button } from 'antd'
import styled from 'styled-components'

import ShowHistoryTable from './ShowHistoryTable.js'

const ButtonGroup = Button.Group


class LeftMeasurementHistoryTable extends React.Component {
  state = {
    BPButtonClass: ['default', 'default', 'default', 'selected'],
  }
  render() {
    const { patientId, queryBPHistory } = this.props
    const refetchs = (data, period) => {
      if (period === 'all') {
        this.setState({ BPButtonClass: ['default', 'default', 'default', 'selected'] })
        data.refetch({
          id: patientId,
          after: 'all',
        })
      } else if (period === '1month') {
        this.setState({ BPButtonClass: ['default', 'selected', 'default', 'default'] })
        data.refetch({
          id: patientId,
          after: '1month',
        })
      } else if (period === '3months') {
        this.setState({ BPButtonClass: ['default', 'default', 'selected', 'default'] })
        data.refetch({
          id: patientId,
          after: '3months',
        })
      } else {
        this.setState({ BPButtonClass: ['selected', 'default', 'default', 'default'] })
        data.refetch({
          id: patientId,
          after: 'default',
        })
      }
    }
    return (
      <BtnCard
        bordered
        className="tablecard"
        title={
          <div>
            <span style={{ fontSize: '14px' }}>自测血压及统计</span>
            <ButtonGroup style={{ float: 'right' }}>
              <Button type="ghost" key="1" className={this.state.BPButtonClass[0]} onClick={() => refetchs(queryBPHistory, '7days', patientId)}>
                7日
              </Button>
              <Button type="ghost" key="2" className={this.state.BPButtonClass[1]} onClick={() => refetchs(queryBPHistory, '1month', patientId)}>
                1个月
              </Button>
              <Button type="ghost" key="3" className={this.state.BPButtonClass[2]} onClick={() => refetchs(queryBPHistory, '3months', patientId)}>
                3个月
              </Button>
              <Button type="ghost" key="4" className={this.state.BPButtonClass[3]} onClick={() => refetchs(queryBPHistory, 'all', patientId)}>
                全部
              </Button>
            </ButtonGroup>
          </div>
        }
      >
        <ShowHistoryTable {...this.props} />
      </BtnCard>
    )
  }
}

const BtnCard = styled(Card) `
  .ant-card-head-title {
    width: 100%;
  }
  .ant-card-body {
    width: 100%;
  }
  > .ant-card-body {
    padding: 4px !important;
  }
`
LeftMeasurementHistoryTable.propTypes = {
  patientId: PropTypes.string.isRequired,
  queryBPHistory: PropTypes.object.isRequired,
}
export default LeftMeasurementHistoryTable
