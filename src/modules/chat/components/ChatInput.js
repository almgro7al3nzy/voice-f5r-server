import React, { PropTypes } from 'react'
import { Popover } from 'antd'
import trim from 'lodash/trim'
import MicRecorder from 'mic-recorder-to-mp3'
import {
  ChatInputContainer,
  ChatButtonsContainer,
  ChatInput,
  ChatAdditionButton,
  EmojiTable,
  EmojiButton,
  ChatImgAdditionButton,
} from './styled-components'
import emojis from '../constants/emoji'
import micSrc from './mic.png'

/* eslint-disable */
class ChatInputControls extends React.Component {
  static propTypes = {
    sendTextMessage: PropTypes.func.isRequired,
    sendAudioMessage: PropTypes.func.isRequired,
    sendImageMessage: PropTypes.func.isRequired,
    // startAudioRecord: PropTypes.func.isRequired,
    // stopAudioRecord: PropTypes.func.isRequired,
    chatRoomId: PropTypes.string.isRequired,
    openVoiceModal: PropTypes.func.isRequired,
    chatRoomName: PropTypes.string.isRequired,
  }
  state = {
    messageInput: null,
    emojiSelectorVisible: false,
  }
  componentWillMount() {
    this.recorder = new MicRecorder({ bitRate: 128 })
  }

  startAudioRecord() {
    this.recorder.start().then(() => {
      console.log('start audio recoerding')
    })
  }

  handleSend(messageType) {
    const { sendTextMessage, sendAudioMessage, sendImageMessage, chatRoomId } = this.props
    switch (messageType) {
      case 'TEXT':
        const text = trim(this.messageInput.input.value)
        if (text !== '') {
          sendTextMessage({
            chatRoomId,
            text,
          })
        }
        break
      case 'IMAGE': {
        sendImageMessage({
          chatRoomId,
          base64EncodedImageData: this.state.imageData,
        })
        break
      }
      case 'AUDIO': {
        this.recorder
          .stop()
          .getMp3()
          .then(([buffer, blob]) => {
            const file = new File(buffer, 'audio.mp3', {
              type: blob.type,
              lastModified: Date.now(),
            })
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
              sendAudioMessage({
                chatRoomId,
                base64EncodedAudioData: reader.result,
              })
            }
          })
        break
      }
      default:
        console.log('message type is ', messageType)
    }
    this.messageInput.input.value = ''
  }
  addEmoji(emoji) {
    if (this.messageInput) {
      this.messageInput.input.value += emoji
      this.messageInput.input.focus()
    }
  }
  handleEmojiVisibleChange(emojiSelectorVisible) {
    this.setState({ emojiSelectorVisible })
  }
  render() {
    const { openVoiceModal, chatRoomId, chatRoomName } = this.props
    return (
      <ChatInputContainer>
        <ChatInput
          placeholder="输入消息后按回车键发送"
          innerRef={x => {
            this.messageInput = x
          }}
          onPressEnter={() => {
            this.handleSend('TEXT')
          }}
        />
        <ChatButtonsContainer>
          <ChatAdditionButton type="paper-clip" />
          <ChatImgAdditionButton
            src={micSrc}
            onClick={() => {
              openVoiceModal(chatRoomId, chatRoomName)
            }}
          />
          <label htmlFor={`image${chatRoomId}`}>
            <ChatAdditionButton type="picture" />
          </label>
          <input
            id={`image${chatRoomId}`}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            capture="Camera"
            onChange={e => {
              const reader = new FileReader()
              reader.onload = x => {
                this.setState({ imageData: x.target.result })
                this.handleSend('IMAGE')
              }
              reader.readAsDataURL(e.target.files.item(0))
            }}
          />
          <Popover
            placement="topLeft"
            trigger="click"
            visible={this.state.emojiSelectorVisible}
            onVisibleChange={visible => this.handleEmojiVisibleChange(visible)}
            content={
              <EmojiTable>
                {emojis.map(emoji => (
                  <EmojiButton
                    onClick={() => {
                      this.addEmoji(emoji.key)
                      this.setState({ emojiSelectorVisible: false })
                    }}
                    title={emoji.key}
                    src={emoji.value}
                  />
                ))}
              </EmojiTable>
            }
          >
            <ChatAdditionButton type="smile-o" />
          </Popover>
        </ChatButtonsContainer>
      </ChatInputContainer>
    )
  }
}

export default ChatInputControls
