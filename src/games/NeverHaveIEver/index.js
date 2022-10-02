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
  Dimensions
} from 'react-native';
import Room from './screens/Room';
import Lobby from './screens/Lobby';
// import RoomSocket from './Socket';
import { connect } from 'react-redux';
import { SET_MY_CHOICE, SET_PROFILE, SET_LANGUAGE, SET_ACTIVE_ROOM_ID } from './types';
import Modal from 'react-native-modal';
// import QuitModal from './components/QuitModal'
import SettingsModal from './components/SettingsModal';
import Game from './components/Game';
import Chat from './components/Chat';
import { stopGaming } from '../actions';
import { SET_GAME } from '../types';
// import changeNavigationBarColor from 'react-native-navigation-bar-color';



if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


const NeverHaveIEver = ({ route, navigation, room, roomId,
  rooms, setRoomId, socket, user, profile, setProfile, setLanguage, language,
  // question, choices, 
  stopGaming, myChoice, setMyChoice,
}) => {
  const [quitVisible, setQuitVisible] = useState(false);
  const [gameVisible, setGameVisible] = useState(true);
  const [backAction, setBackAction] = React.useState(null);

  React.useEffect(() => {
    
    // changeNavigationBarColor('translucent', false, true);
  }, []);
  
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', async (e) => {
      if (!roomId) {
        stopGaming();
        return;
      }

      e.preventDefault();

      

      // setBackHandler(() => navigation.dispatch(e.data.action))
      setBackAction(e.data.action)
      setQuitVisible(true);
      
    })


    return unsubscribe;
  }, [navigation, roomId]);




  const handleMinimize = () => {
    navigation.dispatch(backAction);

    stopGaming();

    setQuitVisible(false);
  }

  const handleQuit = async () => {
    
    try {
      // setTheme('light');
      console.log('leaveroom1')
      // await sleep(3000);
      await setRoomId(null);
      await navigation.dispatch(backAction);

      stopGaming();

      setQuitVisible(false);

      if (!roomId) return;
      socket.emit('leave_room', { roomId, userId: user.id })
        // quitGame();
        console.log('leaveroom2')
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleBackToLobby = () => {
    setRoomId(null);

    setQuitVisible(false);
  }

  console.log('neverhaveieverROOMID', rooms, roomId);
  
  
  return (
    <Modal 
        // isVisible={gameVisible}
        isVisible
        onBackButtonPress={navigation.goBack}
        // onBackdropPress={hideModal}
        // backdropOpacity={0.5}
        
        // backdropColor='#ee535d'
        // transparent={false}

        statusBarTranslucent        

        avoidKeyboard={false}        
        style={{
          justifyContent: 'flex-end',
          margin: 0,    
          // height: Dimensions.get('window').height + StatusBar.currentHeight,
          // position: 'absolute',
          backgroundColor: 'grey',
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
        {/* // <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'> */}
          {/* // <ScrollView> */}
    {/* <RoomSocket> */}
      {roomId && (
        <Room 
          rooms={rooms}
          roomId={roomId}
          room={roomId && rooms.find(room => room.id === roomId)} 
          socket={socket} 
          user={user} 
          // question={question}
          profile={profile}
          setProfile={setProfile}
          // showQuitModal={() => setQuitVisible(true)}
          myChoice={myChoice}
          setMyChoice={setMyChoice}
          showQuitModal={() => setQuitVisible(true)}
        />

        // <View style={{ flex: 1 }}>
        //   <Game 
        //     socket={socket} 
        //     userIds={room.users.map(user => user.id)}
        //     room={room}
        //     question={question}
        //     user={user}
        //   />
        //   <Chat 
        //     room={room}  
        //     profile={profile}
        //     setProfile={setProfile}
        //     choices={choices}
        //   />
        // </View>
      )}
      {/* {!room && (
        <Lobby
          route={route} 
          setRoomId={setRoomId} 
          rooms={rooms} 
          socket={socket} 
          user={user}
          language={language}
          setLanguage={setLanguage}
        />
      )} */}

    <SettingsModal 
      isVisible={quitVisible} 
      hideModal={() => setQuitVisible(false)} 
      onQuit={handleQuit}
      onMinimize={handleMinimize}
      onBackToLobby={handleBackToLobby}      
    />
    {/* </RoomSocket> */}
    {/* </ScrollView>
    </KeyboardAvoidingView> */}
    </Modal>
  );
}


const mapStateToProps = state => ({
  user: state.auth.user,
  rooms: state.games.neverHaveIEver.rooms,
  myChoice: state.games.neverHaveIEver.myChoice,  
  roomId: state.games.neverHaveIEver.activeRoomId,  
  language: state.games.neverHaveIEver.language,  
  profile: state.games.neverHaveIEver.profile,  
  error: state.games.neverHaveIEver.error,
  socket: state.games.neverHaveIEver.socket,
  // question: state.games.neverHaveIEver.question,
  // choices: state.games.neverHaveIEver.choices,
});

const mapDispatchToProps = dispatch => ({
  setMyChoice: (choice) => dispatch({ type: SET_MY_CHOICE, choice }),
  setRoomId: (roomId) => dispatch({ type: SET_ACTIVE_ROOM_ID, roomId }),
  setProfile: (profile) => dispatch({ type: SET_PROFILE, profile }),
  setLanguage: (language) => dispatch({ type: SET_LANGUAGE, language }),
  stopGaming: () => dispatch({ type: SET_GAME, game: null }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NeverHaveIEver);


const styles = StyleSheet.create({
  container: {
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'transparent',


    zIndex: 2,
    opacity: 1,
    backgroundColor: 'transparent',
  }
})
