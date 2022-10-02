import { combineReducers } from 'redux';
import { LOGOUT_SUCCESS } from './auth/types';

import chats from './chats/reducer';
import auth from './auth/reducer';
// import state from './state';
import account from './account/reducer';
import games from './games/reducer';



import * as t from './types';



export const initialState = {
    socket: null,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case t.SET_SOCKET:            
        
            return {
                ...state,
                socket: action.socket
            }
        default:
            return state;
    }
}





const appReducer = combineReducers({
    chats,
    app: reducer,
    account,
    auth,
    games
});

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;