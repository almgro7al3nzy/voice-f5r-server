import React, { PropTypes } from 'react'
import { Row, Form, Col, Input } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
}

class Address extends React.Component {
  static propTypes = {
    getFieldDecorator: PropTypes.func.isRequired,
    getFieldValue: PropTypes.func.isRequired,
    setFieldsValue: PropTypes.func.isRequired,
    permanentPlaceOfRecidence: PropTypes.object,
  }
  componentDidMount() {
    const { province, municipality, area } = this.props.permanentPlaceOfRecidence
    const prefix = `${province}/${municipality}/${area}`
    if (area) {
      this.props.setFieldsValue({
        'permanentPlaceOfRecidence.prefix': prefix,
      })
    }
  }
  render() {
    const {
      getFieldDecorator, getFieldValue, permanentPlaceOfRecidence,
    } = this.props
    const { addressDetail } = permanentPlaceOfRecidence
    return (<FormItem
      label="详细地址"
      {...formItemLayout}
    >
      <Row gutter={2}>
        <Col
          span={getFieldValue('permanentPlaceOfRecidence.prefix') ? 7 : 0}
        >
          <FormItem>
            {
              getFieldDecorator('permanentPlaceOfRecidence.prefix')(
                <span>{getFieldValue('permanentPlaceOfRecidence.prefix')}</span>,
              )
            }
          </FormItem>
        </Col>
        <Col span={9}>
          <FormItem>
            {
              getFieldDecorator('permanentPlaceOfRecidence.addressDetail', {
                initialValue: addressDetail || '',
              })(
                <Input placeholder="详细地址" />,
              )
            }
          </FormItem>
        </Col>
      </Row>
    </FormItem>)
  }
}

Address.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  getFieldValue: PropTypes.func.isRequired,
  setFieldsValue: PropTypes.func.isRequired,
  permanentPlaceOfRecidence: PropTypes.object,
}

export default Address
