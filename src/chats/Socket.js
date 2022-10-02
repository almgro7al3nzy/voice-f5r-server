import React, { useEffect } from 'react'
import store from '../store';
// import { store.dispatch } from '../../store';
import { connect } from 'react-redux';
import { io } from 'socket.io-client';
// const IP = 'http://192.168.1.2:8000/chats';
import { IP } from '../utils';
import * as t from './types';


const Socket = ({ children, user }) => {
  useEffect(() => {
    const socket = socketConnect();

    
    return () => {
      socket.disconnect();
    }
  }, []);

  const socketConnect = () => {
    const socket = io(`${IP}/chats`, { transports: ['websocket'] });
    

    socket.on('connect', () => {
      

      socket.emit('connected', 
        { userId: store.getState().auth.user && store.getState().auth.user.id }, 
        (chats, profiles, spaces) => store.dispatch({ type: t.CHATS_LOADED, chats, profiles, spaces })
      );
    })

    socket.on('send_message', (message) => {
      store.dispatch({ type: t.SEND_MESSAGE, message })
    })

    socket.on('create_chat', (chat) => {
      store.dispatch({ type: t.CREATE_CHAT, chat })
    });


    
    store.dispatch({ type: t.SET_CHATS_SOCKET, socket });

    return socket;
  }

  return children || null;
}


export default Socket;