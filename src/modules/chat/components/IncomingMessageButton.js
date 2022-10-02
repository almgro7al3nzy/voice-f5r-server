import React, { PropTypes } from 'react'
import { Popover } from 'antd'
import styled from 'styled-components'
import { StyIncomingMessageButton, StyBadge } from './styled-components'
import ChatMessage from '../containers/ChatMessage'


const refreshDataOnHover = (data) => {
  if (data) {
    data.refetch()
  }
}

const IncomingMessageButton = ({ count, messageData }) => (
  <StyBadge count={count}>
    <Popover trigger="hover" onMouseEnter={() => { refreshDataOnHover(messageData) }} placement="bottomLeft" content={<ChatMessage {...this.props} />}>
      <MessageButtonWrapper>
        <StyIncomingMessageButton type="message" />
      </MessageButtonWrapper>
    </Popover>
  </StyBadge>
)

IncomingMessageButton.propTypes = {
  count: PropTypes.number.isRequired,
  messageData: PropTypes.func.isRequired,
}

export const MessageButtonWrapper = styled.div`
  width: 56px;
  height: 56px;
  cursor: pointer;
`
export default IncomingMessageButton
