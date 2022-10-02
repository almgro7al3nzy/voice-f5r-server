import React, { PropTypes } from 'react'
import { Form, Button } from 'antd'
import styled from 'styled-components'
import { StyledEditModal } from '../../medical-history/components/styled-components'

import CheckboxGroup from '../../medical-history/components/CheckboxGroup'
import { questions } from '../constants'
import { addRiskCategory } from '../actions'

const EditModal = (props) => {
  const { queryLatestRiskCategory, closeModal } = props
  const { getFieldDecorator, setFieldsValue, getFieldValue } = props.form
  const defaultFunc = { getFieldDecorator, setFieldsValue, getFieldValue }
  const riskCategory =
    queryLatestRiskCategory.loading || queryLatestRiskCategory.riskCategoriesForPatient[0]
  return (
    <StyledEditModal>
      <Form>
        {questions.map(checkboxItem => (
          <CheckboxGroup
            {...defaultFunc}
            key={checkboxItem.type}
            type={checkboxItem.type}
            initialValue={riskCategory && riskCategory[checkboxItem.type]}
          />
        ))}
        <FooterContainer>
          <Button onClick={closeModal}>取消</Button>
          <BtnMarginLeft
            type="primary"
            icon="save"
            onClick={() => addRiskCategory(riskCategory, props)}
          >
            保存
          </BtnMarginLeft>
        </FooterContainer>
      </Form>
    </StyledEditModal>
  )
}

EditModal.propTypes = {
  form: PropTypes.object,
  queryLatestRiskCategory: PropTypes.object.isRequired,
  closeModal: PropTypes.func,
}

const FooterContainer = styled.div`
  padding: 25px 30px 45px;
  text-align: right;
`
const BtnMarginLeft = styled(Button)`margin-left: 8px;`

const WrappedNormalEditModal = Form.create()(EditModal)

export default WrappedNormalEditModal
