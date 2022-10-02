import chatViewReducer from './chatView'
import voiceModalReducer from './chatInput'
import voiceReducer from './voiceChat'
/* eslint-disable */
export default Object.assign({}, { chat: chatViewReducer, voiceModal: voiceModalReducer, voice: voiceReducer })
