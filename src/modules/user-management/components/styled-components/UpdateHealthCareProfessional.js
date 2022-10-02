import styled from 'styled-components'
import { Button, Form, Col } from 'antd'

export const FooterContainer = styled.div`
  padding: 25px 30px 10px;
  border-top: 1px solid #e9e9e9;
  text-align: right;
`
export const BtnMarginLeft = styled(Button)`
  margin-left: 8px;
`
export const StyledForm = styled(Form)`
  .ant-form-item-label label {
    color: #000000;
    font-family: PingFangSC-Semibold;
  }
`
export const StyledCol = styled(Col)`
  margin-top: 20px;
  text-align: center;
  padding-left: 20px;
`
export const StyledRightCol = styled(Col)`
  margin: 10px 0px;
`
export const StyledGutter = styled.span`
  display: inline-block;
  margin: 0 5px;
`
