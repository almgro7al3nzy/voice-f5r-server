import styled from 'styled-components'
import { Card } from 'antd'

export const StyledCard = styled(Card)`
  height: calc(100vh - 170px);
  counter-reset: questions;
  overflow-y: hidden;
  .ant-card-head-title {
    max-width: inherit;
    width: 100%;
  }
  .ant-card-body {
    overflow-y: auto;
    height: 100%;
  }
`

export const StyledCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

export const StyledOptionsItem = styled.p`
  margin-left: 20px;
  padding: 5px 0px;
`

export const StyledNoDataPage = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 150px;
  font-size: 18px;
`

export const StyledNoDataInfo = styled.p`
  font-family: PingFangSC-Regular;
  margin-right: 10px;
  color: #4f5d78;
`
