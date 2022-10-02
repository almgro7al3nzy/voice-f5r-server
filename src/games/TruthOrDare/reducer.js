import * as t from './types';

export const initialState = {
    rooms: [],
    language: 'English',
    error: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
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
        case t.ROOM_UPDATED:
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
        case t.CREATE_ROOM:
            // console.log(t.CREATE_ROOM, state.rooms);
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
            // console.log(t.JOIN_ROOM, action);
            const roomIndex = state.rooms.findIndex(room => room.id === action.roomId);
            const oldRoom = state.rooms[roomIndex];            
            const newRoom = {
                ...oldRoom,
                userChoiceId: action.optionId,
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
        
            const roomIndex = state.rooms.findIndex(room => room.id === action.roomId);

            const oldRoom = state.rooms[roomIndex];
            const newRoom = {
                ...oldRoom,
                currentPlayerId: action.currentPlayerId,
                currentPlayerSocketId: action.currentPlayerSocketId,
                    question: null,
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
                // activeRoomId: null,
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
        case t.SET_ROOM: {
            
            return {
                ...state,
                room: action.room
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
        // case t.QUIT_GAME:
        //     
        //         ...state,
        //         ...initialState
        //     }    );
        //     return {
        //         ...state,
        //         ...initialState
        //     }        
        default:
            return state;
    }
}

export default reducer;