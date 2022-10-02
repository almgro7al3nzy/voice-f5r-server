import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import isEqual from 'lodash/isEqual'
import IncomingMessageButtonComponent from '../components/IncomingMessageButton'
import { queryAllUnreadCount, getAllUnreadCount, subscriptionMessage } from '../actions/chatView'

// const fakeMessageCount = 10

const mapStateToProps = state => ({
  count: state.chat.allUnreadCount,
  messageData: state.chat.latestMessageData,
  patients: state.chat.patients,
})

class IncomingMessageButton extends Component {
  static propTypes = {
    getAllUnreadCount: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    patients: PropTypes.object.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    const { me, loading } = nextProps.data
    if (!loading && !isEqual(nextProps.data.me, this.props.data.me) && me) {
      nextProps.getAllUnreadCount(me, nextProps.patients)
    }

    this.unsubscribe = nextProps.data.subscribeToMore({
      document: subscriptionMessage,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev
        }
        const newFeedbackItem = subscriptionData.data.chatMessageAdded
        nextProps.data.refetch()
        console.log('New Feedback Item in IncomingMessageButtonComponent', newFeedbackItem, newFeedbackItem.chatRoom._id)

        return ''
      },
    })
  }

  render() {
    return <IncomingMessageButtonComponent {...this.props} />
  }
}

export default connect(mapStateToProps, { getAllUnreadCount })(
  graphql(queryAllUnreadCount, {
    options: {
      fetchPolicy: 'network-only',
    },
  })(IncomingMessageButton),
)
