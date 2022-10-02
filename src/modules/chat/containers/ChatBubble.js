import { connect } from 'react-redux'
import ChatBubbleComponent from '../components/ChatBubble'
import { openImage, updateVoiceMsgTime, voiceMsgPalying, voiceMsgPalyed } from '../actions/chatView'
/* eslint-disable */
const mapStateToProps = (state, ownProps) => {
  const voiceTimes = state.voice.voiceTime
  const voiceTime = voiceTimes[ownProps.message.msgId] ?
    voiceTimes[ownProps.message.msgId].time : ''
  let bubbleLength = 0
  if (voiceTime < 10) {
    bubbleLength = 40
  } else if (voiceTime >= 10 && voiceTime < 30) {
    bubbleLength = 65
  } else {
    bubbleLength = 100
  }
  let isPlayingShow = 'none'
  let isImgShow = 'block'
  const isPlaying = state.voice.voiceTime[ownProps.message.msgId] ?
    state.voice.voiceTime[ownProps.message.msgId].playing : false
  if (isPlaying) {
    isPlayingShow = 'block'
    isImgShow = 'none'
  } else {
    isPlayingShow = 'none'
    isImgShow = 'block'
  }

  return ({
    message: ownProps.message,
    voiceTime: voiceTime,
    bubbleLength: bubbleLength,
    isPlayingShow: isPlayingShow,
    isImgShow: isImgShow
  })
}




export default connect(mapStateToProps,
  { openImage, updateVoiceMsgTime, voiceMsgPalying, voiceMsgPalyed })(ChatBubbleComponent)
