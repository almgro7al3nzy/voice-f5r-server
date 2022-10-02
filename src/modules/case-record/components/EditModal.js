import React, { PropTypes } from 'react'
import { Form, Button, Input, Icon, Checkbox, InputNumber, Select, DatePicker } from 'antd'
import styled from 'styled-components'
import shortid from 'shortid'
import Moment from 'moment'
import _ from 'lodash'
import { RowItem, RowItemLabel, StyledEditModal } from './styled-components'
import { createCaseRecord } from '../actions'
import MedicineItem from './MedicineItem'
// import { MedicinesOption } from '../constants'

const FormItem = Form.Item
const { TextArea } = Input
const Option = Select.Option

const defaultMedicines = []
const curDate = new Moment().format('YYYY-MM-DD')
class EditModal extends React.Component {
  constructor(props) {
    super(props)
    // 编辑病历
    if (this.props.activeTab && this.props.activeTab._id) {
      // This is a edit popup
      const medicineSelections = []
      let previousMedicines = []
      const medicines = _.find(this.props.caseRecord, c => c._id === this.props.activeTab._id)
        .prescription.medicines
      medicines.filter(m => m.status !== 'stop').forEach((item) => {
        const medicineSelection = {
          name: item.name,
          dosage: item.dosage,
          usage: item.usage,
          id: shortid.generate(),
        }
        medicineSelection.selection = [item.name, item.dosage, item.usage]
        medicineSelections.push(medicineSelection)
      })

      const indexOfPreviousMedicine =
        _.indexOf(
          this.props.caseRecord,
          _.find(this.props.caseRecord, c => c._id === this.props.activeTab._id),
        ) + 1
      // 判断编辑的这条数据是不是第一次门诊
      let isFirstTimeAddMedicines
      if (this.props.caseRecord.length === indexOfPreviousMedicine) {
        previousMedicines = []
        isFirstTimeAddMedicines = true
      } else {
        previousMedicines = this.props.caseRecord[
          indexOfPreviousMedicine
        ].prescription.medicines.filter(m => m.status !== 'stop')
        isFirstTimeAddMedicines = false
      }
      if (medicineSelections.length !== 0) {
        this.state = {
          previousMedicines,
          medicines: medicineSelections,
          disableMedicines: false,
          isFirstTimeAddMedicines,
        }
      } else {
        this.state = {
          previousMedicines,
          medicines: medicineSelections,
          disableMedicines: true,
          isFirstTimeAddMedicines,
        }
      }
    } else {
      // 新病历
      const medicineSelections = []
      let isFirstTimeAddMedicines
      if (this.props.activeTab) {
        isFirstTimeAddMedicines = false
        this.props.activeTab.filter(m => m.status !== 'stop').forEach((item) => {
          const medicineSelection = {
            name: item.name,
            dosage: item.dosage,
            usage: item.usage,
            id: shortid.generate(),
          }
          medicineSelection.selection = [item.name, item.dosage, item.usage]
          medicineSelections.push(medicineSelection)
        })
      } else {
        isFirstTimeAddMedicines = true
      }
      if (medicineSelections.length !== 0) {
        this.state = {
          previousMedicines: medicineSelections,
          medicines: medicineSelections,
          disableMedicines: false,
          isFirstTimeAddMedicines,
        }
      } else {
        this.state = {
          previousMedicines: medicineSelections,
          medicines: medicineSelections,
          disableMedicines: true,
          isFirstTimeAddMedicines,
        }
      }
    }
  }

  componentDidMount() {
    console.log(this.state.medicines, '药药，切割闹~~~')
    this.props.form.setFieldsValue({
      caseRecordDate: `${curDate}T00:00:00.000Z`,
    })
  }
  onDisableMedicine = (e) => {
    const isChecked = e.target.checked
    if (isChecked) {
      console.log('isChecked')
      this.setState({
        medicines: [],
        disableMedicines: true,
      })
    } else {
      console.log('!isChecked')
      this.setState({
        medicines: defaultMedicines,
        disableMedicines: false,
      })
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
  disabledDate = current => current && Moment(current) < Moment()
  disalbeDate = (current) => {
    // 已经存在的病历
    let existRecords = [...this.props.content]
    existRecords = existRecords.map(e => new Moment(e.caseRecordDate))
    // console.log(existRecords)
    // console.log(current)

    return existRecords.some(element => element.isSame(current, 'day'))
    // existRecords.forEach(e=>{
    //   return e.valueOf()
    // })
  }

  disableStatus = () => {
    console.log('disableMedicineStatus', this.state.medicines)
    return false
  }

  changeMedicines = (meds) => {
    this.setState({
      medicines: meds,
      disableMedicines: false,
    })
  }

  addMedicineItem = () => {
    const temp = [...this.state.medicines]
    temp.push({
      id: shortid.generate(),
      selection: [],
      name: '',
      dosage: '',
      usage: '',
    })
    this.setState({
      medicines: temp,
    })
  }
  saveClick = (saving) => {
    this.setState({
      saving,
    })
  }
  handlePhysicalExamination = (physicalExamination) => {
    const stringArray = []
    stringArray.push(
      `查体时间：${Moment(physicalExamination.physicalExaminationTime, 'YYYY-MM-DD').format(
        'YYYY-MM-DD',
      )}`,
    )
    stringArray.push(`身高：${physicalExamination.height} cm`)
    stringArray.push(`体重：${physicalExamination.weight} kg`)
    stringArray.push(`BMI：${this.getBMI(physicalExamination.height, physicalExamination.weight)}`)
    stringArray.push(
      `诊室血压坐位左臂：${physicalExamination.sitLeftBloodPressure.systolic}/${
        physicalExamination.sitLeftBloodPressure.diastolic
      }/${physicalExamination.sitLeftBloodPressure.pulse} `,
    )
    stringArray.push(
      `诊室血压坐位右臂：${physicalExamination.sitRightBloodPressure.systolic}/${
        physicalExamination.sitRightBloodPressure.diastolic
      }/${physicalExamination.sitRightBloodPressure.pulse} `,
    )
    if (physicalExamination.stationLeftBloodPressure) {
      stringArray.push(
        `诊室血压站位左臂：${physicalExamination.stationLeftBloodPressure.systolic}/${
          physicalExamination.stationLeftBloodPressure.diastolic
        }/${physicalExamination.stationLeftBloodPressure.pulse} `,
      )
    }
    if (physicalExamination.stationRightBloodPressure) {
      stringArray.push(
        `诊室血压站位右臂：${physicalExamination.stationRightBloodPressure.systolic}/${
          physicalExamination.stationRightBloodPressure.diastolic
        }/${physicalExamination.stationRightBloodPressure.pulse} `,
      )
    }
    stringArray.push(`腰围：${physicalExamination.waistline} cm`)
    stringArray.push(`臀围：${physicalExamination.hipline} cm`)
    stringArray.push(
      `腰臀比：${this.getWaistHipRatio(
        physicalExamination.waistline,
        physicalExamination.hipline,
      )}`,
    )
    return stringArray
  }
  /* eslint-disable */
  render() {
    const { getFieldDecorator, setFieldsValue } = this.props.form
    const { activeTab } = this.props
    const { caseRecord } = this.props
    const { queryPhysicalExaminations, queryGetBPPatientInfo } = this.props
    const boundDetails = queryGetBPPatientInfo.patient
      ? queryGetBPPatientInfo.patient.boundDetails
      : {}
    let heigh = []
    let low = []
    if (boundDetails) {
      heigh = boundDetails.safeRangeSystolicBloodPressure
      low = boundDetails.safeRangeDiastolicBloodPressure
    }
    let initPhysicalExaminationValue = ''
    if (queryPhysicalExaminations.physicalExaminationsForPatient) {
      const physicalExaminat = queryPhysicalExaminations.physicalExaminationsForPatient[0]
      if (physicalExaminat) {
        if (Moment().diff(Moment(physicalExaminat.physicalExaminationTime), 'days') <= 7) {
          initPhysicalExaminationValue = this.handlePhysicalExamination(physicalExaminat).join(';')
        }
      }
    }
    const currentNewest =
      activeTab && activeTab._id ? _.find(caseRecord, c => c._id === activeTab._id) : undefined
    const propsDate = currentNewest ? currentNewest.reviewTime : ''
    const tempDate = currentNewest ? currentNewest.createdAt : ''
    const upDate = activeTab && activeTab._id ? Moment(tempDate).format('YYYY-MM-DD') : null
    return (
      <StyledEditModal>
        <Form>
          <RowItem isInline>
            <RowItemLabel>病历时间：</RowItemLabel>
            <FormItem>
              {getFieldDecorator('caseRecordDate', {
                rules: [{ required: true, message: '请填写病历日期' }],
                initialValue:
                  activeTab && activeTab._id ? new Moment(currentNewest.caseRecordDate) : '', // new Moment(),
              })(<span fontSize={16}>{upDate ? upDate : curDate}</span>)}
            </FormItem>
          </RowItem>
          <RowItem isInline>
            <RowItemLabel>主诉：</RowItemLabel>
            <FormItem>
              {getFieldDecorator('patientDesc.description', {
                rules: [{ required: true, message: '请填写主诉内容' }],
                initialValue:
                  activeTab && activeTab._id ? currentNewest.patientDesc.description : '',
              })(<TextArea rows={3} style={{ width: '490px' }} placeholder="请填写主诉内容" />)}
            </FormItem>
          </RowItem>
          <RowItem isInline>
            <RowItemLabel>查体：</RowItemLabel>
            <FormItem>
              {getFieldDecorator('bodyCheckup.description', {
                rules: [{ required: true, message: '请填写查体结果' }],
                initialValue:
                  activeTab && activeTab._id
                    ? currentNewest.bodyCheckup.description
                    : initPhysicalExaminationValue,
              })(<TextArea rows={3} style={{ width: '490px' }} placeholder="请填写查体结果" />)}
            </FormItem>
          </RowItem>
          <RowItem isInline>
            <RowItemLabel>检验：</RowItemLabel>
            <FormItem>
              {getFieldDecorator('laboratoryTests.description', {
                rules: [{ required: true, message: '请填写检验结果' }],
                initialValue:
                  activeTab && activeTab._id ? currentNewest.laboratoryTests.description : '',
              })(<TextArea rows={3} style={{ width: '490px' }} placeholder="请填写检验结果" />)}
            </FormItem>
          </RowItem>
          <RowItem isInline>
            <RowItemLabel>诊断：</RowItemLabel>
            <FormItem>
              {getFieldDecorator('diagnosis.description', {
                rules: [{ required: true, message: '请填写诊断内容' }],
                initialValue: activeTab && activeTab._id ? currentNewest.diagnosis.description : '',
              })(<TextArea rows={3} style={{ width: '490px' }} placeholder="请填写诊断内容" />)}
            </FormItem>
          </RowItem>
          <RowItem isInline>
            <RowItemLabel>控制目标</RowItemLabel>
            <div style={{ marginTop: '7px', marginLeft: '20px' }}>高压</div>
            <FormItem>
              {getFieldDecorator('targetBP.HighSmall', {
                rules: [{ required: true, message: '请填高压目标' }],
                initialValue: heigh ? heigh.split(',')[0] : '',
              })(
                <InputNumber
                  min={60}
                  max={200}
                  style={{ width: '60px', marginLeft: '10px', marginTop: '2px' }}
                />,
              )}
            </FormItem>
            <div style={{ marginTop: '7px' }}>至</div>
            <FormItem>
              {getFieldDecorator('targetBP.HighLarge', {
                rules: [{ required: true, message: '请填高压目标' }],
                initialValue: heigh ? heigh.split(',')[1] : '',
              })(
                <InputNumber
                  min={60}
                  max={200}
                  style={{ width: '60px', float: 'right', marginLeft: '10px', marginTop: '2px' }}
                />,
              )}
            </FormItem>
            <div style={{ marginTop: '7px', marginLeft: '20px' }}>低压</div>
            <FormItem>
              {getFieldDecorator('targetBP.LowSmall', {
                rules: [{ required: true, message: '请填低压目标' }],
                initialValue: low ? low.split(',')[0] : '',
              })(
                <InputNumber
                  min={40}
                  max={120}
                  style={{ width: '60px', marginLeft: '10px', marginTop: '2px' }}
                />,
              )}
            </FormItem>
            <div style={{ marginTop: '7px' }}>至</div>
            <FormItem>
              {getFieldDecorator('targetBP.LowLarge', {
                rules: [{ required: true, message: '请填低压目标' }],
                initialValue: low ? low.split(',')[1] : '',
              })(
                <InputNumber
                  min={40}
                  max={120}
                  style={{ width: '60px', float: 'right', marginLeft: '10px', marginTop: '2px' }}
                />,
              )}
            </FormItem>
          </RowItem>
          <DashedLine />
          <RowItem isInline>
            <RowItemLabel>处方：</RowItemLabel>
            <FormItem>
              <div>
                {this.state.medicines.map((item, index) => {
                  return (
                    <MedicineItem
                      key={item.id}
                      itemIndex={index}
                      changeEditModalState={this.changeMedicines}
                      allMdcs={this.state.medicines}
                      currMdcs={item}
                      getFieldDecorator={getFieldDecorator}
                    />
                  )
                })}
              </div>
              <Button size="default" onClick={this.addMedicineItem}>
                <Icon type="plus" />添加药物
              </Button>
              <RowItem isInline>
                <Checkbox onChange={this.onDisableMedicine} checked={this.state.disableMedicines}>
                  未服用药物
                </Checkbox>
              </RowItem>
            </FormItem>
          </RowItem>
          <RowItem isInline>
            <RowItemLabel>备注:</RowItemLabel>
            <FormItem>
              {getFieldDecorator('noteMessage.description', {
                rules: [{ required: false, message: '备注' }],
                initialValue:
                  activeTab && activeTab._id && currentNewest.noteMessage
                    ? currentNewest.noteMessage.description
                    : '',
              })(<TextArea rows={3} style={{ width: '490px' }} placeholder="备注" />)}
            </FormItem>
          </RowItem>
          <DashedLine />
          <RowItem isInline>
            <RowItemLabel>下次复诊时间：</RowItemLabel>
            <Select
              placeholder="复诊时间"
              onChange={value => {
                this.setState({ showDateForLabel: value })
                setFieldsValue({
                  reviewTime: Moment(value),
                })
              }}
              style={{ width: '100px' }}
            >
              <Option
                value={Moment()
                  .add(1, 'days')
                  .format('YYYY-MM-DD')}
              >
                一天后
              </Option>
              <Option
                value={Moment()
                  .add(2, 'days')
                  .format('YYYY-MM-DD')}
              >
                两天后
              </Option>
              <Option
                value={Moment()
                  .add(3, 'days')
                  .format('YYYY-MM-DD')}
              >
                三天后
              </Option>
              <Option
                value={Moment()
                  .add(4, 'days')
                  .format('YYYY-MM-DD')}
              >
                四天后
              </Option>
              <Option
                value={Moment()
                  .add(5, 'days')
                  .format('YYYY-MM-DD')}
              >
                五天后
              </Option>
              <Option
                value={Moment()
                  .add(6, 'days')
                  .format('YYYY-MM-DD')}
              >
                六天后
              </Option>
              <Option
                value={Moment()
                  .add(1, 'week')
                  .format('YYYY-MM-DD')}
              >
                一周后
              </Option>
              <Option
                value={Moment()
                  .add(2, 'weeks')
                  .format('YYYY-MM-DD')}
              >
                两周后
              </Option>
              <Option
                value={Moment()
                  .add(3, 'weeks')
                  .format('YYYY-MM-DD')}
              >
                三周后
              </Option>
              <Option
                value={Moment()
                  .add(4, 'weeks')
                  .format('YYYY-MM-DD')}
              >
                四周后
              </Option>
              <Option
                value={Moment()
                  .add(5, 'weeks')
                  .format('YYYY-MM-DD')}
              >
                五周后
              </Option>
              <Option
                value={Moment()
                  .add(6, 'weeks')
                  .format('YYYY-MM-DD')}
              >
                六周后
              </Option>
              <Option
                value={Moment()
                  .add(7, 'weeks')
                  .format('YYYY-MM-DD')}
              >
                七周后
              </Option>
              <Option
                value={Moment()
                  .add(8, 'weeks')
                  .format('YYYY-MM-DD')}
              >
                八周后
              </Option>
              <Option
                value={Moment()
                  .add(9, 'weeks')
                  .format('YYYY-MM-DD')}
              >
                九周后
              </Option>
              <Option
                value={Moment()
                  .add(10, 'weeks')
                  .format('YYYY-MM-DD')}
              >
                十周后
              </Option>
              <Option
                value={Moment()
                  .add(11, 'weeks')
                  .format('YYYY-MM-DD')}
              >
                十一周后
              </Option>
              <Option
                value={Moment()
                  .add(12, 'weeks')
                  .format('YYYY-MM-DD')}
              >
                十二周后
              </Option>
              <Option
                value={Moment()
                  .add(13, 'weeks')
                  .format('YYYY-MM-DD')}
              >
                十三周后
              </Option>
            </Select>,
            <FormItem>
              {getFieldDecorator('reviewTime', {
                rules: [
                  {
                    required: true,
                    message: '选择复诊时间',
                  },
                ],
                initialValue:
                  activeTab && activeTab._id && propsDate && propsDate.length > 0
                    ? Moment(propsDate)
                    : Moment(),
              })(
                <DatePicker
                  style={{ width: '230px' }}
                  placeholder="复诊时间"
                  disabledDate={this.disabledDate}
                />,
              )}
            </FormItem>
          </RowItem>
          <FooterContainer>
            <Button onClick={this.props.closeModal}>取消</Button>
            <BtnMarginLeft
              type="primary"
              icon="save"
              disabled={this.state.saving}
              onClick={() => {
                this.saveClick(true)
                createCaseRecord(
                  this.props,
                  this.state.isFirstTimeAddMedicines, // 是否是第一次写病历
                  this.state.previousMedicines,
                  this.state.medicines,
                  activeTab && activeTab._id ? activeTab._id : undefined,
                  this.saveClick,
                )
              }}
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
  form: PropTypes.object,
  caseRecord: PropTypes.array,
  closeModal: PropTypes.func,
  content: PropTypes.array,
  activeTab: PropTypes.object,
  queryPhysicalExaminations: PropTypes.object,
}

const FooterContainer = styled.div`
  padding: 25px 30px 45px;
  text-align: center;
`
export const DashedLine = styled.div`
  border-bottom: 1px dashed #ccc;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  margin: 20px 0;
`
const BtnMarginLeft = styled(Button)`
  margin-left: 8px;
`

const WrappedNormalEditModal = Form.create({
  // onFieldsChange: (props, fieldNames) => {
  //   console.log(props, fieldNames)
  // },
})(EditModal)

export default WrappedNormalEditModal
