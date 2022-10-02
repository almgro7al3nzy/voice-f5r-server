import * as t from './types';

export const initialState = {
    rooms: null,
    room: null,
    language: 'English',
    error: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case t.CHATS_LOADED:
            
            return {
                ...state,
                rooms: action.rooms
            }        
        case t.CHATS_ERROR:
            return {
                ...state,
                error: action.err
            }        
        case t.CHAT_UPDATED: {
            const roomIndex = state.rooms.findIndex(
                room => room.id === action.room.id
            );

            return {
                ...state,
                rooms: [
                    ...state.rooms.slice(0, roomIndex),
                    action.room,
                    ...state.rooms.slice(roomIndex + 1, state.rooms.length)
                ]
            }    
        } 
        case t.SEND_MESSAGE: {
            
            return {
                ...state,
                room: {
                    ...state.room,
                    messages: state.room.messages.concat(action.message)
                }
            }
        }   
        case t.SET_ROOM: {
            
            return {
                ...state,
                room: action.room
            }
        }   
        // case t.QUESTION_LOADED: {
            
        //     return {
        //         ...state,
        //         question: action.question
        //     }
        // }   
        case t.SET_PROFILE: {
            
            return {
                ...state,
                profile: action.profile
            }
        }   
        case t.SET_LANGUAGE: {
            return {
                ...state,
                language: action.language
            }
        }   
        // case t.CHOOSE_OPTION: {
        //     return {
        //         ...state,
        //         choices: { ...state.choices, [action.userId]: action.optionText }
        //     }
        // }   
        case t.SET_CHAT_SOCKET:
            return {
                ...state,
                socket: action.socket
            }        


































            case t.PEOPLE_LOADED:
            
            return {
                ...state,
                people: action.people
            }        
        case t.ROOMS_LOADED:
            
            return {
                ...state,
                rooms: action.rooms
            }        
        case t.ROOMS_ERROR:
            return {
                ...state,
                error: action.err
            }        
        case t.ROOM_UPDATED: {
            const roomIndex = state.rooms.findIndex(
                room => room.id === action.room.id
            );

            return {
                ...state,
                rooms: [
                    ...state.rooms.slice(0, roomIndex),
                    action.room,
                    ...state.rooms.slice(roomIndex + 1, state.rooms.length)
                ]
            }  
        }     
        case t.CREATE_ROOM:
            // console.log(t.CREATE_ROOM, action);
            const room = state.rooms.find(room => room.id === action.room.id);
            if (room) return state;

            return {
                ...state,
                activeRoomId: action.room.id,
                rooms: state.rooms.concat(action.room)
                // rooms: [ ...state.rooms, action.room ]
            }     
        case t.CHOOSE_TRUTH_OR_DARE: {
            // console.log(t.JOIN_ROOM, action);
            const roomIndex = state.rooms.findIndex(room => room.id === action.roomId);
            const oldRoom = state.rooms[roomIndex];            
            const newRoom = {
                ...oldRoom,
                truthOrDareChoice: action.truthOrDareChoice,
                question: action.question
            };

            return {
                ...state,
                activeRoomId: action.roomId,
                rooms: [
                    ...state.rooms.slice(0, roomIndex),
                    newRoom,
                    ...state.rooms.slice(roomIndex + 1)
                ]
            }
        }
        case t.CHOOSE_OPTION: {
            console.log(t.CHOOSE_OPTION, action);
            const roomIndex = state.rooms.findIndex(room => room.id === action.roomId);
            const oldRoom = state.rooms[roomIndex];            
            const newRoom = {
                ...oldRoom,
                // userChoiceId: action.optionId,
                choices: { ...oldRoom.choices, [action.userId]: action.optionText }
            };

            return {
                ...state,
                // activeRoomId: action.roomId,
                rooms: [
                    ...state.rooms.slice(0, roomIndex),
                    newRoom,
                    ...state.rooms.slice(roomIndex + 1)
                ]
            }
        }


        // case t.CHOOSE_OPTION: {
        //     return {
        //         ...state,
        //         choices: { ...state.choices, [action.userId]: action.optionText }
        //     }
        // }   
            
            // if (!state.room || state.room && state.room.id !== action.roomId) return state;

            // return {
            //     ...state,
            //     room: {
            //         ...state.room,
            //         choice: action.choice,
            //         question: action.question
            //     }
            // }     
        // case t.SET_CURRENT_PLAYER:
        //     
        //     if (!state.room || state.room && state.room.id !== action.roomId) return state;

        //     return {
        //         ...state,
        //         room: {
        //             ...state.room,
        //             currentPlayerId: state.room.voters.concat(action.voter)
        //         }
        //     }     
        case t.VOTE_ANSWER:
            

            if (!state.room || state.room && state.room.id !== action.roomId) return state;

            return {
                ...state,
                room: {
                    ...state.room,
                    voters: state.room.voters.concat(action.voter)
                }
            }     
        case t.SUBMIT_ANSWER:
            
            if (!state.room || state.room && state.room.id !== action.roomId) return state;

            return {
                ...state,
                room: {
                    ...state.room,
                    finalAnswer: action.answer,
                }
            }     
        case t.TYPE_ANSWER:
            
            if (!state.room || state.room && state.room.id !== action.roomId) return state;

            return {
                ...state,
                room: {
                    ...state.room,
                    answer: action.answer,
                }
            }     
        case t.START_GAME:
        case t.SET_CURRENT_PLAYER: {
            console.log(t.START_GAME, action);
            const roomIndex = state.rooms.findIndex(room => room.id === action.roomId);

            const oldRoom = state.rooms[roomIndex];
            const newRoom = {
                ...oldRoom,
                currentPlayerId: action.currentPlayerId,
                    question: action.question,
                    truthOrDareChoice: null,
                    finalAnswer: null,
                    answer: null,

                    readyUsers: [],
                    voters: [],
            };

            return {
                ...state,
                activeRoomId: action.roomId,
                rooms: [
                    ...state.rooms.slice(0, roomIndex),
                    newRoom,
                    ...state.rooms.slice(roomIndex + 1)
                ]
            }
        }
        case t.NEXT_QUESTION: {
            const roomIndex = state.rooms.findIndex(room => room.id === action.roomId);
            console.log('NEXT QUESTIONNNNNNNNNNNNNN', action, state.rooms, roomIndex);

            if (!roomIndex) return state;

            const oldRoom = state.rooms[roomIndex];
            const newRoom = {
                ...oldRoom,
                question: action.question,
                choices: {},                
            };

            console.log(t.NEXT_QUESTION, oldRoom, newRoom, state.rooms);

            return {
                ...state,
                // activeRoomId: action.roomId,
                myChoice: null,
                rooms: [
                    ...state.rooms.slice(0, roomIndex),
                    newRoom,
                    ...state.rooms.slice(roomIndex + 1)
                ]
            }
        }
            // SET_NEXT_PLAYER
            // SET_NEXT_TURN
            // 
            // 
            // if (!state.room || state.room && state.room.id !== action.roomId) return state;
            // 
            // return {
            //     ...state,
            //     room: {
            //         ...state.room,
            //         currentPlayerId: action.currentPlayerId,
            //         question: null,
            //         choice: null,
            //         question: null,
            //         finalAnswer: null,
            //         answer: null,

            //         readyUsers: [],
            //         voters: [],
            //     }
            // }     
        case t.JOIN_ROOM: {
            // console.log(t.JOIN_ROOM, action);
            const roomIndex = state.rooms.findIndex(room => room.id === action.roomId);

            const oldRoom = state.rooms[roomIndex];

            // if (!oldRoom) return state;

            const user = oldRoom.users.find(user => user.id === action.user.id);
            if (user) {
                return {
                    ...state,
                    activeRoomId: action.roomId,
                }
            }
            
            const newRoom = {
                ...oldRoom,
                users: oldRoom.users.concat(action.user),
            };

            return {
                ...state,
                activeRoomId: action.roomId,
                rooms: [
                    ...state.rooms.slice(0, roomIndex),
                    newRoom,
                    ...state.rooms.slice(roomIndex + 1)
                ]
            }
        }
        case t.SET_ACTIVE_ROOM_ID: {
            return {
                ...state,
                activeRoomId: action.roomId,
            }
        }
            // if (state.activeRoomId)
            // if (!state.room || state.room && state.room.id !== action.roomId) return state;

            // return {
            //     ...state,
            //     room: {
            //         ...state.room,
            //         users: state.room.users.concat(action.user),
            //     }
            // }     
        case t.LEAVE_ROOM: {
            // console.log(t.JOIN_ROOM, action);
            const roomIndex = state.rooms.findIndex(room => room.id === action.roomId);

            const oldRoom = state.rooms[roomIndex];
            // console.log('LEAVEROOOOM', oldRoom);
            if (!oldRoom) return state;

            // const user = oldRoom.users.find(user => user.id === action.userId);
            // if (user) {
            //     return {
            //         ...state,
            //         activeRoomId: action.roomId,
            //     }
            // }
            
            const newRoom = {
                ...oldRoom,
                users: oldRoom.users.filter(user => user.id !== action.userId),
            };

            if (newRoom.users.length === 0) {
                return {
                    ...state,
                    rooms: state.rooms.filter(room => room.id !== action.roomId)
                }
            }

            return {
                ...state,
                activeRoomId: null,
                rooms: [
                    ...state.rooms.slice(0, roomIndex),
                    newRoom,
                    ...state.rooms.slice(roomIndex + 1)
                ]
            }
        }
            // // 
            // if (!state.room || state.room && state.room.id !== action.roomId) return state;

            // return {
            //     ...state,
            //     room: {
            //         ...state.room,
            //         users: state.room.users.filter(user => user.id !== action.userId),
            //     }
            // }     
        case t.SEND_MESSAGE: {
            const roomIndex = state.rooms.findIndex(room => room.id === action.roomId);

            const oldRoom = state.rooms[roomIndex];
            const newRoom = {
                ...oldRoom,
                messages: oldRoom.messages.concat(action.message)
            };

            return {
                ...state,
                rooms: [
                    ...state.rooms.slice(0, roomIndex),
                    newRoom,
                    ...state.rooms.slice(roomIndex + 1)
                ]
            }
        }   
        case t.SET_MY_CHOICE: {
            
            return {
                ...state,
                myChoice: action.choice
            }
        }   
        case t.SET_PROFILE: {
            
            return {
                ...state,
                profile: action.profile
            }
        }   
        case t.SET_LANGUAGE: {
            return {
                ...state,
                language: action.language
            }
        }   
        case t.SET_ROOM_SOCKET:
            return {
                ...state,
                socket: action.socket
            }        
        case t.QUIT_GAME:
            
            return {
                ...state,
                activeRoomId: null,
            }
        default:
            return state;
    }
}

export default reducer;