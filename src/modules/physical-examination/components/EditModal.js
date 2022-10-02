import React, { PropTypes } from 'react'
import { Form, DatePicker, Input, Button } from 'antd'
import get from 'lodash/get'
import moment from 'moment'
import styled from 'styled-components'
import {
  RowItem,
  // StyledInput,
  RowItemLabel,
  StyledEditModal,
} from './styled-components'
import BloodPressure from './BloodPressure'
import { updatePhysicalExamination } from '../actions'
import { isNumber, isBetween } from '../../common/utils'

class EditModal extends React.Component {
  state = { BMI: '---', waistHipRatio: '---' }

  componentWillMount() {
    const { physicalExamination = {} } = this.props
    if (physicalExamination) {
      const BMI = this.getBMI(physicalExamination.height, physicalExamination.weight)
      const waistHipRatio =
        this.getWaistHipRatio(physicalExamination.waistline, physicalExamination.hipline)
      this.setState({ BMI, waistHipRatio })
    }
  }
  getBMI = (height, weight) => {
    if (!height || !weight) {
      return '---'
    }
    return (weight / ((height / 100) * (height / 100))).toFixed(1)
  }
  getWaistHipRatio = (waistline, hipline) => {
    if (!waistline || !hipline) {
      return '---'
    }
    return (waistline / hipline).toFixed(1)
  }
  saveClick = () => {
    this.setState({
      saving: true,
    })
  }
  render() {
    const FormItem = Form.Item
    const { physicalExamination = {}, closeModal, age, lastCreateTime } = this.props
    const handleHeightWeightChange = (getFieldsValue) => {
      const fields = getFieldsValue(['height', 'weight'])
      const BMI = this.getBMI(fields.height, fields.weight)
      this.setState({ BMI })
    }

    const handleHiplineWaistlineChange = (getFieldsValue) => {
      const fields = getFieldsValue(['waistline', 'hipline'])
      const waistHipRatio = this.getWaistHipRatio(fields.waistline, fields.hipline)
      this.setState({ waistHipRatio })
    }

    const validator = (rule, value, callback) => {
      if (value && isNumber(value) && isBetween(value, 1, 500)) {
        callback()
      } else {
        callback('请输入有效的数值')
      }
    }
    const isSameTodayValidator = (getFieldsValue, value, callback) => {
      const compareDays = []
      if (lastCreateTime === 1) {
        callback()
      } else {
        if (lastCreateTime && lastCreateTime.length > 0) {
          lastCreateTime.forEach((item) => {
            compareDays.push((moment(value).startOf('d')).diff(moment(item.physicalExaminationTime).startOf('d'), 'days'))
          })
          if (compareDays.indexOf(0) !== -1) {
            callback('今天创建过查体')
          } else {
            callback()
          }
        }
        callback()
      }
    }
    const { getFieldDecorator, setFieldsValue, getFieldsValue } = this.props.form
    const onPhysicalExaminationTimeChange = (changedDate) => {
      setFieldsValue({
        physicalExaminationTime: `${changedDate.format('YYYY-MM-DD')}T00:00:00.000Z`,
      })
    }
    return (
      <StyledEditModal>
        <Form>
          <RowItem isInline>
            <FormItem>
              {getFieldDecorator('physicalExaminationTime', {
                rules: [isSameTodayValidator],
                initialValue: physicalExamination ?
                  moment(physicalExamination.physicalExaminationTime) : moment(new Date()),
              })(<DatePicker
                style={{ width: '230px' }}
                disabledDate={this.disalbeDate}
                onChange={onPhysicalExaminationTimeChange}
                placeholder="请选择查体日期"
              />)}
            </FormItem>
          </RowItem>
          <RowItem isInline>
            <RowItemLabel>身高：</RowItemLabel>
            <FormItem>
              {getFieldDecorator('height', {
                rules: [validator],
                initialValue: get(physicalExamination, 'height', ''),
              })(<Input style={{ width: '50px' }} onBlur={() => handleHeightWeightChange(getFieldsValue)} />)}

            </FormItem>
            <RowItemLabel style={{ marginLeft: '5px' }}>cm</RowItemLabel>
            <RowItemLabel>体重：</RowItemLabel>
            <FormItem>
              {getFieldDecorator('weight', {
                rules: [validator],
                initialValue: get(physicalExamination, 'weight', ''),
              })(<Input style={{ width: '50px' }} onBlur={() => handleHeightWeightChange(getFieldsValue)} />)}
            </FormItem>
            <RowItemLabel style={{ marginLeft: '5px' }}>kg</RowItemLabel>
            <RowItemLabel>BMI：</RowItemLabel>
            <RowItemLabel>{this.state.BMI}</RowItemLabel>
          </RowItem>
          <RowItem isInline>
            <RowItemLabel>臀围：</RowItemLabel>
            <FormItem>
              {getFieldDecorator('hipline', {
                rules: [validator],
                initialValue: get(physicalExamination, 'hipline', ''),
              })(<Input style={{ width: '50px' }} onBlur={() => handleHiplineWaistlineChange(getFieldsValue)} />)}

            </FormItem>
            <RowItemLabel style={{ marginLeft: '5px' }}>cm</RowItemLabel>
            <RowItemLabel>腰围：</RowItemLabel>
            <FormItem>
              {getFieldDecorator('waistline', {
                rules: [validator],
                initialValue: get(physicalExamination, 'waistline', ''),
              })(<Input style={{ width: '50px' }} onBlur={() => handleHiplineWaistlineChange(getFieldsValue)} />)}
            </FormItem>
            <RowItemLabel style={{ marginLeft: '5px' }}>cm</RowItemLabel>
            <RowItemLabel>腰臀比：</RowItemLabel>
            <RowItemLabel>{this.state.waistHipRatio}</RowItemLabel>
          </RowItem>
          <BloodPressure {...this.props} rootKey="sitLeftBloodPressure" label="坐位左臂血压及脉搏" />
          <BloodPressure {...this.props} rootKey="sitRightBloodPressure" label="坐位右臂血压及脉搏" />
          {(() => (age >= 65 ? (<div><RowItem isInline>
            <RowItemLabel>65岁以上的患者需要测量站位左右臂血压</RowItemLabel>
          </RowItem>
            <BloodPressure {...this.props} rootKey="stationLeftBloodPressure" label="站位左臂血压及脉搏" />
            <BloodPressure {...this.props} rootKey="stationRightBloodPressure" label="站位右臂血压及脉搏" /></div>) : '')
          )()}
          <FooterContainer>
            <Button onClick={closeModal}>取消</Button>
            <BtnMarginLeft
              type="primary"
              icon="save"
              disabled={this.state.saving}
              onClick={() => updatePhysicalExamination(this.props, this.saveClick)}
            >
              保存
            </BtnMarginLeft>
          </FooterContainer>
        </Form>
      </StyledEditModal>
    )
  }

}

EditModal.propTypes = {
  physicalExamination: PropTypes.object,
  closeModal: PropTypes.func,
  form: PropTypes.object,
  age: PropTypes.number,
  lastCreateTime: PropTypes.object,
}

const FooterContainer = styled.div`
padding: 25px 30px 45px;
text-align: center;
`

const BtnMarginLeft = styled(Button) `margin-left: 8px;`

const WrappedNormalEditModal = Form.create({
  // onFieldsChange: (props, fieldNames) => {
  //   console.log(props, fieldNames)
  // },
})(EditModal)

export default WrappedNormalEditModal
