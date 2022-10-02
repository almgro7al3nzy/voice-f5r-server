import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { Form, Row, Button } from 'antd'

import LeftCol from './LeftCol'
import MidCol from './MidCol'
import RightCol from './RightCol'

import { getInfoAndAddPatient } from '../actions'


const AddPatient = props => (<div>
  <StyledForm>
    <Row gutter={20}>
      <LeftCol {...props} />
      <MidCol {...props} />
      <RightCol {...props} />
    </Row>
    <FooterContainer>
      <Button onClick={props.closeModal}>取消</Button>
      <BtnMarginLeft type="primary" icon="save" onClick={() => getInfoAndAddPatient(props)}>保存</BtnMarginLeft>
    </FooterContainer>
  </StyledForm>
</div>)

const FooterContainer = styled.div`
  padding: 25px 30px 10px;
  border-top: 1px solid #e9e9e9;
  text-align: right;
`
const BtnMarginLeft = styled(Button)`
  margin-left: 8px;
`
const StyledForm = styled(Form)`
  .ant-form-item-label label {
    color: #000000;
    font-family: PingFangSC-Semibold;
  }
`

const WrappedNormalLoginForm = Form.create()(AddPatient)

AddPatient.propTypes = {
  closeModal: PropTypes.func.isRequired,
}

export default WrappedNormalLoginForm
