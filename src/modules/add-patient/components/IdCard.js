import React, { PropTypes } from 'react'
import { Form, Input, Row, Col, Select } from 'antd'
import idcard from 'idcard'


const FormItem = Form.Item
const Option = Select.Option
let tempSelect = ''
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
}

const handleInputOnBlur = (e, setFieldsValue) => {
  if (tempSelect === 'IDCARD') {
    const value = e.target.value
    console.log(value)
    console.log(e.validator)
    const year = value.substring(6, 10)
    const month = value.substring(10, 12)
    const day = value.substring(12, 14)
    setFieldsValue({
      'dateOfBirth.year': year,
    })
    setFieldsValue({
      'dateOfBirth.month': month,
    })
    setFieldsValue({
      'dateOfBirth.day': day,
    })
    console.log(`This patient BirthDay is ${year}-${month}-${day}`)
  }
}

const IdCard = ({ getFieldDecorator, setFieldsValue, getFieldValue, identityInfo = {} }) =>
  (<FormItem
    label="证件"
    {...formItemLayout}
  >
    <Row gutter={5}>
      {
        <Col span={9}>
          <FormItem>
            {
              getFieldDecorator('identityInfo.identityType', {
                rules: [
                  {
                    required: false,
                    message: '选择证件类型',
                  },
                ],
                initialValue: identityInfo ? identityInfo.identityType : '',
              })(
                <Select>
                  <Option value="IDCARD">身份证</Option>
                  <Option value="PASSPORT">护照</Option>
                  <Option value="HKCARD">港澳台证件</Option>
                </Select>,
              )
            }
          </FormItem>
        </Col>
      }
      <Col span={13}>
        <FormItem>
          {
            getFieldDecorator('identityInfo.IDNumber', {
              rules: [
                {
                  required: false,
                  message: '需要填写证件号',
                },
                {
                  validator: (rule, value, callback) => {
                    tempSelect = getFieldValue('identityInfo.identityType')
                    if (tempSelect === 'IDCARD') {
                      if (value && value.length === 18) {
                        if (!idcard.verify(value.toUpperCase())) {
                          callback('身份证信息有误，请在检查')
                        } else {
                          callback()
                        }
                      } else if (!value) {
                        callback()
                      } else {
                        callback('请输入18位有效的身份证')
                      }
                    } else {
                      callback()
                    }
                  },
                },
              ],
              initialValue: identityInfo ? identityInfo.IDNumber : '',
            })(
              <Input onBlur={e => handleInputOnBlur(e, setFieldsValue)} />,
            )
          }
        </FormItem>
      </Col>
    </Row>
  </FormItem>)

IdCard.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  setFieldsValue: PropTypes.func.isRequired,
  getFieldValue: PropTypes.func.isRequired,
  identityInfo: PropTypes.string,
}

export default IdCard
