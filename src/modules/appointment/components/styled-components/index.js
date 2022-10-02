import styled from 'styled-components'
import { Icon, Card } from 'antd'

export const AppointmentContainer = styled.div`
  padding: 20px;
`

export const TableContainer = styled.div`
  .ant-table-bordered .ant-table-thead > tr > th {
    padding: 6px;
    text-align: center;
  }
  .ant-table-bordered .ant-table-tbody > tr > td {
    padding: 6px;
    text-align: center;
  }
`
export const StyledContainer = styled.div`
  position: relative;
  .ant-input {
    padding: 0 0 0 5px;
  }
  .editable-cell-icon {
    line-height: 24px;
    display: none;
  }
  .editable-cell-icon-check {
    line-height: 28px;
  }
  &:hover .editable-cell-icon {
    display: inline-block;
  }
`

export const StyledIcon = styled(Icon)`
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
  &:hover {
    color: #108ee9
  }
`
export const StyledCard = styled(Card)`
  margin-left: 290px !important;
  margin-top: -35px !important;
  .ant-card-body {
    padding: 20px !important;
  }
`
