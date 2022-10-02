import React, { useEffect } from 'react'
import store from './store';
import { io } from 'socket.io-client';
const ENDPOINT = 'http://192.168.1.2:8000';
import * as t from './types';

// import PartyGamesSocket from './games/Socket';
import TruthOrDareSocket from './games/TruthOrDare/Socket';
import NeverHaveIEverSocket from './games/NeverHaveIEver/Socket';
import ChatsSocket from './chats/Socket';
import GamesSocket from './games/Socket';
import PollSocket from './games/Poll/Socket';

const Socket = ({ children, user }) => {
  useEffect(() => {
    const socket = socketConnect();

    
    return () => {
      socket.disconnect();
    }
  }, []);

  const socketConnect = () => {
    const socket = io(ENDPOINT, { transports: ['websocket'] });
    

    socket.on('connected', games => {
      
      // store.dispatch({ type: t.GAMES_LOADED, games })
    });

    socket.on('room_update', ({ roomId, room }) => {
      // store.dispatch({ type: t.GAME_UPDATED, room })
    });


    
    store.dispatch({ type: t.SET_SOCKET, socket });

    return socket;
  }

  return (
    <ChatsSocket>
      <GamesSocket />
      <TruthOrDareSocket />
      <NeverHaveIEverSocket />
      <PollSocket />
        {children}
    </ChatsSocket>
  );
}


export default Socket;