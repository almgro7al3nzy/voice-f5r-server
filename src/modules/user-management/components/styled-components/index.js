import styled from 'styled-components'
import { Table } from 'antd'

export * from './UpdateHealthCareProfessional'

export const BtnContainer = styled.div`
  margin-bottom: 15px;
  text-align: right;
`
export const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    padding: 8px;
  }
  .ant-table-tbody > tr > td {
    padding: 5px 8px;
  }
`
