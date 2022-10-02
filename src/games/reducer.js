import { combineReducers } from 'redux';
import truthOrDare from './TruthOrDare/reducer';
import neverHaveIEver from './NeverHaveIEver/reducer';
import poll from './Poll/reducer';


import * as t from './types';



export const initialState = {
    game: null,
    gameIndex: 0,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // case t.ROOMS_LOADED:
            
        //     return {
        //         ...state,
        //         rooms: action.rooms
        //     }  
        // case t.CREATE_ROOM: {
        //     // 

        //     
        //     state.rooms[action.game].length,
        //     state.rooms[action.game].concat(action.room)
        //     );
        //     return {
        //         ...state,
        //         rooms: {
        //             ...state.rooms,
        //             [action.game]: state.rooms[action.game].concat(action.room)
        //         }
        //     }    
        // }
        // case t.JOIN_ROOM:
        // 
        //     // if (!state.room || state.room && state.room.id !== action.roomId) return state;
        //     const roomIndex = state.rooms[action.game].findIndex(room => room.id === action.roomId)

        //     const oldRoom = state.rooms[action.game][roomIndex];
        //     const newRoom = {
        //         ...oldRoom,
        //         users: oldRoom.users.concat(action.user),
        //     }

        //     return {
        //         ...state,
        //         rooms: {
        //             ...state.rooms[action.game].slice(0, roomIndex),
        //             newRoom,
        //             ...state.rooms[action.game].slice(roomIndex)
        //         }
        //     }   
        // case t.LEAVE_ROOM: {
        //     // 
        //     // if (!state.room || state.room && state.room.id !== action.roomId) return state;
        //     const roomIndex = state.rooms[action.game].findIndex(room => room.id === action.roomId)

        //     const oldRoom = state.rooms[action.game][roomIndex];
        //     const newRoom = {
        //         ...oldRoom,
        //         users: oldRoom.users.filter(user => user.id !== action.userId),
        //     }

        //     return {
        //         ...state,
        //         rooms: {
        //             ...state.rooms[action.game].slice(0, roomIndex),
        //             newRoom,
        //             ...state.rooms[action.game].slice(roomIndex)
        //         }
        //     }   
        // }
        //     // return {
        //     //     ...state,
        //     //     room: {
        //     //         ...state.room,
        //     //         users: state.room.users.filter(user => user.id !== action.userId),
        //     //     }
        //     // }  
        case t.SET_GAME:     
               
            return {
                ...state,
                game: action.game
            }
        case t.SET_GAME_INDEX:     
            
            return {
                ...state,
                gameIndex: action.gameIndex
            }
        // case t.SET_ROOM: {
        //     
        //     return {
        //         ...state,
        //         room: action.room
        //     }
        // }   
        case t.SET_ROOM_ID: {
            
            return {
                ...state,
                roomId: action.roomId
            }
        }   
        // case t.SET_GAMES_SOCKET: {
        //     return {
        //         ...state,
        //         socket: action.socket
        //     }  
        // }   
        default:
            return state;
    }
}

const reducer2 = (state = {}, action) => {
    switch (action.type) {
        case t.ROOMS_LOADED:            
            return {
                ...state,
                rooms: action.rooms
            }            
        case t.SET_ROOM_ID: {
            
            return {
                ...state,
                roomId: action.roomId
            }
        }
        case t.SEND_MESSAGE:
            const roomIndex = state.chats.findIndex(room => room.id === action.message.roomId);

            const updatedRoom = {
                ...state.chats[roomIndex],
                messages: state.chats[roomIndex].messages.concat(action.message)
            }

            return {
                ...state,
                chats: [
                    ...state.chats.slice(0, roomIndex),
                    updatedRoom,
                    ...state.chats.slice(roomIndex + 1, state.chats.length)
                ]
            }
        case t.SET_BOARD_ID:
            
            return {
                ...state,
                activeBoardId: action.id
            }        
        case t.SPACES_LOADED:
            return {
                ...state,
                spaces: action.spaces
            }        
        case t.BOARDS_LOADED:
            
            return {
                ...state,
                boards: action.boards
            }  
        case t.CREATE_PIN: {
            
          const boardIndex = state.boards.findIndex(
            board => board.id === action.pin.boardId
          );

          if (boardIndex === -1) return state;

          const oldBoard = state.boards[boardIndex];
          const newBoard = { ...oldBoard, pins: oldBoard.pins.concat(action.pin) };

          
        //     ...state,
        //     boards: [
        //       ...state.boards.slice(0, boardIndex),
        //       newBoard,
        //       ...state.boards.slice(boardIndex, state.boards.length)
        //     ]
        // });

          return {
              ...state,
              boards: [
                ...state.boards.slice(0, boardIndex),
                newBoard,
                ...state.boards.slice(boardIndex, state.boards.length)
              ]
          }  
        }
        case t.SET_PINS_SOCKET: {     
            
            return {
                ...state,
                socket: action.socket
            }
        }
        case t.DELETE_PIN: {   
            const boardIndex = state.boards.findIndex(
                board => board.pins.find(
                    pin => pin.id === action.pinId
                )
            )

            const oldBoard = state.boards[boardIndex]
            const newBoard = {
                ...oldBoard,
                pins: oldBoard.pins.filter(pin => pin.id !== action.pinId)
            }
            
            return {
                ...state,
                boards: [
                    ...state.boards.slice(0, boardIndex),
                    newBoard,
                    ...state.boards.slice(boardIndex + 1, state.boards.length)
                ]
            }
        }
        case t.BOARDS_ERROR:
        case t.SPACES_ERROR:
            return {
                ...state,
                error: action.err
            }  
        default:
            return state;
    }
}



export default combineReducers({
    games: reducer,
    rooms: reducer2,
    truthOrDare,
    neverHaveIEver,
    // poll,
    // ...reducer,
});