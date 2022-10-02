import React, { PropTypes } from 'react'
import { Form, Button, Row, Input, Avatar } from 'antd'
import get from 'lodash/get'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'

import { FooterContainer, BtnMarginLeft,
  StyledForm, StyledCol, StyledRightCol } from './styled-components'
import DoctorSrc from '../../common/images/icon-doctor.png'
import { IRaidoGroup } from '../../common/components'
import HealthCareTeam from '../containers/HealthCareTeam'
import {
  role as roleInfo,
  department as departmentInfo,
  inputFields,
  roleMaps,
  departmentMaps,
  doctorList,
} from '../constants'
import { updateHealthCareProfessional } from '../actions/updateHealthCareProfessional'

const FormItem = Form.Item

const UpdateHealthCareProfessional = (props) => {
  const { closeModal, healthCareProfessional = {},
    form: { getFieldDecorator, setFieldsValue, getFieldValue },
  } = props
  const defaultFunc = { getFieldDecorator, setFieldsValue, getFieldValue }
  const { department, healthCareTeamId, role } = healthCareProfessional
  const initDepartment = get(find(departmentMaps, o => o.label === department), 'value', '')
  const initRole = get(find(roleMaps, o => o.label === role), 'value', '')
  return (<div>
    <StyledForm>
      <Row gutter={5}>
        <StyledCol span={5}>
          <Avatar size="large" src={DoctorSrc} />
        </StyledCol>
        <StyledRightCol span={19}>
          {
            inputFields.map((inputField) => {
              const { label, formItemLayout,
                property, rules, prefix,
              } = inputField
              return (<FormItem
                label={label}
                {...formItemLayout}
              >
                {
                  getFieldDecorator(property, {
                    rules,
                    initialValue: healthCareProfessional[property] || '' })(
                      <Input placeholder="请输入" prefix={prefix} />,
                  )
                }
              </FormItem>)
            })
          }
          <IRaidoGroup
            info={roleInfo}
            {...defaultFunc}
            initialValue={initRole}
            handleChange={(e) => {
              if (doctorList.includes(e.target.value) &&
                getFieldValue('healthCareTeamId')) {
                setFieldsValue({
                  healthCareTeamId: '',
                })
              }
            }}
            isDisabled={!isEmpty(healthCareProfessional)}
          />
          <IRaidoGroup
            info={departmentInfo}
            {...defaultFunc}
            initialValue={initDepartment}
          />
          <HealthCareTeam
            {...defaultFunc}
            initialValue={healthCareTeamId}
            isDisabled={!isEmpty(healthCareProfessional)}
          />
        </StyledRightCol>
      </Row>
      <FooterContainer>
        <Button onClick={closeModal}>取消</Button>
        <BtnMarginLeft
          type="primary"
          icon="save"
          onClick={() => updateHealthCareProfessional(props)}
        >保存</BtnMarginLeft>
      </FooterContainer>
    </StyledForm>
  </div>)
}

UpdateHealthCareProfessional.propTypes = {
  closeModal: PropTypes.func,
  form: PropTypes.object,
  healthCareProfessional: PropTypes.object,
}

const WrappedNormalEditModal = Form.create()(UpdateHealthCareProfessional)

export default WrappedNormalEditModal
