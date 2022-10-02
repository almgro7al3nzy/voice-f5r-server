import React, { useEffect } from 'react'
import store from '../../store';
// import { store.dispatch } from '../../store';
import { connect } from 'react-redux';
import { io } from 'socket.io-client';
const ENDPOINT = 'http://192.168.1.2:8000/poll';
import * as t from './types';


const Socket = ({ children, user }) => {
  useEffect(() => {
    const socket = socketConnect();

    
    // return () => {
    //   
    //   socket.disconnect();
    // }
  }, []);

  const socketConnect = () => {
    const socket = io(ENDPOINT, { transports: ['websocket'], upgrade: false });

    socket.on('connect', () => {
      

      socket.emit('connected', 
        { userId: store.getState().auth.user && store.getState().auth.user.id }, 
        ({ questions }) => {
          store.dispatch({ type: t.QUESTIONS_LOADED, questions });
        }
      );
    })
    

    socket.on('send_message', ({ message, roomId }) => {
      
      store.dispatch({ type: t.SEND_MESSAGE, message, roomId })
    });

    socket.on('create_room', ({ room }) => {
      store.dispatch({ type: t.CREATE_ROOM, room })
    });

    socket.on('room_updated', ({ roomId, room }) => {
      store.dispatch({ type: t.ROOM_UPDATED, room })
    });

    socket.on('join_room', ({ roomId, user }) => {
      store.dispatch({ type: t.JOIN_ROOM, roomId, user });
    });

    socket.on('leave_room', ({ roomId, userId, game }) => {
      store.dispatch({ type: t.LEAVE_ROOM, roomId, userId, game });
    });

    socket.on('start_game', ({ roomId, currentPlayerId }) => {
      store.dispatch({ type: t.START_GAME, roomId, currentPlayerId });
    });

    socket.on('type_answer', ({ roomId, answer }) => {
      store.dispatch({ type: t.TYPE_ANSWER, roomId, answer });
    });

    socket.on('submit_answer', ({ roomId, answer }) => {
      store.dispatch({ type: t.SUBMIT_ANSWER, roomId, answer });
    });

    socket.on('vote_answer', ({ roomId, voter }) => {
      store.dispatch({ type: t.VOTE_ANSWER, roomId, voter });
    });

    socket.on('choose_option', ({ roomId, choice, question }) => {
      store.dispatch({ type: t.CHOOSE_TRUTH_OR_DARE, roomId, choice, question });
    });

    socket.on('set_next_player', ({ roomId, currentPlayerId }) => {
      setTimeout(() => store.dispatch({ type: t.SET_CURRENT_PLAYER, roomId, currentPlayerId }),
      2000
      )
    });


    
    store.dispatch({ type: t.SET_ROOM_SOCKET, socket });

    return socket;
  }

  return children || null;
}


export default Socket;