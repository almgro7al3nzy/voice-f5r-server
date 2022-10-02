import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import MicRecorder from 'mic-recorder-to-mp3'
import VoiceChat from '../components/VoiceChat'
import { inserAudioMessages } from '../actions'

/* eslint-disable */

let props = {}

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

// const ChatInputAudio = (chatRoomId, base64EncodedAudioData) => {

//     //     props: ({ mutate })
//     console.log(this.props, '-----')
//     this.props.mutate({
//         variables: {
//             chatRoomId,
//             base64EncodedAudioData,
//         }
//     })
// }

const handleAudioSend = chatRoomId => {
  recorder
    .stop()
    .getMp3()
    .then(([buffer, blob]) => {
      if (buffer.length > 1) {
        console.log('buffer', buffer.length)
        const file = new File(buffer, 'audio.mp3', {
          type: blob.type,
          lastModified: Date.now(),
        })
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          props.sendAudioMessage({ chatRoomId, base64EncodedAudioData: reader.result })
        }
      }
    })
}
let recorder = new MicRecorder({ bitRate: 128 })
const startAudioRecord = () => {
  recorder.start().then(() => {
    console.log('start audio recoerding')
  })
}

const stopAudioRecord = () => {
  recorder.stop()
  console.log('stop audio recoerding')
}

const mapStateToProps = state => ({
  voiceModal: state.voiceModal,
  voice: state.voice,
  chatRoomId: state.chatRoomId,
  chatRoomName: state.chatRoomName,
})

const mapDispatchToProps = dispatch => ({
  openVoiceModal: () => {
    dispatch({ type: 'VOIVE_MODEL_SHOW' })
  },
  beginRec: () => {
    dispatch({ type: 'VOIVE_RECORDING' })
    startAudioRecord()
  },
  endRec: () => {
    dispatch({ type: 'VOIVE_END_RECORDING' })
    stopAudioRecord()
  },
  closeVoiceModal: () => {
    dispatch({ type: 'VOIVE_MODEL_HIDE' })
    dispatch({ type: 'READY_TO_VOIVE_RECORDING' })
  },
  sendVoiceMessage: chatRoomId => {
    handleAudioSend(chatRoomId)
  },
})

class VoiceChatControls extends Component {
  render() {
    props = this.props
    return <VoiceChat {...this.props} />
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  ChatInputAudio,
)(VoiceChatControls)
