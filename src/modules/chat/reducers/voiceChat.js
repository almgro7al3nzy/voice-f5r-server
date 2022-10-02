/* eslint-disable */
const initialState = { recording: false, endRecording: false, voiceTime: {} }

const voiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'READY_TO_VOIVE_RECORDING':
            return {
                ...state,
                recording: false,
                endRecording: false,
            }
        case 'VOIVE_RECORDING':
            return {
                ...state,
                recording: true,
                endRecording: false,
            }
        case 'VOIVE_END_RECORDING':
            return {
                ...state,
                recording: false,
                endRecording: true,
            }
        case 'VOICE_MSG_TIME_CHANGE':
            return {
                ...state,
                voiceTime: {
                    ...state.voiceTime,
                    [action.msgId]: {
                        ...state.voiceTime[action.msgId],
                        time: action.audioDuration,
                        palying: false,
                    }
                }
            }
        case 'VOICE_MSG_PALYING':
            return {
                ...state,
                voiceTime: {
                    ...state.voiceTime,
                    [action.msgId]: {
                        ...state.voiceTime[action.msgId],
                        playing: true,
                    }
                }
            }
        case 'VOICE_MSG_PALYED':
            return {
                ...state,
                voiceTime: {
                    ...state.voiceTime,
                    [action.msgId]: {
                        ...state.voiceTime[action.msgId],
                        playing: false,
                    }
                }
            }
        default:
            return state
    }
}

export default voiceReducer