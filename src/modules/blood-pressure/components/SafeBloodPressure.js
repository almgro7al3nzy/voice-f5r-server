import { InputNumber, Slider, Button, Card } from 'antd'
import isNaN from 'lodash/isNaN'
import isArray from 'lodash/isArray'
import React, { PropTypes } from 'react'
import get from 'lodash/get'

import styled from 'styled-components'
import { updatePatient } from '../actions'

class SafeBloodPressure extends React.Component {
  state = {
    Systolic: [80, 160],
    Diastolic: [60, 110],
    isEditing: false,
  }
  componentWillReceiveProps(nextProps) {
    const { queryBPHistory } = nextProps
    const boundDetails = queryBPHistory.me ?
      queryBPHistory.me.healthCareTeams[0].patientHistoryForBD.PatientInfo.boundDetails : {}
    if (boundDetails) {
      const heigh = boundDetails.safeRangeSystolicBloodPressure
      const low = boundDetails.safeRangeDiastolicBloodPressure
      if (heigh && heigh !== this.state.Systolic.join(',')) {
        const systolic = heigh.split(',')
        this.setStateValue([Number(systolic[0]), Number(systolic[1])], 'systolic')
      }
      if (low && low !== this.state.Diastolic.join(',')) {
        const diastolic = low.split(',')
        this.setStateValue([Number(diastolic[0]), Number(diastolic[1])], 'diastolic')
      }
    }
  }
  onChange = (value, buttontype, IsSystolic) => {
    if (!isArray(value) && isNaN(+value)) return
    this.setState({ isEditing: true })
    let changeValue = []
    if (buttontype === 'LowNums') {
      changeValue = IsSystolic ?
        [value, this.state.Systolic[1]] : [value, this.state.Diastolic[1]]
    } else if (buttontype === 'HeighNums') {
      changeValue = IsSystolic ?
        [this.state.Systolic[0], value] : [this.state.Diastolic[0], value]
    } else {
      changeValue = value
    }
    if (IsSystolic) {
      this.setStateValue([Number(changeValue[0]), Number(changeValue[1])], 'systolic')
    } else {
      this.setStateValue([Number(changeValue[0]), Number(changeValue[1])], 'diastolic')
    }
  }
  setStateValue = (value, type) => {
    if (type === 'systolic') {
      this.setState({
        Systolic: value,
      })
    } else if (type === 'diastolic') {
      this.setState({
        Diastolic: value,
      })
    }
  }

  cancelClicked = (heigh, low) => {
    this.setState({ isEditing: false })
    if (heigh && low) {
      this.setStateValue([heigh.split(',')[0], heigh.split(',')[1]], 'systolic')
      this.setStateValue([low.split(',')[0], low.split(',')[1]], 'diastolic')
    }
  }
  render() {
    const { activedPatient, updateSafeRange, queryBPHistory,
    } = this.props
    const isSlider = get(this.props, 'queryBPOfachive.patient.boundDetails.archivedManagement')
    const boundDetails = queryBPHistory.me ?
      queryBPHistory.me.healthCareTeams[0].patientHistoryForBD.PatientInfo.boundDetails : {}
    let heigh = []
    let low = []
    if (boundDetails) {
      heigh = boundDetails.safeRangeSystolicBloodPressure
      low = boundDetails.safeRangeDiastolicBloodPressure
    }

    const saveClicked = () => {
      updatePatient(updateSafeRange, this.state.Systolic,
        this.state.Diastolic, activedPatient.patientId)
      this.setState({ isEditing: false })
    }

    return (
      <StyledCard
        bordered
        isEditing={this.state.isEditing}
        className="mockCardMargin"
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '14px' }}>血压安全范围定义</div>
            {
              this.state.isEditing && <div> <Button
                onClick={() => this.cancelClicked(heigh, low)}
              >取消</Button>
                <Button
                  style={{ marginLeft: 10 }}
                  icon="save"
                  type="primary"
                  onClick={() => saveClicked()}
                >保存</Button></div>
            }
          </div>
        }
      >
        <div style={{ marginRight: '16px' }}>
          <SetNumDiv>
            <InputNumber
              min={60}
              max={200}
              style={{ width: '60px', marginLeft: '16px' }}
              value={this.state.Systolic[0]}
              onChange={value => this.onChange(value, 'LowNums', true)}
              disabled={isSlider}
            />
            <div>设定高压范围</div>
            <InputNumber
              min={60}
              max={200}
              style={{ width: '60px', float: 'right', marginLeft: '16px' }}
              value={this.state.Systolic[1]}
              onChange={value => this.onChange(value, 'HeighNums', true)}
              disabled={isSlider}
            />
          </SetNumDiv>
          <div>
            <Slider
              min={60}
              max={200}
              range
              onChange={value => this.onChange(value, 'Slider', true)}
              value={this.state.Systolic}
              disabled={isSlider}
            />
          </div>
          <SetNumDiv>
            <InputNumber
              min={40}
              max={120}
              style={{ width: '60px', marginLeft: '16px' }}
              value={this.state.Diastolic[0]}
              onChange={value => this.onChange(value, 'LowNums', false)}
              disabled={isSlider}
            />
            <span>设定低压范围</span>
            <InputNumber
              min={40}
              max={120}
              style={{ width: '60px', marginLeft: '16px' }}
              value={this.state.Diastolic[1]}
              onChange={value => this.onChange(value, 'HeighNums', false)}
              disabled={isSlider}
            />
          </SetNumDiv>
          <div>
            <Slider
              min={40}
              max={120}
              range
              onChange={value => this.onChange(value, 'Slider', false)}
              value={this.state.Diastolic}
              disabled={isSlider}
            />
          </div>
        </div>
      </StyledCard>
    )
  }
}

const StyledCard = styled(Card) `
background: ${p => p.isEditing ? '#fffdf6' : '#fff'} !important;
.ant-card-head {
  background: ${p => p.isEditing ? '#fffdf6' : '#fff'} !important;
  .ant-card-head-title {
    width: 100%;
  }
}
`
const SetNumDiv = styled.div`
  color: #535353;
  display: flex;
  justify-content: space-between;
`
SafeBloodPressure.propTypes = {
  activedPatient: PropTypes.object.isRequired,
  queryBPHistory: PropTypes.object.isRequired,
  updateSafeRange: PropTypes.func.isRequired,
}
export default SafeBloodPressure
