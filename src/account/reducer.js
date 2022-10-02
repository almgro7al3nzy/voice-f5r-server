
import * as t from './types';


export const initialState = {
    theme: 'light',
    user: null,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case t.USER_LOADED:
            return {
                ...state,
                user: action.user
            }        
        case t.ROLES_LOADED:
            return {
                ...state,
                roles: action.roles
            }        
        case t.USER_ERROR:
            return {
                ...state,
                error: action.err
            }        
        // case t.ROLE_ADDED:
        //     return {
        //         ...state,
        //         error: action.err
        //     }        
        // case t.PHOTOS_ADDED:
        //     return {
        //         ...state,
        //         user: {
        //             ...state.user,
        //             profile: {
        //                 ...state.user.profile,
        //                 photos: action.photos
        //             }
        //         }
        //     }        
        case t.SET_THEME:
            
            return {
                ...state,
                theme: action.theme
            }
        default:
            return state;
    }
}

export default reducer;