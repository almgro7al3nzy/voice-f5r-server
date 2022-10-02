import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import map from 'lodash/map'
import ChatView from './ChatView'
// import ChatView from './ChatView'
import { ChatContainer as StyledChatContainer } from '../components/styled-components'
// import { messageAdded } from '../actions/chatView'

const mapStateToProps = state => ({
  patients: state.chat.patients,
  userId: state.core.userInfo._id,
})

const ChatContainer = ({ patients, userId, history }) =>
  (<StyledChatContainer>
    {map(
      patients,
      (chatObj, patientId) => chatObj.status === 'OPEN' && <ChatView id={patientId} patientId={patientId} userId={userId} history={history} />,
    )}
  </StyledChatContainer>)

ChatContainer.propTypes = {
  patients: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, null)(ChatContainer)
