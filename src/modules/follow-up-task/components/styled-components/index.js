import styled from 'styled-components'
import { Table, Card } from 'antd'

export const StyledCard = styled(Card) `
  height: calc(100vh - 105px);
  overflow-y: scroll;
`

export const BtnContainer = styled.div`
  margin-bottom: 15px;
  text-align: right;
`
export const StyledTable = styled(Table) `
  .ant-table-thead > tr > th {
    padding: 8px;
    text-align: center;
  }
  .ant-table-tbody > tr > td {
    padding: 5px 8px;
    text-align: center;
  }
`

export const StyledOperations = styled.div`
  color: ${props => props.color || '#5791bf'};
  cursor: pointer;
`
export const StyledSpan = styled.span`
  font-size: 36px;
  font-family: PingFangSC-Regular;
  color: ${props => props.followed ? '#477bb1' : '#b1b1b1'}
`

export const StyledTitle = styled.span`
  margin-left: 5px;
  font-family: PingFangSC;
  font-size: 12px;
  color: #666666;
`
