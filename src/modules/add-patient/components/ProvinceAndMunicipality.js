import React, { PropTypes } from 'react'
import { Row, Col, Input, Form } from 'antd'

const FormItem = Form.Item

const formItems = [
  {
    colSpan: 5,
    property: 'permanentPlaceOfRecidence.province',
    rules: [
      {
        required: true,
        message: '需要填写省份',
      },
    ],
  },
  {
    colSpan: 2,
    label: '省',
    isLabel: true,
  },
  {
    colSpan: 5,
    property: 'permanentPlaceOfRecidence.municipality',
    rules: [
      {
        required: true,
        message: '需要填写市区',
      },
    ],
  },
  {
    colSpan: 1,
    label: '市',
    isLabel: true,
  },
]

const ProvinceAndMunicipality = ({ getFieldDecorator }) => (<Row gutter={5}>
  <FormItem
    label="常驻地"
    wrapperCol={{ span: 12 }}
    labelCol={{ span: 5 }}
  >
    <Row gutter={5}>
      {
        formItems.map(formItem => (<Col key={formItem.property} span={formItem.colSpan}>
          {
            formItem.isLabel ? <span>{formItem.label}</span>
              : <FormItem>
                {
                  getFieldDecorator(formItem.property, { rules: formItem.rules })(
                    <Input placeholder={formItem.placeholder} />,
                  )
                }
              </FormItem>
          }
        </Col>
        ))
      }
    </Row>
  </FormItem>
</Row>)

ProvinceAndMunicipality.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
}

export default ProvinceAndMunicipality
