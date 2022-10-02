import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import ChatInputComponent from '../components/ChatInput'
import { insertTextMessages, inserAudioMessages, inserImageMessages } from '../actions'

const ChatInputText = graphql(insertTextMessages, {
  props: ({ mutate }) => ({
    sendTextMessage({ chatRoomId, text }) {
      return mutate({
        variables: {
          chatRoomId,
          text,
        },
      })
    },
  }),
})

const ChatInputAudio = graphql(inserAudioMessages, {
  props: ({ mutate }) => ({
    sendAudioMessage({ chatRoomId, base64EncodedAudioData }) {
      return mutate({
        variables: {
          chatRoomId,
          base64EncodedAudioData,
        },
      })
    },
  }),
})

const ChatInputImage = graphql(inserImageMessages, {
  props: ({ mutate }) => ({
    sendImageMessage({ chatRoomId, base64EncodedImageData }) {
      return mutate({
        variables: {
          chatRoomId,
          base64EncodedImageData,
        },
      })
    },
  }),
})

const mapStateToProps = state => ({
  modal: state.modal,
})

const mapDispatchToProps = dispatch => ({
  openVoiceModal: (chatRoomId, chatRoomName) => {
    dispatch({
      type: 'VOIVE_MODEL_SHOW',
      chatRoomId,
      chatRoomName,
    })
  },
})

export default compose(
  ChatInputAudio,
  ChatInputAudio,
  ChatInputText,
  ChatInputImage,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ChatInputComponent)
