import React, { PropTypes } from 'react'
import { Input, Button, Form } from 'antd'
import styled from 'styled-components'

let tmpValue = ''
const FormItem = Form.Item
const { TextArea } = Input

const addBPDescrible = (props) => {
  const { patiientInfo, checkOutArray, row, clearTheArray } = props
  const { queryBPHistory } = patiientInfo
  const patientId = patiientInfo.patientId
  const mutate = patiientInfo.mutationAddTheBPDescrible
  if (checkOutArray.length <= 0) {
    checkOutArray.push(row.bpId)
  }
  props.form.validateFields((err) => {
    if (err) return
    if (tmpValue.length < 131) {
      mutate({
        variables: {
          patientId,
          _id: checkOutArray,
          describleContent: tmpValue,
        },
      })
        .then(() => {
          queryBPHistory.refetch()
          checkOutArray.splice(0, checkOutArray.length)
          clearTheArray()
          patiientInfo.closeModal()
        })
    }
  })
}
const onChange = (e) => {
  tmpValue = e.target.value
}
const OverBPOptionBtn = (props) => {
  const { row } = props
  return (
    <div>
      <Form>
        <FormItem>
          {props.form.getFieldDecorator('describleContent', {
            rules: [{
              required: true,
              message: '需要填写处理意见',
            }, {
              validator: (rule, value, callback) => {
                if (value && value.length < 131) {
                  callback()
                } else {
                  callback('请输入130字以内')
                }
              },
            },
            ],
            initialValue: row.describle ? row.describle : '',
          })(
            <TextArea placeholder="请至少输入5个字符" onChange={onChange} />,
          )}
        </FormItem>
      </Form>
      <FooterContainer>
        <Button onClick={props.patiientInfo.closeModal}>取消</Button>
        <BtnMarginLeft type="primary" onClick={() => addBPDescrible(props)} >保存</BtnMarginLeft>
      </FooterContainer>
    </div>
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
const WrappedRegistrationForm = Form.create()(OverBPOptionBtn)
OverBPOptionBtn.propTypes = {
  form: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  patiientInfo: PropTypes.func.isRequired,
  row: PropTypes.func.isRequired,
}

export default WrappedRegistrationForm
