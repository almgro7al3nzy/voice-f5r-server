import React, { useState } from 'react'
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  UIManager,
  View,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import Room from './screens/Room';
import Lobby from './screens/Lobby';
// import RoomSocket from './Socket';
import { connect } from 'react-redux';
import { SET_ROOM, SET_PROFILE, SET_LANGUAGE, QUIT_GAME } from './types';
import Modal from 'react-native-modal';
import QuitModal from './components/QuitModal'
import SettingsModal from './components/SettingsModal';
import { useTheme, useNavigation, StackActions } from '@react-navigation/native';
// import { sleep } from '../../utils';
// import { configureTransition } from './utils';
// import { configureTransitionFast } from '../utils';
// import { setTheme } from '../../account/actions';
// import { startGaming, stopGaming } from '../actions';
import { SET_GAME } from '../types';



// if (
//   Platform.OS === 'android' &&
//   UIManager.setLayoutAnimationEnabledExperimental
// ) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }


const TruthOrDare = ({ route, navigation, 
  // roomId, 
  rooms, 
  chatSocket, chats, quitGame, people, gamesSocket, game,
  neverHaveIEverRoomId, truthOrDareRoomId,
  socket, user, profile, setProfile, setLanguage, language, stopGaming, startGaming }) => {

  // configureTransition()

  const { colors } = useTheme();

  const styles = {
    container: {
      justifyContent: 'flex-end',
      margin: 0,    
      backgroundColor: colors.darkBackground,
      flex: 1,
    },
  }

  // React.useEffect(() => {

    
  //   

  //   startGaming();

  // }, []);

  // React.useEffect(() => {

  //   const acceptInvite = () => {
  //     
  //     socket && room === undefined && route.params && route.params.roomId && handleJoinRoom(route.params.roomId)
  //   }

  //   acceptInvite();

  // }, [socket]);
  
  
  // const [room, setRoom] = React.useState(rooms.find(room => room.id === truthOrDareRoomId));
  // const [room, setRoom] = React.useState(null);
  const [quitVisible, setQuitVisible] = useState(false);
  const [gameVisible, setGameVisible] = useState(true);

  const [backHandler, setBackHandler] = React.useState(null);
  const [backAction, setBackAction] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', async (e) => {
      if (!truthOrDareRoomId) {
        stopGaming();
        quitGame();
        return;
      }

      e.preventDefault();

      

      // setBackHandler(() => navigation.dispatch(e.data.action))
      setBackAction(e.data.action)
      setQuitVisible(true);

    })


    return unsubscribe;
  }, [navigation, room]);

  const handleMinimize = () => {
    setQuitVisible(false);
    navigation.dispatch(backAction);

    // stopGaming();

  }

  const handleQuit = async () => {
    try {
      
      // set room = undefined

      // setTheme('light');
      
      // await sleep(3000);
      // setQuitVisible(false);


      // await setRoom(undefined);
      // await navigation.dispatch(backAction);
      setRoom(undefined);
      navigation.dispatch(backAction);
      
      stopGaming();

      if (!room) return;
      socket.emit('leave_room', { roomId: room.id, userId: user.id, game })
      // quitGame();
    }
    catch (err) {
      console.log(err);
    }

  }

  const handleBackToLobby = () => {
    setQuitVisible(false);

    socket.emit('leave_room', { roomId: room.id, userId: user.id })
    setRoom(null);

  }

  const setRoom = () => {}

  const room = rooms.find(room => room.id === truthOrDareRoomId);
  // setRoom(rooms.find(room => room.id === truthOrDareRoomId));
  // const room = rooms && rooms.find(room => room.id === truthOrDareRoomId || neverHaveIEverRoomId)

  // console.log('truthOrDareRoomId', truthOrDareRoomId, room, rooms);
  // console.log('truthOrDareRoomId', truthOrDareRoomId, room);
  return (
    <Modal 
        // isVisible={gameVisible}
        isVisible={true}
        onBackButtonPress={navigation.goBack}
        // onBackdropPress={hideModal}
        // backdropOpacity={0.5}
        
        // backdropColor='#ee535d'
        // transparent={false}

        statusBarTranslucent        

        // coverScreen={false}
        // deviceHeight={Dimensions.get('screen').height}

        avoidKeyboard={false}        
        style={{
          justifyContent: 'flex-end',
          margin: 0,    
          backgroundColor: colors.darkBackground,
          flex: 1,
          // height: Dimensions.get('window').height + StatusBar.currentHeight,
          // position: 'absolute',
        }}
        
        useNativeDriverForBackdrop={true}
        useNativeDriver={true}
        // animationIn='fadeIn'
        // animationOut='slideOutRight'
        // swipeDirection='right'
        // onSwipeComplete={hideModal}
        animationInTiming={500}
          // swipeThreshold={400}

      >
        {/* <View> */}
    {/* <View style={styles.container}> */}
    {/* <RoomSocket /> */}
      
      {true && (
        <Room 
          rooms={rooms}
          roomId={truthOrDareRoomId}
          room={truthOrDareRoomId && rooms.find(room => room.id === truthOrDareRoomId)} 
          socket={socket} 
          chatSocket={chatSocket} 
          chats={chats}
          user={user} 
          profile={profile}
          setProfile={setProfile}
          showQuitModal={() => setQuitVisible(true)}
        />
      )}
      {/* {!room && (
        <Lobby
          route={route} 
          setRoom={setRoom} 
          room={room}
          rooms={rooms} 
          people={people}
          socket={socket} 
          user={user}
          language={language}
          setLanguage={setLanguage}
        />
      )} */}

    {/* <QuitModal 
      isVisible={quitVisible} 
      hideModal={() => setQuitVisible(false)} 
      navigation={navigation}
      navigate={navigation.navigate}
      hideGame={() => setGameVisible(false)}
      onMinimize={handleMinimize}
    /> */}


    <SettingsModal 
      isVisible={quitVisible} 
      hideModal={() => setQuitVisible(false)} 
      navigation={navigation}
      // onQuit={() => navigation.dispatch(StackActions.pop(1))}
      // onQuit={() => navigation.goBack()}
      onQuit={handleQuit}
      onMinimize={handleMinimize}
      onBackToLobby={handleBackToLobby}
    />

    {/* </RoomSocket> */}
    {/* </View> */}
    </Modal>
    // </View>
  );
}


const mapStateToProps = state => ({
  user: state.auth.user,
  people: state.games.truthOrDare.people,
  rooms: state.games.truthOrDare.rooms,
  room: state.games.truthOrDare.room,  
  // roomId: state.games.truthOrDare.roomId,  
  // roomId: state.games.games.roomId,  
  truthOrDareRoomId: state.games.truthOrDare.activeRoomId,  
  neverHaveIEverRoomId: state.games.neverHaveIEver.activeRoomId,  
  language: state.games.truthOrDare.language,  
  profile: state.games.truthOrDare.profile,  
  error: state.games.truthOrDare.error,
  socket: state.games.truthOrDare.socket,
  gamesSocket: state.games.games.socket,
  game: state.games.games.game,

  chatSocket: state.chats.socket,
  chats: state.chats.chats,
});

const mapDispatchToProps = dispatch => ({
  // setRoom: (room) => dispatch({ type: SET_ROOM, room }),
  setProfile: (profile) => dispatch({ type: SET_PROFILE, profile }),
  setLanguage: (language) => dispatch({ type: SET_LANGUAGE, language }),
  stopGaming: () => dispatch({ type: SET_GAME, game: null }),
  quitGame: () => dispatch({ type: QUIT_GAME }),
  startGaming: () => dispatch({ type: SET_GAME, game: 'truthOrDare' }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TruthOrDare);


// const styles = StyleSheet.create({
//   container: {
//     right: 0,
//     left: 0,
//     top: 0,
//     bottom: 0,
//     position: 'absolute',
//     backgroundColor: 'transparent',


//     zIndex: 2,
//     opacity: 1,
//     backgroundColor: 'transparent',
//   }
// })
