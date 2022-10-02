import React, { useEffect } from 'react'
import store from '../store';
// import { store.dispatch } from '../../store';
import { connect } from 'react-redux';
import { io } from 'socket.io-client';
const ENDPOINT = 'http://192.168.1.2:8000/pins';
import * as t from './types';


const Socket = ({ children, user }) => {
  useEffect(() => {

    const socket = io(ENDPOINT, { transports: ['websocket'] });    

    socket.on('connect', () => {
      

      socket.emit('get_boards', 
        { userId: store.getState().auth.user && store.getState().auth.user.id }, 
        (boards) => store.dispatch({ type: t.BOARDS_LOADED, boards })
      );
    })

    // socket.on('get_boards', ({ boards }) => {
      
    //   
    //   store.dispatch({ type: t.BOARDS_LOADED, boards });
    // });

    socket.on('create_pin', (pin) => {

      
      store.dispatch({ type: t.CREATE_PIN, pin });
    });

    socket.on('delete_pin', ({ pinId }) => {

      
      store.dispatch({ type: t.DELETE_PIN, pinId });
    });
    
    store.dispatch({ type: t.SET_PINS_SOCKET, socket });

    return () => {
      socket.disconnect();
    }
  }, []);


  return children || null;
}


export default Socket;