import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { Col, Form, Avatar, Button, Row } from 'antd'
import get from 'lodash/get'
import InputItem from './InputItem'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 13 },
}

const LeftCol = ({ form, patientInfo = {} }) => {
  const { getFieldDecorator, getFieldValue, setFieldsValue } = form
  const { avatar, fullName } = patientInfo
  const isStarred = get(patientInfo, 'boundDetails.isStarred', false)
  return (<Col span={4}>
    <DivContainer>
      <Row gutter={5}>
        <Col span={14}>
          <FormItem>
            {
              getFieldDecorator('avatar', {
                initialValue: avatar,
              })(<Avatar size="large" src={getFieldValue('avatar')} />)
            }
          </FormItem>
        </Col>
        <ColWithStyle span={7}>
          <FormItem>
            {
              getFieldDecorator('isStarred', {
                initialValue: isStarred,
              })(<IconBtn
                size="large"
                shape="circle"
                onClick={() => {
                  setFieldsValue({
                    isStarred: !getFieldValue('isStarred'),
                  })
                }}
                icon={getFieldValue('isStarred') ? 'star' : 'star-o'}
              />)
            }
          </FormItem>
        </ColWithStyle>
      </Row>
      <InputItem
        formItemLayout={formItemLayout}
        getFieldDecorator={getFieldDecorator}
        type="fullName"
        initialValue={fullName}
      />
    </DivContainer>
  </Col>)
}

const DivContainer = styled.div`
  padding: 20px;
  text-align: center;
`
const ColWithStyle = styled(Col)`
  padding-top: 16px;
`
const IconBtn = styled(Button)`
  border: none !important;
  color: #24C3BA !important;
  &:hover {
    border-color: #0097a7 !important;
    color: #0097a7 !important;
  }
`

LeftCol.propTypes = {
  form: PropTypes.object.isRequired,
  patientInfo: PropTypes.object,
}

export default LeftCol
