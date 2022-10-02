// import * as t from './types';

// export const initialState = {
//     rooms: undefined,
//     room: undefined,
//     language: 'English',
//     error: null,
// }

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case t.QUESTIONS_LOADED:
            
//             return {
//                 ...state,
//                 questions: action.questions
//             }        
//         case t.ROOMS_LOADED:
            
//             return {
//                 ...state,
//                 rooms: action.rooms
//             }        
//         case t.ROOMS_ERROR:
//             return {
//                 ...state,
//                 error: action.err
//             }        
//         case t.ROOM_UPDATED:
//             const roomIndex = state.rooms.findIndex(
//                 room => room.id === action.room.id
//             );

//             return {
//                 ...state,
//                 rooms: [
//                     ...state.rooms.slice(0, roomIndex),
//                     action.room,
//                     ...state.rooms.slice(roomIndex + 1, state.rooms.length)
//                 ]
//             }       
//         case t.CREATE_ROOM:
//             // 
//             return {
//                 ...state,
//                 rooms: state.rooms.concat(action.room)
//             }     
//         case t.CHOOSE_TRUTH_OR_DARE:
            
//             if (!state.room || state.room && state.room.id !== action.roomId) return state;

//             return {
//                 ...state,
//                 room: {
//                     ...state.room,
//                     choice: action.choice,
//                     question: action.question
//                 }
//             }     
//         // case t.SET_CURRENT_PLAYER:
//         //     
//         //     if (!state.room || state.room && state.room.id !== action.roomId) return state;

//         //     return {
//         //         ...state,
//         //         room: {
//         //             ...state.room,
//         //             currentPlayerId: state.room.voters.concat(action.voter)
//         //         }
//         //     }     
//         case t.VOTE_ANSWER:
            

//             if (!state.room || state.room && state.room.id !== action.roomId) return state;

//             return {
//                 ...state,
//                 room: {
//                     ...state.room,
//                     voters: state.room.voters.concat(action.voter)
//                 }
//             }     
//         case t.SUBMIT_ANSWER:
            
//             if (!state.room || state.room && state.room.id !== action.roomId) return state;

//             return {
//                 ...state,
//                 room: {
//                     ...state.room,
//                     finalAnswer: action.answer,
//                 }
//             }     
//         case t.TYPE_ANSWER:
            
//             if (!state.room || state.room && state.room.id !== action.roomId) return state;

//             return {
//                 ...state,
//                 room: {
//                     ...state.room,
//                     answer: action.answer,
//                 }
//             }     
//         case t.START_GAME:
//         case t.SET_CURRENT_PLAYER:
//             // SET_NEXT_PLAYER
//             // SET_NEXT_TURN
            
//             if (!state.room || state.room && state.room.id !== action.roomId) return state;

//             return {
//                 ...state,
//                 room: {
//                     ...state.room,
//                     currentPlayerId: action.currentPlayerId,
//                     question: null,
//                     choice: null,
//                     question: null,
//                     finalAnswer: null,
//                     answer: null,

//                     readyUsers: [],
//                     voters: [],
//                 }
//             }     
//         case t.JOIN_ROOM:
            
//             if (!state.room || state.room && state.room.id !== action.roomId) return state;

//             return {
//                 ...state,
//                 room: {
//                     ...state.room,
//                     users: state.room.users.concat(action.user),
//                 }
//             }     
//         case t.LEAVE_ROOM:
//             // 
//             if (!state.room || state.room && state.room.id !== action.roomId) return state;

//             return {
//                 ...state,
//                 room: {
//                     ...state.room,
//                     users: state.room.users.filter(user => user.id !== action.userId),
//                 }
//             }     
//         case t.SEND_MESSAGE: {
//             const roomIndex = state.rooms.findIndex(room => room.id === action.roomId);

//             const oldRoom = state.rooms[roomIndex];
//             const newRoom = {
//                 ...oldRoom,
//                 messages: oldRoom.messages.concat(action.message)
//             };

//             return {
//                 ...state,
//                 rooms: [
//                     ...state.rooms.slice(0, roomIndex),
//                     newRoom,
//                     ...state.rooms.slice(roomIndex + 1)
//                 ]
//             }
//         }   
//         case t.SET_ROOM: {
            
//             return {
//                 ...state,
//                 room: action.room
//             }
//         }   
//         case t.SET_PROFILE: {
            
//             return {
//                 ...state,
//                 profile: action.profile
//             }
//         }   
//         case t.SET_LANGUAGE: {
//             return {
//                 ...state,
//                 language: action.language
//             }
//         }   
//         case t.SET_ROOM_SOCKET:
//             return {
//                 ...state,
//                 socket: action.socket
//             }        
//         case t.QUIT_GAME:
            
//             return initialState;
//         // case t.QUIT_GAME:
//         //     
//         //         ...state,
//         //         ...initialState
//         //     }    );
//         //     return {
//         //         ...state,
//         //         ...initialState
//         //     }        
//         default:
//             return state;
//     }
// }

// export default reducer;