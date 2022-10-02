import React, { PropTypes } from 'react'
import { Form, Input, Button } from 'antd'
import styled from 'styled-components'
import { updatePatient } from '../actions'

import './overproof-table.css'

const FormItem = Form.Item

const OverproofHandleAlert = (props) => {
  const { patientInfo, form } = props
  const { getFieldDecorator } = form
  return (
    <Form>
      <FormItem
        id="ResultTextarea"
        type="ResultTextarea"
        label="处理意见"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 17 }}
        className="formLable formDiv"
      >
        {
          getFieldDecorator('ResultTextarea', {
            rules: [{ required: true, message: '意见不能为空' }],
            initialValue: patientInfo.handleResult ? patientInfo.handleResult : '',
          })(
            <Input type="textarea" id="ResultTextarea" placeholder="请输入至少五个字符" rows="4" />,
          )
        }
      </FormItem>
      <FooterContainer>
        <Button onClick={props.closeModal}>取消</Button>
        <BtnMarginLeft type="primary" onClick={() => updatePatient(props)}>保存</BtnMarginLeft>
      </FooterContainer>
    </Form>
  )
}

const FooterContainer = styled.div`
  padding: 20px 30px 0px;
  border-top: 1px solid #e9e9e9;
  text-align: right;
`
const BtnMarginLeft = styled(Button) `
  margin-left: 8px;
`
const WrappedNormalLoginForm = Form.create()(OverproofHandleAlert)

OverproofHandleAlert.propTypes = {
  closeModal: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  patientInfo: PropTypes.object.isRequired,
}

export default WrappedNormalLoginForm
