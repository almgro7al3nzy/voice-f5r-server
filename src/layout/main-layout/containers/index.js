import React, { PropTypes } from 'react'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import { getUserInfo, queryUser, showNotice, newMessageComming } from '../actions'
import { subChatRoomDynamics } from '../../../modules/chat/actions'

import MainLayoutComponent from '../components'

class MainLayoutContainer extends React.Component {
  static propTypes = {
    getUserInfo: PropTypes.func.isRequired,
    // subscribeToNewFeedback: PropTypes.func.isRequired,
    newMessageComming: PropTypes.func.isRequired,
    showNotice: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  }
  componentWillMount() {
    if (this.unsubscribe) this.unsubscribe()
    // this.unsubscribe = this.props.subscribeToNewFeedback()
  }
  componentWillReceiveProps(nextProps) {
    const { me, loading } = nextProps.data
    if (!loading && !isEqual(nextProps.data, this.props.data)) {
      nextProps.getUserInfo(me)
    }
    if (!loading && me) {
      if (this.unsubscribe) this.unsubscribe()
      this.unsubscribe = nextProps.data.subscribeToMore({
        document: subChatRoomDynamics,
        variables: {
          userId: get(nextProps.data, 'me._id', ''), // get(props.data, 'me._id'),  'htc1'
        },
        updateQuery: (prev, { subscriptionData }) => {
          const title = get(subscriptionData.data, 'chatRoomDynamics.sender.fullName')
          const content = get(subscriptionData.data, 'chatRoomDynamics.text', '发来一张图片')
          const news = {
            fullName: title,
            content,
          }
          nextProps.newMessageComming(news)
          nextProps.showNotice(title, content)
        },
      })
    }
  }
  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe()
  }
  render() {
    return <MainLayoutComponent {...this.props} />
  }
}

const MainLayout = compose(
connect(null, { getUserInfo, showNotice, newMessageComming }),
graphql(queryUser),
)(MainLayoutContainer)

export default MainLayout
