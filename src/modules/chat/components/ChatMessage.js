import React, { PropTypes } from 'react'
import { Checkbox, Tabs } from 'antd'
import moment from 'moment'
import orderBy from 'lodash/orderBy'
// import get from 'lodash/get'

import {
  ChatMessagePanel,
  ChatMessageItem,
  ChatMessageAvatar,
  ChatMessageName,
  ChatMessageAccount,
  ChatMessageInfo,
  ChatStyBadge,
  ChatMessageDate,
  ChatMessageBrief,
  ChatMessageMore,
  ChatMessageMute,
  ChatMessageMuteNotice,
  TabsWithStyle,
} from './styled-components'

const TabPane = Tabs.TabPane
/* eslint-disable */
const formatMessageListTime = function (messageList) {
  let newList = []
  messageList.map(o => {
    if (o.createdAt) {
      newList.push(Object.assign(o, { orderTime: moment(o.createdAt).unix(Number) }))
    } else {
      newList.push(Object.assign(o, { orderTime: moment('1970-01-01').unix(Number) }))
    }
  })
  return newList
}


const ChatMessage = ({
  latestMessageList,
  openChatWindow,
  updateRoomLastSeenAt,
  clearMsgCount,
  refreshData,
  }) => {
  return (
    <ChatMessagePanel>
      <TabsWithStyle defaultActiveKey="1">
        <TabPane tab="患者消息" key="1">
          {latestMessageList &&
            orderBy(formatMessageListTime(latestMessageList), ['orderTime'], ['desc']).map(o => (<ChatMessageItem onClick={() => {
                openChatWindow(o.patientId); updateRoomLastSeenAt(o.roomId); clearMsgCount(o.roomId)
              }}
              >
              <ChatMessageName>{o.name}</ChatMessageName>
              <ChatMessageAvatar src={o.avatar} />
              <ChatMessageAccount>
                <ChatMessageInfo>
                  {o.gender} | {o.age}
                </ChatMessageInfo>
                <ChatStyBadge count={o.unreadMessageCount} />
                <ChatMessageDate>{moment(o.createdAt).format('YYYY-MM-DD HH:mm')}</ChatMessageDate>
              </ChatMessageAccount>
              <ChatMessageBrief>{o.text}</ChatMessageBrief>
              </ChatMessageItem>),
            )}
        </TabPane>

        <TabPane tab="同事消息" key="2" />
      </TabsWithStyle>
      <ChatMessageMore />
      <ChatMessageMute>
        <Checkbox />
        <ChatMessageMuteNotice>患者群消息免打扰</ChatMessageMuteNotice>
      </ChatMessageMute>
    </ChatMessagePanel>
  )
}
ChatMessage.propTypes = {
  latestMessageList: PropTypes.array.isRequired,
  openChatWindow: PropTypes.array.isRequired,
  updateRoomLastSeenAt: PropTypes.func.isRequired,
  clearMsgCount: PropTypes.func.isRequired,
  refreshData: PropTypes.func.isRequired,
}

export default ChatMessage
