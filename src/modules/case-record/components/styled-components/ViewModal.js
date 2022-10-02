import styled from 'styled-components'
import { Card } from 'antd'

export const StyledCard = styled(Card)`
  height: calc(100vh - 170px);
  overflow-y: hidden;
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
  font-size: 18px;
  align-items: stretch;
  flex: 1;
`

export const StyledNoDataPageInside = styled.div`
  display: flex;
  justify-content: center;
  font-size: 18px;
  align-items: center;
  flex: 1;
`

export const StyledNoDataInfo = styled.p`
  display: flex;
  font-family: PingFangSC-Regular;
  margin-right: 10px;
  color: #4f5d78;
`

export const StyledNoDataBlank = styled.div`
  margin-top: -1px;
  width: 121px;
  background: ${props => props.theme.general.color.TITLE};
  display: flex;
  justify-content: center;
  align-items: center;
`
