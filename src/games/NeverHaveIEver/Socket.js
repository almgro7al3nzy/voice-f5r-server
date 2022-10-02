// import React, { useEffect } from 'react'
// import store from '../../store';
// // import { store.dispatch } from '../../store';
// import { connect } from 'react-redux';
// import { io } from 'socket.io-client';
// const ENDPOINT = 'http://192.168.1.2:8000/never_have_i_ever';
// import * as t from './types';


// const Socket = ({ children, user }) => {
//   useEffect(() => {
//     const socket = socketConnect();

    
//     return () => {
//       socket.disconnect();
//     }
//   }, []);

//   const socketConnect = () => {
//     const socket = io(ENDPOINT, { transports: ['websocket'], upgrade: false });

//     socket.on('connect', () => {
      

//       socket.emit('connected', 
//         { userId: store.getState().auth.user && store.getState().auth.user.id }, 
//         (rooms) => {
//           store.dispatch({ type: t.CHATS_LOADED, rooms });

          
//         }
//       );
//     })
    

//     socket.on('send_message', ({ message }) => {
      
//       store.dispatch({ type: t.SEND_MESSAGE, message })
//     });

//     socket.on('room_updated', ({ roomId, room }) => {
//       store.dispatch({ type: t.CHAT_UPDATED, room })
//     });

//     socket.on('start_game', ({ question }) => {
//       store.dispatch({ type: t.QUESTION_LOADED, question });
//     });

//     socket.on('choose_option', ({ userId, optionText }) => {
//       store.dispatch({ type: t.CHOOSE_OPTION, userId, optionText });
//     });






    
//     store.dispatch({ type: t.SET_CHAT_SOCKET, socket });

//     return socket;
//   }

//   return children || null;
// }


// export default Socket;



import React, { useEffect } from 'react'
import store from '../../store';
// import { store.dispatch } from '../../store';
import { connect } from 'react-redux';
import { io } from 'socket.io-client';
import { IP } from '../../utils';
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
    const socket = io(`${IP}/nhie`, { transports: ['websocket'], upgrade: false });

    socket.on('connect', () => {
      
      // console.log("NHIEconnect'");
      socket.emit('connected', 
        { userId: store.getState().auth.user && store.getState().auth.user.id }, 
        ({ rooms }) => {
          store.dispatch({ type: t.ROOMS_LOADED, rooms });
        }
      );
    })
    

    socket.on('send_message', ({ message, roomId }) => {
      
      store.dispatch({ type: t.SEND_MESSAGE, message, roomId })
    });

    socket.on('create_room', ({ room }) => {
      // console.log('socketCREATErOOM', room);
      store.dispatch({ type: t.CREATE_ROOM, room })
    });

    socket.on('room_updated', ({ roomId, room }) => {
      store.dispatch({ type: t.ROOM_UPDATED, room })
    });

    socket.on('join_room', ({ roomId, user }) => {
      // console.log('SOCKET JOIN_ROOM');
      store.dispatch({ type: t.JOIN_ROOM, roomId, user });
    });

    socket.on('leave_room', ({ roomId, userId, game }) => {
      console.log('nhieLEAVEROOMSOCKET');
      store.dispatch({ type: t.LEAVE_ROOM, roomId, userId, game });
    });

    socket.on('start_game', ({ roomId, currentPlayerId, question }) => {
      store.dispatch({ type: t.START_GAME, roomId, currentPlayerId, question });
    });
    
    // socket.on('choose_truth_or_dare', ({ roomId, truthOrDareChoice, question }) => {
    //   store.dispatch({ type: t.CHOOSE_TRUTH_OR_DARE, roomId, truthOrDareChoice, question });
    // });

    socket.on('choose_option', ({ optionText, roomId, userId }) => {
      console.log('NHIEchooseoptionSOCKET')
      store.dispatch({ type: t.CHOOSE_OPTION, optionText, roomId, userId });
    });

    socket.on('next_question', ({ question, roomId }) => {
      store.dispatch({ type: t.NEXT_QUESTION, question, roomId });
    });

    // socket.on('type_answer', ({ roomId, answer }) => {
    //   store.dispatch({ type: t.TYPE_ANSWER, roomId, answer });
    // });

    // socket.on('submit_answer', ({ roomId, answer }) => {
    //   store.dispatch({ type: t.SUBMIT_ANSWER, roomId, answer });
    // });

    // socket.on('vote_answer', ({ roomId, voter }) => {
    //   store.dispatch({ type: t.VOTE_ANSWER, roomId, voter });
    // });


    // socket.on('set_next_player', ({ roomId, currentPlayerId }) => {
    //   setTimeout(() => store.dispatch({ type: t.SET_CURRENT_PLAYER, roomId, currentPlayerId }),
    //   2000
    //   )
    // });


    // console.log('TRUTHORDARESOCKET', socket);
    store.dispatch({ type: t.SET_ROOM_SOCKET, socket });

    return socket;
  }

  return children || null;
}


export default Socket;