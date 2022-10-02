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
} from 'react-native';
import Room from './screens/Room';
import Lobby from './screens/Lobby';
import RoomSocket from './Socket';
import { connect } from 'react-redux';
import { SET_CHAT, SET_PROFILE, SET_LANGUAGE } from './types';
import Modal from 'react-native-modal';
import QuitModal from './components/QuitModal'
import SettingsModal from './components/SettingsModal';



if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


const TruthOrDare = ({ route, navigation, room, rooms, setRoom, socket, user, profile, setProfile, setLanguage, language }) => {

  // 
  React.useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      if (!room || !gameVisible) return;

      e.preventDefault();

      // setQuitVisible(true);

      Alert.alert(
        'Discard changes?',
        'You have unsaved changes. Are you sure to discard them and leave the screen?',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => {} },
          { text: "Leave Game", style: 'destructive', onPress: () => {
            // stopGaming();

            setRoom(null);
              navigation.dispatch(e.data.action);
          } },
          { text: "Minimize", style: 'cancel', onPress: () => {
            // stopGaming();

              navigation.dispatch(e.data.action);
          } },
          
        ]
      );
      
    })
  }, [navigation, room]);

  const [quitVisible, setQuitVisible] = useState(false);
  const [gameVisible, setGameVisible] = useState(true);

  const handleMinimize = () => {
    navigation.navigate('Home');
    setGameVisible(false);
  }

  return (
    <Modal 
        isVisible={gameVisible}
        onBackButtonPress={navigation.goBack}
        // onBackdropPress={hideModal}
        // backdropOpacity={0.5}
        statusBarTranslucent        
        avoidKeyboard={false}        
        style={{
          justifyContent: 'flex-end',
          margin: 0,    
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
        {/* // <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'> */}
          {/* // <ScrollView> */}
    <RoomSocket>
      {room && (
        <Room 
          room={room} 
          socket={socket} 
          user={user} 
          profile={profile}
          setProfile={setProfile}
          showQuitModal={() => setQuitVisible(true)}
        />
      )}
      {!room && (
        <Lobby
          route={route} 
          setRoom={setRoom} 
          rooms={rooms} 
          socket={socket} 
          user={user}
          language={language}
          setLanguage={setLanguage}
        />
      )}

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
    />

    </RoomSocket>
    {/* </ScrollView>
    </KeyboardAvoidingView> */}
    </Modal>
  );
}


const mapStateToProps = state => ({
  user: state.auth.user,
  rooms: state.games.truthOrDare.rooms,
  room: state.games.truthOrDare.room,  
  language: state.games.truthOrDare.language,  
  profile: state.games.truthOrDare.profile,  
  error: state.games.truthOrDare.error,
  socket: state.games.truthOrDare.socket,
});

const mapDispatchToProps = dispatch => ({
  setRoom: (room) => dispatch({ type: SET_CHAT, room }),
  setProfile: (profile) => dispatch({ type: SET_PROFILE, profile }),
  setLanguage: (language) => dispatch({ type: SET_LANGUAGE, language }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TruthOrDare);


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
