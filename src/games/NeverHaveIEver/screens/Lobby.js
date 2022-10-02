import React, { useState, useEffect } from 'react'
import { 
  Animated,
  Platform, 
  View, 
  StyleSheet, 
  Text,
  FlatList, 
  TouchableNativeFeedback,
  KeyboardAvoidingView,
  ActivityIndicator, Linking, TextInput, UIManager, LayoutAnimation, TouchableOpacity } from 'react-native';
import { Button } from '../../../Components';
// import colors from '../colors';
import { sleep, configureTransition } from '../../utils';
import { stopGaming } from '../../actions';
import RoomItem from '../components/RoomItem';
import LanguageModal from '../components/LanguageModal';
import { useTheme } from '@react-navigation/native';
import Logo from '../components/Logo2';
// import RoomItem from '../components/RoomItem';
// import Animated from 'react-native-reanimated';



const State = {
  Launching: 'Launching',
  WillTransitionIn: 'WillTransitionIn',  
  WillTransitionOut: 'WillTransitionOut',
};



const Lobby = ({ route, navigation, user, rooms, error, socket, stopGaming, setRoom, setLanguage, language }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.darkBackground,
      // backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'space-around',
      // paddingHorizontal: 20,
      padding: 20,
    },
    content: {
      flex: 1,
      // paddingBottom: 20,
      // paddingTop: 20,
      backgroundColor: '#fff',
      backgroundColor: colors.card,
      backgroundColor: colors.background,
      backgroundColor: colors.darkBackground,
      // paddingRight: 24,
      // paddingLeft: 24,
      width: '100%',
      justifyContent: 'space-between',
      // marginVertical: 20,
      // marginTop: 20,
    },    
    name: {
      backgroundColor: colors.background,
      backgroundColor: colors.darkBackground,
      flex: 0.25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    heading: {
      // paddingLeft: 24,
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text3,
      paddingVertical: 10,
    },
    nameText: {
      // backgroundColor: colors.background,
      fontFamily: 'CabinSketch',
      // fontFamily: 'TrainOne',
      fontSize: 50,
      color: 'firebrick',
      // color: colors.primary,
    },
    input: {
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    textInput: {
      // backgroundColor: colors.card4,
      height: 70,
      width: 300,
      width: '100%',
      padding: 10,
      color: colors.text,
      borderColor: colors.card4,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      fontSize: 20,
      textAlign: 'center',
      // textTransform: 'uppercase',
      // backgroundColor: colors.background,
      // marginTop: 10,
      // borderRadius: 15,
      // backgroundColor: '#ebf0fc'
    },
    language: {
      flexDirection: 'row',
    },
    languageValue: {
      color: colors.lightText,
      fontSize: 18,
    },
    label: {
      color: colors.text3,
      fontSize: 18,
      marginRight: 10,
    },
    createBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: colors.lightBorder,
      // borderWidth: 1,
      backgroundColor: colors.darkBackground3,
      marginVertical: 5,
      
      borderRadius: 10,
      width: '100%',
      paddingVertical: 15,
      // paddingHorizontal: 20,
      justifyContent: 'center',
    },
    createBtnText: {
      color: colors.lightText,
      fontSize: 18,
      textAlign: 'center',
    },
    preferences: {
      marginVertical: 20,
    }
  };

  const [transitionState, setTransitionState] = useState(State.Launching);
  const [roomCode, setRoomCode] = useState('');
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const [roomsOpacity, setRoomsOpacity] = useState(new Animated.Value(0));
  const [inputOpacity, setInputOpacity] = useState(new Animated.Value(0));

  

  useEffect(() => {
    
    const transitionIn = async () => {
      await sleep(500);

      await configureTransition(() => {
        setTransitionState(State.WillTransitionIn);
      });    

      Animated.timing(roomsOpacity, {
        toValue: 1,
        duration: 500,
        // delay: 500,
        useNativeDriver: true,
      }).start();

      Animated.timing(inputOpacity, {
        toValue: 1,
        duration: 500,
        delay: 100,
        useNativeDriver: true
      }).start();
    }


    

    transitionIn();
  }, []);

  React.useEffect(() => {
    if (route.params && route.params.users && socket) createRoom(route.params.users);

    // 
  }, [socket]);

  const handleJoinRoom = async (roomId) => {

    // await configureTransition(() => {
    //   setTransitionState(State.WillTransitionOut);
    // });


    const room = rooms.find(room => room.id === roomId);
    setRoom(room);

    


    socket.emit('join_room', { roomId, user: { username: user.username, avatar: user.avatar } });

  }  

  const createRoom = (users) => {
    // const { id, name, username, gender, avatar } = user;
    socket.emit('create_room', 
      { users },
      (room) => setRoom(room)
    );
  }

  

  const renderRooms = () => {
    return (
      <FlatList
        data={rooms}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <RoomItem {...item} onPress={() => handleJoinRoom(item.id)} />}
      /> 
    );
  }

  const renderError = () => {
    
    return (
      <View>
        {/* <Text>{error}</Text> */}
        <Button type={3} text='Reload' />
      </View>
    );
  }


  
  
  // return <RoomCodeInput />
  return (
    transitionState !== State.WillTransitionOut && (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <Logo />
      {/* <View style={styles.name}>
        <Text style={styles.nameText}>Truth or Dare</Text>
      </View> */}
      {/* {transitionState !== State.Launching && ( */}
      <View style={styles.preferences}>
        <View style={styles.language}>
          <Text style={styles.label}>Language:</Text>
          <TouchableOpacity onPress={() => setLanguageModalVisible(true)}>
            <Text style={styles.languageValue}>{language}</Text>
          </TouchableOpacity>
          <LanguageModal 
            isVisible={languageModalVisible} 
            hideModal={() => setLanguageModalVisible(false)}
            language={language}
            setLanguage={setLanguage} 
          />
        </View>
      </View>

        <View style={styles.content}>
          <Animated.View style={{ opacity: roomsOpacity }}>
            {/* <Text style={styles.heading}>Rooms</Text> */}
            
            {rooms ? renderRooms() : error ? renderError() : (
              <ActivityIndicator size='large' color={colors.primary} />
            )}
          </Animated.View>
          <Animated.View style={[styles.input, { opacity: inputOpacity }]}>
            {/* <RoomCodeInput onJoinRoom={handleJoinRoom} onCreateRoom={() => createRoom([user])} /> */}
            <TouchableNativeFeedback onPress={() => createRoom([user])}>
              <View style={styles.createBtn}>
                <Text style={styles.createBtnText}>Create Game</Text>
              </View>
            </TouchableNativeFeedback>
          </Animated.View>
      </View>
      {/* )} */}
    </KeyboardAvoidingView>
    )
  )
}


export default Lobby;

const styles = StyleSheet.create()
