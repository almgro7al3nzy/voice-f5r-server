import React, { PropTypes } from 'react'
import moment from 'moment'
import ChatBubble from '../containers/ChatBubble'
import ChatInput from '../containers/ChatInput'
// import ChatMessage from '../containers/ChatMessage'
import {
  ChatViewPanel,
  ChatViewHeader,
  MessageWall,
  CloseIcon,
  TimeStamp,
  TimeStampText,
} from './styled-components'
import { getLocalTime } from '../../common/utils'
import { SECOND_MINUTES_BLOCK } from '../constants'
/* eslint-disable max-len */

class ChatView extends React.Component {
  constructor(props) {
    super(props)
    this.state = { scrollable: false }
  }

  componentWillReceiveProps(nextProps) {
    // 如果收到了消息，并且最后一条消息是自己发的执行滚动到底部方法，如果不是不执行此方法。
    if (
      nextProps.messages[nextProps.messages.length - 1] !==
        this.props.messages[this.props.messages.length - 1] &&
      nextProps.messages[nextProps.messages.length - 1].sender === 'self'
    ) {
      this.setState({ srollable: true })
    }
  }
  componentDidUpdate() {
    if (this.state.srollable) {
      this.scrollToEndView()
    }
  }
  scrollToEndView = () => {
    const hid = document.getElementById(`message-wall-${this.props.patientId}`)
    hid.scrollTop = hid.scrollHeight
    this.setState({ srollable: false })
  }

  render() {
    const {
      messages,
      chatRoomName,
      chatRoomId,
      closeChatWindow,
      patientId,
      data,
      history,
    } = this.props
    return (
      <ChatViewPanel>
        <ChatViewHeader>
          <span>{chatRoomName}</span>
          <CloseIcon type="close" onClick={() => closeChatWindow(patientId)} />
        </ChatViewHeader>
        <MessageWall id={`message-wall-${patientId}`}>
          {(() => {
            let timeStamp = []
            return messages.map((message) => {
              timeStamp.push(message.createdAt)
              if (
                timeStamp.length <= 1 ||
                moment(timeStamp[timeStamp.length - 1]).diff(moment(timeStamp[0])) >
                  SECOND_MINUTES_BLOCK
              ) {
                if (timeStamp.length > 1) {
                  timeStamp = [timeStamp.pop()]
                }
                return (
                  <div>
                    <TimeStamp>
                      <TimeStampText>{getLocalTime(message.createdAt)}</TimeStampText>
                    </TimeStamp>
                    <ChatBubble
                      history={history}
                      message={Object.assign(message, {
                        msgId: Math.floor(Math.random() * 1000000),
                      })}
                    />
                  </div>
                )
              }
              return (
                <ChatBubble
                  history={history}
                  message={Object.assign(message, { msgId: Math.floor(Math.random() * 1000000) })}
                />
              )
            })
          })()}
        </MessageWall>
        <ChatInput
          chatRoomId={chatRoomId}
          patientId={patientId}
          chatRoomName={chatRoomName}
          data={data}
        />
      </ChatViewPanel>
    )
  }
}
ChatView.propTypes = {
  messages: PropTypes.array.isRequired,
  chatRoomName: PropTypes.string.isRequired,
  chatRoomId: PropTypes.string.isRequired,
  closeChatWindow: PropTypes.func.isRequired,
  patientId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default ChatView
