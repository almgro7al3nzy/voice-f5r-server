import { useTheme } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View, StatusBar, KeyboardAvoidingView, ScrollView } from 'react-native'
import colors from '../colors'
import Chat from '../components/Chat'
import Game from '../components/Game'
import ProfileModal from '../components/ProfileModal'
import Sidebar from '../components/Sidebar'
import InviteFriendModal from '../components/InviteFriendModal';
import MessageInput from '../components/MessageInput'
import MessageList from '../components/MessageList'
// import Voice from '../../Voice';
import Voice from '../../components/Voice';
import Video from '../../components/Video';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotificationBar from '../components/NotificationBar'
import { sleep } from '../utils'
import { TRUTH, DARE } from '../types';




const Room = ({ 
  // room, room: { users },
  room, 
  rooms, roomId,
  socket, user, profile, setProfile, showQuitModal, chatSocket, chats }) => {
  const { colors } = useTheme();
  
  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.background,
      backgroundColor: 'grey',
      backgroundColor: colors.darkBackground,
      // paddingTop: StatusBar.currentHeight,
      // paddingTop: 200,
      // justifyContent: 'center',
      // alignItems: 'center',
      // paddingBottom: 50,
    },
    game: {
      flex: 1,
      // paddingTop: StatusBar.currentHeight,
    },
    sidebar: {
      // flex: 1,
      position: 'absolute',
      zIndex: 1000,
      // left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    chat: {
      position: 'absolute',
      // zIndex: 2,
      // flex: 1,
      
      bottom: 0,
      // bottom: 50,
      // bottom: 100,
      left: 0,
      right: 0,
    },
    // roomCode: {
    //   // margin: 100,
    //   position: 'absolute',
    //   top: 50,
    //   // left: '50%',
    //   // alignItems: 'center',
    //   zIndex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: 'green',
    //   // width: '100%',
    //   // flex: 1,
    // },
    // code: {
    //   // backgroundColor: 'blue',
    //   // justifyContent: 'center',
    //   // alignItems: 'center',
    // },
    // codeLabel: {
    //   fontSize: 20,
    //   color: colors.darkText,
    // },
    // codeValue: {
    //   fontSize: 20,
    //   color: colors.darkText,
    // }
  };
  
  // const [room, setRoom] = React.useState(rooms.find(room => room.id === roomId));
  // const [users, setUsers] = React.useState(room.users);

  const [timer, setTimer] = React.useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = React.useState(null);

  const [inviteFriendsVisible, setInviteFriendsVisible] = React.useState(false);

  const [voiceConnected, setVoiceConnected] = React.useState(true);

  const [toastMessage, setToastMessage] = React.useState(null);


  
    const usePrevious = (value) => {
      const ref = React.useRef();
      React.useEffect(() => {
        ref.current = value;
      });
      return ref.current;
    }

  const prevUsers = usePrevious(users);


  React.useEffect(() => {
    // console.log('users updated', users);
    
    if (!prevUsers) return;

    if (prevUsers.length < users.length) {
      
      const userJoined = users.find(u => !prevUsers.includes(u))
      

      const person = userJoined.id === user.id ? 'You' : userJoined.name
      setToastMessage(`${person} Joined`);
    }
    
    else if (prevUsers.length > users.length) {
      const userLeft = prevUsers.find(u => !users.includes(u))
      const person = userLeft.id === user.id ? 'You' : userLeft.name

      
      setToastMessage(`${person} Left`);
    }



  }, [users])

  const handleInviteFriend = (userId) => {

    

    const chatId = chats.find(chat => chat.participants.find(participant => participant.id === userId)).id

    // const text = 'Invited to Truth or Dare';
    
    
    // { text, chatId, userId }
    chatSocket.emit('invite_friend', {senderId: user.id, chatId, text: room.id, type: 'truthOrDare'});
  }

  const handlePressStart = () => {
    
    // socket.emit('set_current_player', { roomId,  });
    socket.emit('start_game', { roomId: room.id, currentPlayerId: user.id });
  }

  // const room = rooms.find(room => room.id === roomId)
  const users = room && room.users
  // console.log('Room  room', roomId, room, rooms, );

  if (!room) return null;
  // if (!room) sleep(3)
  // console.log('roomprofile', profile, Boolean(profile));

  return (
    <View style={styles.container} behavior='padding'>
      {/* <KeyboardAvoidingView behavior='padding' style={{}}> */}
        {/* <ScrollView contentContainerStyle={{}}> */}
        
      <NotificationBar message={toastMessage} />

      <View style={styles.game}>
        <Game 
          startDisabled={users && users.length < 2} 
          roomId={room.id} 
          room={room} 
          timer={timer}
          setTimer={setTimer}
          socket={socket}
          answer2={room.answer}   
          question={room.question}   
          truthOrDareChoice={room.truthOrDareChoice}
          userChoiceId={room.userChoiceId}
          user={user}

          currentPlayerId={room.currentPlayerId}

          onPressStart={handlePressStart}

          // isCurrentPlayer={users.findIndex(u => u.id === user.id) === currentPlayerIndex}
          currentPlayerIndex={currentPlayerIndex}
          setCurrentPlayerIndex={setCurrentPlayerIndex}
        />
      </View>
      {/* {voiceConnected && <Voice roomId={room.id} userId={user.id} truthOrDareChoice={room.truthOrDareChoice} />} */}
      <View style={styles.sidebar}>
        <Sidebar 
          style={styles.sidebar} 
          users={users} 
          setProfile={setProfile} 
          showQuitModal={showQuitModal} 
          roomCode={room.id}
          voters={room.voters}
           
          timer={timer}
          setTimer={setTimer}

          currentPlayerId={room.currentPlayerId}

          currentPlayerIndex={currentPlayerIndex}
          setCurrentPlayerIndex={setCurrentPlayerIndex}

          onShowInviteFriends={() => setInviteFriendsVisible(true)}
          // friends={user.friends}
          // onInviteFriend={handleInviteFriend}
        />
      </View>

      <View style={styles.chat}>
        {/* <Chat 
          messages={room.messages}
          socket={socket}
          roomId={room.id}
          user={user}
        /> */}
        <MessageList messages={room.messages} />

        {voiceConnected && (
          <Voice 
            roomId={room.id} 
            userId={user.id}
            // currentPlayer={room.currentPlayerId === user.id} 
            currentPlayerId={room.currentPlayerId}
            // currentPlayerSocketId={room.currentPlayerSocketId}
            truthOrDareChoice={room.truthOrDareChoice} 
          />
        )}

        {room.truthOrDareChoice === DARE && (
          <Video 
            roomId={room.id} 
            userId={user.id}
            currentPlayerId={room.currentPlayerId}
            truthOrDareChoice={room.truthOrDareChoice} 
          />
        )}

        <MessageInput 
          socket={socket} 
          roomId={room.id} 
          sender={{ username: user.username, avatar: user.avatar }} 
          userId={user.id}
          truthOrDareChoice={room.truthOrDareChoice}
        />

        
      </View>

      <ProfileModal profile={profile} isVisible={Boolean(profile)} hideModal={() => setProfile(null)} />

      <InviteFriendModal
        isVisible={inviteFriendsVisible}
        hideModal={() => setInviteFriendsVisible(false)}
        friends={user.friends}
        onInviteFriend={handleInviteFriend}
      />
      {/* </ScrollView> */}
      {/* </KeyboardAvoidingView> */}
    </View>
  );
}

export default Room;