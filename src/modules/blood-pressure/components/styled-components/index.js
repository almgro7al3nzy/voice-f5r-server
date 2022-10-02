import styled from 'styled-components'
import { Card } from 'antd'

export const StyledCard = styled(Card)`
  background: ${p => p.isEditing ? '#fffdf6' : '#fff'} !important;
  .ant-card-head {
    background: ${p => p.isEditing ? '#fffdf6' : '#fff'} !important;
    .ant-card-head-title {
      width: 100%;
    }
  }
`

export const StyledBPHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

export const StyledTable = styled.table`
  border-spacing: 0px;
  border-left: 1px solid #bdbdbd;
  border-bottom: 1px solid #bdbdbd;
  width: 100%;
`

export const StyledTh = styled.th`
  padding: 5px 20px;
  text-align: center;
  border-right: 1px solid #bdbdbd;
  border-top: 1px solid #bdbdbd;
  white-space: nowrap;
  min-height: 30px;
  min-width: 60px;
`

export const StyledTd = styled.td`
  padding: 5px 20px;
  text-align: center;
  border-right: 1px solid #bdbdbd;
  border-top: 1px solid #bdbdbd;
  white-space: nowrap;
  min-height: 30px;
  min-width: 60px;
`
