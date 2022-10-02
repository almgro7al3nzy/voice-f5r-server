
import * as t from './types';



export const initialState = {
    chats: null,
    contacts: null,
    tags: null,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case t.SEND_MESSAGE:
            // 
            const chatIndex = state.chats.findIndex(chat => chat.id === action.message.chatId);
            const prevChat = state.chats[chatIndex]

            const nextChat = {
                ...prevChat,
                messages: prevChat.messages ? prevChat.messages.concat(action.message) : [action.message]
                // messages: state.chats[chatIndex].messages.concat(action.message)
            }

            return {
                ...state,
                chats: [
                    ...state.chats.slice(0, chatIndex),
                    nextChat,
                    ...state.chats.slice(chatIndex + 1, state.chats.length)
                ]
            }
        case t.CHATS_LOADED:
            
            return {
                ...state,
                chats: action.chats,
                profiles: action.profiles,
                spaces: action.spaces,
            }        
        case t.CREATE_CHAT:
            
            return {
                ...state,
                chats: state.chats.concat(action.chat)
            }        
        
        case t.TAGS_LOADED:
            return {
                ...state,
                tags: action.tags
            }  
        case t.FRIENDS_LOADED:
            
            return {
                ...state,
                friends: action.friends
            }  
        case t.SET_CHATS_SOCKET:      
            
            return {
                ...state,
                socket: action.socket
            }
        case t.CONTACTS_ERROR:
        case t.CHATS_ERROR:
        case t.TAGS_ERROR:
        case t.FRIENDS_ERROR:
            return {
                ...state,
                error: action.err
            }        
        default:
            return state;
    }
}

export default reducer;