import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import isEqual from 'lodash/isEqual'
import ChatMessageComponent from '../components/ChatMessage'
import { queryLatestMessages, openLatestMessageList, openChatWindow, clearMsgCount, updateMsgLastSeenAt } from '../actions/chatView'

const mapStateToProps = state => ({
  latestMessageList: state.chat.latestMessageList,
  count: state.chat.count,
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


class ChatMessage extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    openLatestMessageList: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    const { me, loading } = nextProps.data
    if (!loading && !isEqual(nextProps.data.me, this.props.data.me) && me) {
      nextProps.openLatestMessageList(nextProps.data)
    }
  }

  render() {
    return (<ChatMessageComponent {...this.props} />)
  }
}

export default compose(updateRoomLastSeenAt,
  connect(mapStateToProps, {
    openLatestMessageList,
    openChatWindow,
    clearMsgCount,
  }),
  graphql(queryLatestMessages),
)(ChatMessage)
