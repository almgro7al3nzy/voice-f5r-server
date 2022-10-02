

import * as t from './types';

export const initialState = {
    // user: null,
    error: null,
}
// export const initialState = {
//     user: 'null fuck',
//     error: 'null you',
//     use: null,
// }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case t.RESTORE_TOKEN:
            return {
                ...state,
                loggedIn: true, //really ?
                token: action.token
            }
        case t.USER_LOADING:
            return {
                ...state,
                userLoading: true
            }
            
        case t.USER_PROMPT_ADDED:
            
            const promptIndex = state.user.prompts.findIndex(prompt => prompt.id === action.userPrompt.promptId);
            const oldPrompt = state.user.prompts[promptIndex];

            const newPrompt = {
                ...oldPrompt,
                'UserPrompts': action.userPrompt 
            };

            return {
                ...state,
                user: {
                    ...state.user,
                    prompts: [
                        ...state.user.prompts.slice(0, promptIndex),
                        newPrompt,
                        ...state.user.prompts.slice(promptIndex + 1)
                    ]
                }
            }   


        //     case t.SEND_MESSAGE:
        //     // 
        //     const chatIndex = state.chats.findIndex(chat => chat.id === action.message.chatId);
        //     const prevChat = state.chats[chatIndex]

        //     const nextChat = {
        //         ...prevChat,
        //         messages: prevChat.messages ? prevChat.messages.concat(action.message) : [action.message]
        //         // messages: state.chats[chatIndex].messages.concat(action.message)
        //     }

        //     return {
        //         ...state,
        //         chats: [
        //             ...state.chats.slice(0, chatIndex),
        //             nextChat,
        //             ...state.chats.slice(chatIndex + 1, state.chats.length)
        //         ]
        //     }


        case t.ROLE_ADDED:
            return {
                ...state,
                user: {
                    ...state.user,
                    roles: state.user.roles.concat(action.role)
                }
            }   
        case t.AVATAR_UPLOADED:
            
            return {
                ...state,
                user: {
                    ...state.user,
                    profile: {
                        ...state.user.profile,
                        avatar: action.avatar
                    }
                }
            }   
        case t.PHOTOS_ADDED:
            
            return {
                ...state,
                user: {
                    ...state.user,
                    profile: {
                        ...state.user.profile,
                        photos: action.photos
                    }
                }
            }   
        case t.ADD_OR_REMOVE_FRIEND:
            
            // if ()
            // const friendIndex = state.user.friends.findIndex(friend => friend.id === action.friend.id);
            const friend = state.user.friends.find(friend => friend.id === action.friend.id);

            // I DONT NEED FRIEND INSTANCE FROM DB ITS ALREADY LOADED => PROFILES
            if (friend) {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        friends: state.user.friends.filter(friend => friend.id !== action.friend.id)
                    }
                } 
            }
            return {
                ...state,
                user: {
                    ...state.user,
                    friends: state.user.friends.concat(action.friend)
                }
            }   
        case t.USER_LOADED:
        case t.LOGIN_SUCCESS:
        case t.REGISTER_SUCCESS:
            // console.log('loginrducer', action);
            return {
                ...state,
                user: action.user,
                friends: action.user.friends,
                token: action.token
            }
        // case t.AUTH_SUCCESS:
        //     
        //         ...state,
        //         user: action.user
        //     });
        //     return {
        //         ...state,
        //         user: action.user
        //     }
        case t.CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        case t.SET_PHONE_OR_EMAIL:
            return {
                ...state,
                phoneOrEmail: action.phoneOrEmail
            }
        case t.LOGOUT_SUCCESS:
        case t.LOGIN_FAIL:
        case t.REGISTER_FAIL:
        case t.AUTH_ERROR:
            return {
                ...state,
                user: null,
                error: action.error
            };    
        default:
            return state;
    }
}

export default reducer;