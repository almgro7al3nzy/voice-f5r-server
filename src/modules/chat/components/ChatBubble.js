import React, { PropTypes } from 'react'
import { isEmpty, find } from 'lodash'
import {
  Message,
  Content,
  ArrowWrapper,
  ArrowShape,
  Avatar40,
  Emoji,
  VoiceMessage,
  VoiceTime,
  VoiceTimeLeft,
  VoiceBubbleImg,
} from './styled-components'
import EMOJI_MAP from '../constants/emoji'
import BubbleImgSrc from './icon-speaker-white.png'
import BubbleGifSrc from './speaker-white.gif'
import GrayBubbleImgSrc from './sound-on-gray@2x.png'
import GrayBubbleGifSrc from './sound-on-gray.gif'
import { setActivePatient } from '../../left-nav/actions/patientList'

export const Arrow = ({ direction }) => (
  <ArrowWrapper direction={direction}>
    <ArrowShape direction={direction} />
  </ArrowWrapper>
)

Arrow.propTypes = {
  direction: PropTypes.string.isRequired,
}

const directionMap = {
  self: 'right',
  others: 'left',
}
/* eslint-disable */

const handlePatientClick = patientId => {
  console.log('handlePatientClick', patientId)
  if (patientId) {
    setActivePatient(patientId)
    window.open(`/patient/${patientId}/blood-pressure`, '_blank')
  }
}

export const ChatBubble = ({
  message,
  openImage,
  updateVoiceMsgTime,
  voiceTime,
  bubbleLength,
  voiceMsgPalying,
  voiceMsgPalyed,
  isPlayingShow,
  isImgShow,
  history,
}) => {
  return (
    <Message sender={message.sender}>
      <Avatar40
        style={{ cursor: 'pointer' }}
        onClick={() => handlePatientClick(message.patientId, history)}
        src={message.avatar}
      />
      <Arrow direction={directionMap[message.sender]} />
      <Content sender={message.sender}>
        {(() => {
          switch (message.type) {
            case 'TextMessage':
              return <MessageTranslator message={message.text} />
            case 'ImageMessage':
              return (
                <img
                  alt="img"
                  width="85"
                  style={{ cursor: 'pointer' }}
                  src={message.imageUrl}
                  onClick={() => openImage(message.imageUrl)}
                />
              )
            case 'AudioMessage': {
              const audio = new Audio(message.audioUrl)
              let display = 'none'
              audio.onloadedmetadata = () => {
                updateVoiceMsgTime(message.msgId, audio)
              }
              audio.onended = () => {
                voiceMsgPalyed(message.msgId)
              }
              const sender = message.sender
              return (
                <VoiceMessage
                  onClick={() => {
                    voiceMsgPalying(message.msgId, audio)
                    display = 'block'
                  }}
                  style={{ width: bubbleLength, cursor: 'pointer' }}
                >
                  {(() => {
                    console.log(' message.sender', message.sender)
                    return sender == 'self' ? (
                      <VoiceTime> {voiceTime ? `${voiceTime}''` : ''}</VoiceTime>
                    ) : (
                      <VoiceTimeLeft> {voiceTime ? `${voiceTime}''` : ''}</VoiceTimeLeft>
                    )
                  })()}
                  {(() => {
                    if (sender == 'self') {
                      return (
                        <div>
                          <VoiceBubbleImg
                            style={{ display: isImgShow, float: 'right' }}
                            src={BubbleImgSrc}
                          />
                          <VoiceBubbleImg
                            style={{ display: isPlayingShow, float: 'right' }}
                            src={BubbleGifSrc}
                          />
                        </div>
                      )
                    } else {
                      return (
                        <div>
                          <VoiceBubbleImg
                            style={{ display: isImgShow, float: 'left' }}
                            src={GrayBubbleImgSrc}
                          />
                          <VoiceBubbleImg
                            style={{ display: isPlayingShow, float: 'left' }}
                            src={GrayBubbleGifSrc}
                          />
                        </div>
                      )
                    }
                  })()}
                </VoiceMessage>
              )
            }
            default:
              return message.text
          }
        })()}
      </Content>
    </Message>
  )
}

ChatBubble.propTypes = {
  message: PropTypes.object.isRequired,
  openImage: PropTypes.func.isRequired,
  updateVoiceMsgTime: PropTypes.func.isRequired,
  voiceMsgPalying: PropTypes.func.isRequired,
  isPlayingShow: PropTypes.string.isRequired,
  isImgShow: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
}

const MessageTranslator = ({ message }) => {
  if (isEmpty(message) || isEmpty(message.trim())) {
    return <div />
  }

  const emojiRegexp = /\[[^[\]]+?\]/g
  const emojiKeys = message.match(emojiRegexp)
  if (isEmpty(emojiKeys)) {
    return <div>{message}</div>
  }

  const textContents = ` ${message} `.split(emojiRegexp)
  const contents = []
  textContents.forEach((text, index) => {
    contents.push(<span>{text.trim()}</span>)
    const emojiKey = emojiKeys[index]
    if (emojiKey) {
      const emoji = find(EMOJI_MAP, { key: emojiKey })
      contents.push(emoji ? <Emoji alt={emoji.key} src={emoji.value} /> : <span>{emojiKey}</span>)
    }
  })

  return <div>{contents}</div>
}

MessageTranslator.propTypes = {
  message: PropTypes.string.isRequired,
  voiceTime: PropTypes.string.isRequired,
  bubbleLength: PropTypes.string.isRequired,
}

export default ChatBubble
