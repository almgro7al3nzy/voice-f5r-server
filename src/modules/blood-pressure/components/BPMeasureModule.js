import React, { PropTypes } from 'react'
import get from 'lodash/get'
import {
  StyledCard,
} from './styled-components'
import MeasureModule from './MeasureModule'
import { BPMeasureModuleHeader } from './BPMeasureModuleHeader'
import { queryBPMeasureModule, pickDayMeasureModule } from '../actions'
import { DEFAULT_MEASURE_MODULE } from '../constants'

class BPMeasureModule extends React.Component {
  static propTypes = {
    updateBPMeasureModule: PropTypes.func,
    addBPMeasureModule: PropTypes.func,
  }
  state = {
    isEditing: false,
    editMeasureModule: DEFAULT_MEASURE_MODULE,
  }
  handleCheckBtn = (value, rowKey, colKey) => {
    const bpMeasureModule = get(this.props, 'data.patient.bpMeasureModule') || {}
    const setObj = {
      editMeasureModule: {
        ...this.state.editMeasureModule,
        [rowKey]: {
          ...this.state.editMeasureModule[rowKey],
          [colKey]: value,
        },
      },
    }
    if (!this.state.isEditing) {
      setObj.isEditing = true
      setObj.editMeasureModule = {
        ...bpMeasureModule,
        [rowKey]: {
          ...bpMeasureModule[rowKey],
          [colKey]: value,
        },
      }
    }
    this.setState(setObj)
  }
  handleCancelBtn = () => {
    this.setState({
      isEditing: false,
      editMeasureModule: DEFAULT_MEASURE_MODULE,
    })
  }
  handleSaveBtn = () => {
    const bpMeasureModule = get(this.props, 'data.patient.bpMeasureModule') || {}
    const patientId = get(this.props, 'data.patient._id')
    const { updateBPMeasureModule, addBPMeasureModule } = this.props
    let mutate = addBPMeasureModule
    const options = {
      variables: {
        patientId,
        batchBPMeasureModuleInput: this.state.editMeasureModule,
      },
      refetchQueries: [{
        query: queryBPMeasureModule,
        variables: {
          patientId,
        },
      }],
    }
    if (bpMeasureModule._id) {
      const batchBPMeasureModuleInput = pickDayMeasureModule(this.state.editMeasureModule)
      mutate = updateBPMeasureModule
      options.variables = {
        _id: bpMeasureModule._id,
        batchBPMeasureModuleInput,
      }
    }
    mutate(options)
    this.handleCancelBtn()
  }
  render() {
    const bpMeasureModule = get(this.props, 'data.patient.bpMeasureModule') || {}
    const defaultProps = {
      measureModule: bpMeasureModule,
      handleCheckBtn: this.handleCheckBtn,
    }
    if (this.state.isEditing) {
      defaultProps.measureModule = this.state.editMeasureModule
    }
    const isCheck = get(this.props, 'queryCheckOfachive.patient.boundDetails.archivedManagement')
    return (
      <StyledCard
        isEditing={this.state.isEditing}
        title={BPMeasureModuleHeader({
          isEditing: this.state.isEditing,
          handleCancelBtn: this.handleCancelBtn,
          handleSaveBtn: this.handleSaveBtn,
        })}
        bordered
        className="mockCardMargin"
      >
        <MeasureModule {...defaultProps} isCheck={isCheck} />
      </StyledCard>)
  }
}

export default BPMeasureModule
