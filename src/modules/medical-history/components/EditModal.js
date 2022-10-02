import React, { PropTypes } from 'react'
import { Form, Button, Checkbox } from 'antd'
import get from 'lodash/get'
import styled from 'styled-components'
import {
  otherMedicalHistory,
  allergyHistory,
  riskLevelMap,
  hypertensionLevelMap,
} from '../constants'
import {
  RowItem,
  StyledInput,
  StyledEditModal,
  StyledConclusion,
  OrderNumberLabel,
} from './styled-components'

import CourseOfHypertension from './CourseOfHypertension'
import HighestBloodPressureInClinic from './HighestBloodPressureInClinic'
import CheckboxGroup from './CheckboxGroup'
import FamilyHistory from './FamilyHistory'
import { updateMedicalHistory } from '../actions'
import { getCheckboxConfig, handlecheckChange } from '../actions/editModal'

const FormItem = Form.Item
const isMedicalOptions = otherMedicalHistory.options
const isallergyOptions = allergyHistory.options
const EditModal = (props) => {
  const { medicalHistory = {}, closeModal } = props
  const { getFieldDecorator, setFieldsValue, getFieldValue } = props.form
  const defaultFunc = { getFieldDecorator, setFieldsValue, getFieldValue }

  const medicalOptionOnChange = (e) => {
    const value = e.target.checked
    if (value) {
      setFieldsValue({ otherMedicalHistory: '' })
      setFieldsValue({ [otherMedicalHistory.options.key]: true })
    }
  }
  const allergyOptionOnChange = (e) => {
    const value = e.target.checked
    if (value) {
      setFieldsValue({ allergyHistory: '' })
      setFieldsValue({ [allergyHistory.options.key]: true })
    }
  }
  return (
    <StyledEditModal>
      <Form>
        <CourseOfHypertension
          {...defaultFunc}
          courseOfHypertension={medicalHistory.courseOfHypertension}
        />
        <HighestBloodPressureInClinic {...props} />
        {getCheckboxConfig().map(checkboxItem => (
          <CheckboxGroup
            {...defaultFunc}
            key={checkboxItem.type}
            type={checkboxItem.type}
            initialValue={medicalHistory[checkboxItem.type]}
            onChange={value => handlecheckChange(value, checkboxItem.type, props)}
          />
        ))}
        <RowItem isInline>
          <OrderNumberLabel>{otherMedicalHistory.label}</OrderNumberLabel>
          <FormItem>
            {getFieldDecorator(otherMedicalHistory.key, {
              initialValue: get(medicalHistory, otherMedicalHistory.key, ''),
            })(<StyledInput width={300} />)}
          </FormItem>
          {
            getFieldDecorator(otherMedicalHistory.options.key, {
              initialValue: get(medicalHistory, otherMedicalHistory.options.key) || false,
            })(<Checkbox
              checked={getFieldValue(otherMedicalHistory.options.key) || false}
              style={{ marginLeft: 20, marginTop: 5 }}
              onChange={e => medicalOptionOnChange(e)}
            >
              {isMedicalOptions.label}
            </Checkbox>)
          }
        </RowItem>
        <RowItem isInline>
          <OrderNumberLabel>{allergyHistory.label}</OrderNumberLabel>
          <FormItem>
            {getFieldDecorator(allergyHistory.key, {
              initialValue: get(medicalHistory, allergyHistory.key, ''),
            })(<StyledInput width={300} />)}
          </FormItem>
          {
            getFieldDecorator(allergyHistory.options.key, {
              initialValue: get(medicalHistory, allergyHistory.options.key) || false,
            })(<Checkbox
              checked={getFieldValue(allergyHistory.options.key) || false}
              style={{ marginLeft: 20, marginTop: 5 }}
              onChange={e => allergyOptionOnChange(e)}
            >
              {isallergyOptions.label}
            </Checkbox>)
          }
        </RowItem>
        <FamilyHistory {...defaultFunc} familyHistory={medicalHistory.familyHistory} />
        <StyledConclusion>
          <span fontSize={16}>结论</span>
          <div>
            {getFieldDecorator('hypertensionLevel', {
              initialValue: get(medicalHistory, 'conclusion.hypertensionLevel', ''),
            })(<span>{hypertensionLevelMap[getFieldValue('hypertensionLevel')]} </span>)}
            {getFieldDecorator('riskLevel', {
              initialValue: get(medicalHistory, 'conclusion.riskLevel', ''),
            })(<span>{riskLevelMap[getFieldValue('riskLevel')]}</span>)}
          </div>
        </StyledConclusion>
        <FooterContainer>
          <Button onClick={closeModal}>取消</Button>
          <BtnMarginLeft type="primary" icon="save" onClick={() => updateMedicalHistory(props)}>
            保存
          </BtnMarginLeft>
        </FooterContainer>
      </Form>
    </StyledEditModal>
  )
}

EditModal.propTypes = {
  form: PropTypes.object,
  medicalHistory: PropTypes.object,
  closeModal: PropTypes.func,
}

const FooterContainer = styled.div`
  padding: 25px 30px 45px;
  text-align: right;
`
const BtnMarginLeft = styled(Button) `margin-left: 8px;`

const WrappedNormalEditModal = Form.create()(EditModal)

export default WrappedNormalEditModal
