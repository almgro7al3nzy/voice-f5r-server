import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { graphql, compose } from 'react-apollo'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
// import moment from 'moment'
import ChatViewComponent from '../components/ChatView'
import {
  queryMessages,
  updateChatRoom,
  closeChatWindow,
  fetchMoreMessages,
  subscriptionMessage,
  messageAdded,
  clearMsgCount,
  updateMsgLastSeenAt,
} from '../actions'
// import { SECOND_MINUTES_BLOCK } from '../constants'
// import { getLocalTime } from '../../common/utils'
// import { withLoading } from '../../../common/withLoading'

const mapStateToProps = (state, props) => ({
  messages: state.chat.patients[props.patientId].messages,
  chatRoomName: state.chat.patients[props.patientId].chatRoomName,
  chatRoomId: state.chat.patients[props.patientId].chatRoomId,
  userId: state.core.userInfo._id,
})

const updateRoomLastSeenAt = graphql(updateMsgLastSeenAt, {
  props: ({ mutate }) => ({
    updateRoomLastSeenAt(chatRoomId) {
      return mutate({
        variables: {
          chatRoomId,
        },
      })
    },
  }),
})

class ChatView extends Component {
  static propTypes = {
    updateChatRoom: PropTypes.func.isRequired,
    fetchMoreMessages: PropTypes.func.isRequired,
    // messageAdded: PropTypes.func.isRequired,
    MessageList: PropTypes.object.isRequired,
    patientId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    subscribeToNewFeedback: PropTypes.func.isRequired,
    messages: PropTypes.array.isRequired,
    chatRoomId: PropTypes.string.isRequired,
    updateRoomLastSeenAt: PropTypes.func.isRequired,
  }

  static scrollToBottom = (patientId) => {
    const messageWallDiv = document.getElementById(`message-wall-${patientId}`)
    messageWallDiv.scrollTop = messageWallDiv.scrollHeight
  }

  state = { isLoading: false, chatRoomId: '' }

  componentDidMount() {
    if (this.props.patientId) {
      ChatView.scrollToBottom(this.props.patientId)
      const wall = document.getElementById(`message-wall-${this.props.patientId}`)
      wall.addEventListener('scroll', this.incrementalScroll, false)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { patient, loading } = nextProps.MessageList
    if (!loading && !isEqual(patient, this.props.MessageList.patient) && patient) {
      const patientId = this.props.patientId
      const chatRoomId = get(patient, 'boundDetails.chatRoom._id')
      if (chatRoomId && (!this.state.chatRoomId || this.state.chatRoomId !== chatRoomId)) {
        this.setState({ chatRoomId })
        if (this.unsubscribe) {
          this.unsubscribe()
        }
        this.unsubscribe = nextProps.subscribeToNewFeedback()
      }
      if (
        (this.props.MessageList.patient &&
          patient &&
          this.props.MessageList.patient._id !== patient._id) ||
        (!this.props.MessageList.patient && this.props.chatRoomId)
      ) {
        return
      }
      let messages = get(patient, 'boundDetails.chatRoom.messages')
      const chatRoomName = get(patient, 'fullName')
      messages = messages.map(message => ({
        ...message,
        sender: this.props.userId === message.sender._id ? 'self' : 'others',
        avatar: message.sender.avatar,
        patientId: this.props.userId === message.sender._id ? '' : patientId,
      }))
      nextProps.updateChatRoom({ patientId, messages, chatRoomId, chatRoomName })
    }
  }

  componentWillUpdate() {
    const wall = document.getElementById(`message-wall-${this.props.patientId}`)
    this.shouldScrollBottom = wall.scrollTop + wall.offsetHeight === wall.scrollHeight
    this.scrollHeight = wall.scrollHeight
    this.scrollTop = wall.scrollTop
  }

  componentDidUpdate() {
    if (this.props.patientId) {
      const wall = document.getElementById(`message-wall-${this.props.patientId}`)
      if (this.shouldScrollBottom) {
        wall.scrollTop = wall.scrollHeight
        ChatView.scrollToBottom(this.props.patientId)
      }
      if (this.scrollTop === 0) {
        wall.scrollTop = this.scrollTop + (wall.scrollHeight - this.scrollHeight)
      }
    }
  }

  componentWillUnmount() {
    const chatRoomId = this.props.chatRoomId
    this.props.updateRoomLastSeenAt(chatRoomId)
    clearMsgCount(chatRoomId)
    const wall = document.getElementById(`message-wall-${this.props.patientId}`)
    wall.removeEventListener('scroll', this.incrementalScroll, false)
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  incrementalScroll = () => {
    const wall = document.getElementById(`message-wall-${this.props.patientId}`)
    if (wall.scrollTop === 0 && !this.state.isLoading) {
      this.props.MessageList.fetchMore({
        query: queryMessages,
        variables: {
          patientId: this.props.patientId,
          before: this.props.messages[0].createdAt,
          limit: 10,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult
          }
          const fetchMessages = get(fetchMoreResult, 'patient.boundDetails.chatRoom.messages')
          if (fetchMessages.length === 0) {
            this.setState({ isLoading: true })
            return previousResult
          }
          // this.setState({ isLoading: true })
          const messages = fetchMessages.map((message) => {
            const historyMessage = {
              sender: this.props.userId === message.sender._id ? 'self' : 'others',
              type: message.__typename,
              avatar: message.sender.avatar,
              createdAt: message.createdAt,
              patientId: this.props.userId === message.sender._id ? '' : this.props.patientId,
            }
            switch (message.__typename) {
              case 'TextMessage':
                historyMessage.text = message.text
                break
              case 'ImageMessage':
                historyMessage.imageUrl = message.imageUrl
                break
              case 'AudioMessage':
                historyMessage.audioUrl = message.audioUrl
                break
              default:
                historyMessage.text = message.text
            }
            return historyMessage
          })
          return this.props.fetchMoreMessages(this.props.patientId, messages)
        },
      })
    }
  }

  render() {
    return <ChatViewComponent {...this.props} />
  }
}

const withData = graphql(queryMessages, {
  name: 'MessageList',
  options: props => ({
    variables: {
      patientId: props.patientId,
      before: new Date(),
      limit: 10,
    },
    notifyOnNetworkStatusChange: true,
  }),
  props: props => ({
    ...props,
    subscribeToNewFeedback: () =>
      props.MessageList.subscribeToMore({
        document: subscriptionMessage,
        variables: {
          chatRoomId: get(props.MessageList, 'patient.boundDetails.chatRoom._id'),
        },
        updateQuery: (prev, { subscriptionData }) => {
          console.log('Prev: ', prev)
          const prevChatRoomId = prev.patient.boundDetails.chatRoom._id
          if (
            !subscriptionData.data ||
            prevChatRoomId !== subscriptionData.data.chatMessageAdded.chatRoom._id
          ) {
            return prev
          }
          const newFeedbackItem = subscriptionData.data.chatMessageAdded
          console.log('New Feedback Item', newFeedbackItem)
          const newMessage = {
            sender: props.ownProps.userId === newFeedbackItem.sender._id ? 'self' : 'others',
            type: newFeedbackItem.__typename,
            avatar: newFeedbackItem.sender.avatar,
            createdAt: newFeedbackItem.createdAt,
            patientId: props.ownProps.userId === newFeedbackItem.sender._id ? '' : props.patientId,
          }
          switch (newFeedbackItem.__typename) {
            case 'TextMessage':
              newMessage.text = newFeedbackItem.text
              break
            case 'ImageMessage':
              newMessage.imageUrl = newFeedbackItem.imageUrl
              break
            case 'AudioMessage':
              newMessage.audioUrl = newFeedbackItem.audioUrl
              break
            default:
              newMessage.text = newFeedbackItem.text
          }
          return props.ownProps.messageAdded(props.ownProps.patientId, newMessage)
        },
      }),
  }),
})

export default compose(
  updateRoomLastSeenAt,
  connect(
    null,
    { messageAdded },
  ),
  withData,
  connect(
    mapStateToProps,
    { updateChatRoom, closeChatWindow, fetchMoreMessages, messageAdded },
  ),
)(ChatView)
