import React, { PropTypes } from 'react'
import { Input, Button, Form } from 'antd'
import styled from 'styled-components'
import { queryPatientArchiveById, queryPatients } from '../actions/profile'

let tmpValue = ''
const FormItem = Form.Item

const addTheFileManager = (props) => {
  const { closeModal, patientId, mutationAddTheFileManger } = props.props
  const mutate = mutationAddTheFileManger
  props.form.validateFields((err) => {
    if (err) return
    if (tmpValue.length < 131) {
      mutate({
        variables: {
          patientId,
          archivedManagement: tmpValue,
        },
        refetchQueries: [{
          query: queryPatientArchiveById,
          variables: {
            patientId,
          },
        },
        {
          query: queryPatients,
          variables: {
            patientId,
          },
        }],
      })
        .then(() => {
          closeModal()
        })
    }
  })
}
const canleClick = (props) => {
  const { closeModal } = props.props
  closeModal()
}
const onChange = (e) => {
  tmpValue = e.target.value
}

const FileAlert = (props) => {
  console.log(props, '98886')
  return (
    <div>
      <span>确认要归档病人，并录入归档原因</span>
      <Form>
        <FormItem>
          {props.form.getFieldDecorator('username', {
            rules: [{
              required: true,
              message: '需要填写备注信息',
            },
            {
              validator: (rule, value, callback) => {
                if (value && value.length < 131) {
                  callback()
                } else {
                  callback('请输入130字以内')
                }
              },
            },
            ],
          })(
            <Input placeholder="归档原因" onChange={onChange} />,
          )}
        </FormItem>
      </Form>
      <FooterContainer>
        <Button onClick={() => canleClick(props)}>取消</Button>
        <BtnMarginLeft type="primary" onClick={() => addTheFileManager(props)} >保存</BtnMarginLeft>
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
const WrappedRegistrationForm = Form.create()(FileAlert)

FileAlert.propTypes = {
  form: PropTypes.object.isRequired,
}
export default WrappedRegistrationForm
