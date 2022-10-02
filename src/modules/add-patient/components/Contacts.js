import React, { PropTypes } from 'react'
import { Row, Col, Input, Select, Form } from 'antd'
import { isNumber } from '../actions'

const FormItem = Form.Item

const Option = Select.Option

const formItems = [
  {
    colSpan: 5,
    property: 'emergencyContact.fullName',
    rules: [
      {
        required: false,
        message: '需要填写姓名',
      },
    ],
    placeholder: '姓名',
  },
  {
    colSpan: 10,
    property: 'emergencyContact.mobile',
    rules: [
      {
        required: false,
        message: '需要填写手机号',
      },
      {
        validator: (rule, value, callback) => {
          if (isNumber(value, 11)) {
            callback()
          } else {
            callback('手机号为11位有效数字')
          }
        },
      },
    ],
    placeholder: '手机号',
  },
]

const Contacts = ({ getFieldDecorator, emergencyContact = {} }) => (
  <FormItem
    label="紧急联系人"
    wrapperCol={{ span: 18 }}
    labelCol={{ span: 5 }}
  >
    <Row gutter={5}>
      {
        formItems.map(formItem => (<Col key={formItem.property} span={formItem.colSpan}>
          <FormItem>
            {
              getFieldDecorator(formItem.property, {
                rules: formItem.rules,
                initialValue: emergencyContact[formItem.property.split('.')[1]] || '',
              })(
                <Input placeholder={formItem.placeholder} />,
              )
            }
          </FormItem>
        </Col>
        ))
      }
      <Col span={9}>
        <FormItem>
          {
            getFieldDecorator('emergencyContact.relationshipToPatient', {
              rules: [
                {
                  required: false,
                  message: '需要填写关系',
                },
              ],
              initialValue: emergencyContact.relationshipToPatient || '',
            })(
              <Select>
                <Option value="SPOUSE">配偶</Option>
                <Option value="CHILD">子女</Option>
                <Option value="SIBLING">兄弟姐妹</Option>
                <Option value="RELATIVES">旁系亲属</Option>
                <Option value="FRIEND">朋友</Option>
              </Select>,
            )
          }
        </FormItem>
      </Col>
    </Row>
  </FormItem>
)

Contacts.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  emergencyContact: PropTypes.object,
}

export default Contacts
