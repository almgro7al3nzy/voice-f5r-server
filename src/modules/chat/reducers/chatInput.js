/* eslint-disable */
const initialState = { isVoiceModalShow: false, chatRoomId: '', chatRoomName: '' }

const voiceModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'VOIVE_MODEL_SHOW':
            return {
                ...state,
                isVoiceModalShow: true,
                chatRoomId: action.chatRoomId,
                chatRoomName: action.chatRoomName,
            }
        case 'VOIVE_MODEL_HIDE':
            return initialState
        default:
            return state
    }
}

export default voiceModalReducer