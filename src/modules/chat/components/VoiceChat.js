import React, { PropTypes } from 'react'
import { Modal, Button } from 'antd'
import CountdownTimer from './CountDown'
import {
    VoiceRecButton,
    VoiceRecButtonText,
    VoiceRecButtonImg,
    VoiceRecingButtonText,
    VoiceRecingButtonImg,
    VoiceRecingButton,
    VoiceTitle,
    CountDown,
} from './styled-components'
import './VoiceChat.css'
import voiceSrc from './sound-on@2x.png'
import voiceRecSrc from './speaker-black.gif'

/* eslint-disable */
const onKeyPressed = (e) => {
    console.log(e.key);
}

const VoiceChat = ({ voiceModal, voice, beginRec, endRec, closeVoiceModal, sendVoiceMessage, }) => {
    const chatRoomId = voiceModal.chatRoomId
    const chatRoomName = voiceModal.chatRoomName
    if (voice.recording) {
        return (
            <Modal chatRoomId={chatRoomId}
                className="voice-modal"
                wrapClassName="vertical-center-modal"
                footer={null}
                title={null}
                onCancel={() => closeVoiceModal()}
                visible={voiceModal.isVoiceModalShow}
                style={{
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                }}
            >
                <VoiceTitle>
                    给 {chatRoomName} 发语音消息
            </VoiceTitle>
                <VoiceRecingButton
                    onMouseUp={() => endRec()}
                >
                    <VoiceRecingButtonText>
                        正在录制，松开鼠标结束&nbsp;
                        <CountDown>
                            <CountdownTimer
                                secondsRemaining={60} onCountEnd={() => endRec()} />
                            &nbsp;秒
                        </CountDown>
                    </VoiceRecingButtonText>

                    <VoiceRecingButtonImg
                        src={voiceRecSrc}
                    />
                </VoiceRecingButton>
            </Modal>
        )
    }
    else if (voice.endRecording) {
        return (

            <Modal chatRoomId={chatRoomId}
                className="voice-modal"
                wrapClassName="vertical-center-modal"
                footer={null}
                title={null}
                onCancel={() => closeVoiceModal()}
                visible={voiceModal.isVoiceModalShow}
                style={{
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                }}
            >
                <VoiceTitle>
                    给 {chatRoomName} 发语音消息
            </VoiceTitle>
                <VoiceRecButton>
                    <VoiceRecButtonImg
                        tabIndex="0"
                        onMouseDown={() => beginRec()}
                        onKeyDown={(e) => {
                            console.log(e.keyCode)
                            if (e.keyCode === '32') {
                                beginRec()
                            }
                        }}
                        src={voiceSrc}
                    />
                    <VoiceRecButtonText
                        onMouseDown={() => beginRec()}>
                        长按重新录制
                    </VoiceRecButtonText>
                    <Button
                        type="primary"
                        onClick={() => {
                            closeVoiceModal()
                            sendVoiceMessage(chatRoomId)
                        }}
                    >发送</Button>
                </VoiceRecButton>
            </Modal>
        )
    }
    else {
        return (

            <Modal chatRoomId={chatRoomId}
                className="voice-modal"
                onKeyDown={(e) => this.onKeyPressed(e)}
                wrapClassName="vertical-center-modal"
                footer={null}
                title={null}
                onCancel={() => closeVoiceModal()}
                visible={voiceModal.isVoiceModalShow}
                style={{
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                }}
            >
                <VoiceTitle>
                    给 {chatRoomName} 发语音消息
            </VoiceTitle>
                <VoiceRecButton
                    tabIndex="1"
                    onMouseDown={() => beginRec()}
                >
                    <VoiceRecButtonImg
                        src={voiceSrc}
                    />
                    <VoiceRecButtonText>
                        长按开始录制语音消息
                            </VoiceRecButtonText>
                </VoiceRecButton>
            </Modal>
        )
    }

}

VoiceChat.propTypes = {
    voiceModal: PropTypes.object.isRequired,
    beginRec: PropTypes.object.isRequired,
    voice: PropTypes.object.isRequired,
    endRec: PropTypes.object.isRequired,
    closeVoiceModal: PropTypes.object.isRequired,
    chatRoomId: PropTypes.string.isRequired,
    chatRoomName: PropTypes.string.isRequired,
    sendVoiceMessage: PropTypes.func.isRequired,
}

export default VoiceChat
