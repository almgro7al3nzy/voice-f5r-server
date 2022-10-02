import styled from 'styled-components'
import { Icon } from 'antd'

export const ChatContainer = styled.div`
  position: fixed !important;
  right: 10px;
  bottom: 0px;
  display: flex;
  z-index: 999;
`

export const ChatViewPanel = styled.div`
  width: 240px;
  height: 320px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  border-radius: 2px;
  margin-left: 10px;
  background-color: #fff;
`

export const ChatViewHeader = styled.div`
  flex-shrink: 0;
  height: 24px;
  background-color: ${props => props.theme.general.color.TITLE};
  line-height: 24px;
  color: #fff;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  border-radius: 2px 2px 0 0;
  span {
    white-space: nowrap;
    overflow-x: hidden;
    width: 90%;
    text-overflow: ellipsis;
  }
`

export const MessageWall = styled.div`
  height: 100%;
  flex-shrink: 1;
  padding: 0 10px;
  overflow-y: auto;
`

export const CloseIcon = styled(Icon)`
  line-height: 24px;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`
