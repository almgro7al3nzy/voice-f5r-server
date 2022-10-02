import styled from 'styled-components'
import { Input, Row, Checkbox, Col, Form } from 'antd'

const FormItem = Form.Item

const CheckboxGroup = Checkbox.Group

export const RowItem = styled.div`
  display: ${props => (props.isInline ? 'flex' : 'block')};
  .ant-form-item {
    margin-bottom: 0px;
  }
  margin-bottom: ${props => props.marginBottom || 20}px;
`
export const RowItemLabel = styled.p`
  font-family: PingFangSC-Semibold;
  font-size: ${props => props.fontSize || 12}px;
  font-weight: 600;
  color: ${props => props.color || '#000000'};
  line-height: 32px;
  margin-right: 10px;
`

export const StyledInput = styled(Input)`width: ${props => props.width || 50}px !important;`
export const StyledRow = styled(Row)`
  width: ${props => props.width}px;
  line-height: 32px;
`

export const StyledCheckboxGroup = styled(CheckboxGroup)`
  margin-left: 20px;
  .ant-checkbox-group-item {
    display: block;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #777171;
  }
`
export const StyledEditModal = styled.div`
  overflow-y: auto;
  height: calc(100vh - 104px);
`
export const StyledConclusion = styled.div`
  display: flex;
  border-top: 1px solid #dddddd;
  border-bottom: ${props => (props.noBottom ? 0 : 1)}px solid #dddddd;
  padding: 15px 0px;
  font-size: 16px;
  margin-bottom: 30px;
  line-height: 32px;
`

export const FamilyHistoryRow = styled(Row)`
  border: 1px solid #9b9b9b;
  border-radius: 2px;
  margin: 10px 20px;
`

export const FamilyHistoryCol = styled(Col)`
  border-right: ${props => (props.noRightBorder ? 0 : 1)}px solid #9b9b9b;
  min-height: 355px;
`

export const ColHeader = styled(FormItem)`
  text-align: center;
  border-bottom: 1px solid #9b9b9b;
`
export const ColContent = styled.div`
  padding: 20px 15px;
  .ant-checkbox-group {
    margin-left: 0px !important;
    .ant-checkbox-group-item {
      display: flex !important;
      padding: 3px;
      .ant-checkbox {
        margin-top: 2px;
      }
    }
  }
`
