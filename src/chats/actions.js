

import axios from 'axios';

import * as t from './types';
import { fetchContacts } from './utils';



// export const api = 'http://10.0.2.2:8000/api';
// export const api = 'http://127.0.0.1:8000/api';
export const api = 'http://192.168.1.2:8000/api';


export const getChats = () => async (dispatch) => {
  dispatch({ type: t.CHATS_LOADING });
  
  try {
    // const res = await axios.get(`${api}/chats`);
    const res = await fetchContacts();

    // 

    dispatch({ type: t.CHATS_LOADED, chats: res.data })
  }
  catch (err) {
    
    dispatch({ type: t.CHATS_ERROR, err });
  }
}

export const getContacts = () => async (dispatch) => {
  try {
    const contacts = await fetchContacts();

    

    dispatch({ type: t.CONTACTS_LOADED, contacts })
  }
  catch (err) {
    
    dispatch({ type: t.CONTACTS_ERROR, err });
  }
}

export const getTags = () => async (dispatch) => {
  try {
      const res = await axios.get(`${api}/tags`);

      dispatch({ type: t.TAGS_LOADED, tags: res.data });
  }
  catch (err) {
      
      dispatch({ type: t.TAGS_ERROR, err });
  }
};

export const getFriends = () => async dispatch => {
  try {
      const res = await axios.get(`${api}/chats/friends`);

      dispatch({ type: t.FRIENDS_LOADED, friends: res.data });
  }
  catch (err) {
      
      dispatch({ type: t.FRIENDS_ERROR, err });
  }
};


// export const setSocket = (socket) => async (dispatch) => {
//   dispatch({ type: t.SET_SOCKET, socket });
// }