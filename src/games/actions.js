import * as t from './types';


// export const setGame = (game) => async (dispatch) => {  
//   try {

//     dispatch({ type: t.SET_GAME, game })
//   }
//   catch (err) {
    
//     
//   }
// }
export const startGaming = (game) => async (dispatch) => {  
  try {

    dispatch({ type: t.SET_GAME, game })
  }
  catch (err) {
    
    
  }
}

export const stopGaming = () => async (dispatch) => {  
  try {

    dispatch({ type: t.SET_GAME, game: null })
  }
  catch (err) {
    
    
  }
}