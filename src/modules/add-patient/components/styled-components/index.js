import styled from 'styled-components'
import { Form } from 'antd'

const FormItem = Form.Item

export const StyledFormItem = styled(FormItem)`
  .ant-form-item-label label:before {
    display: inline-block;
    margin-right: 4px;
    content: "*";
    font-family: SimSun;
    line-height: 1;
    font-size: 12px;
    color: #f04134;
  }
`
