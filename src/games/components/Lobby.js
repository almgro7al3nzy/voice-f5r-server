import React, { useState, useEffect } from 'react'
import { 
  Animated,
  StatusBar,
  Platform, 
  View, 
  StyleSheet, 
  Text,
  FlatList, 
  TouchableNativeFeedback,
  TouchableHighlight,
  KeyboardAvoidingView,
  ActivityIndicator, Linking, TextInput, UIManager, LayoutAnimation, TouchableOpacity } from 'react-native';
import { Button, Grid, Touchable } from '../../Components';
// import colors from '../colors';
// import { sleep, configureTransition } from '../utils';
// import { stopGaming } from '../../actions';
import RoomItem from './RoomItem';
import LanguageModal from './LanguageModal';
import { useTheme, Safe } from '@react-navigation/native';
// import Logo from '../components/Logo2';
// import PersonItem from '../components/PersonItem';
// import Animated from 'react-native-reanimated';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { v4 as uuidv4 } from 'uuid';
import VoiceChatItem from '../../chats/components/VoiceChatItem';
import VoiceChatModal from './VoiceChatModal';
import { sleep } from '../../utils';



const State = {
  Launching: 'Launching',
  WillTransitionIn: 'WillTransitionIn',  
  WillTransitionOut: 'WillTransitionOut',
};

// SafeAreaView.setStatusBarHeight(0);

const Lobby = ({ route, navigation, user, rooms, 
  room, error, socket, stopGaming, setRoom, setRoomId, startGaming,
  setLanguage, language, people, game, activeTab, profiles,
  // truthOrDareSocket, neverHaveIEverSocket,
}) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      backgroundColor: 'blue',
      backgroundColor: colors.card,

      // backgroundColor: colors.background,
      paddingTop: 20,
      
      alignItems: 'center',
      justifyContent: 'space-around',


      // paddingHorizontal: 20,

      // padding: 20,
      // padding: 0,
      // paddingBottom: 10,
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

      // width: '100%',
      // justifyContent: 'space-between',

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
      // alignItems: 'center',
      // position: 'absolute',
      // bottom: 0,
      // left: 0,
      // right: 0,
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
      color: colors.text,
      fontSize: 18,
    },
    label: {
      color: colors.text3,
      fontSize: 18,
      marginRight: 10,
    },
    createBtn: {
      // flex: 1,
      // flexDirection: 'row',
      // alignItems: 'center',
      // borderColor: colors.border2,
      // borderWidth: 1,
      backgroundColor: colors.primaryLight,
      // backgroundColor: '#E6E6Ff',
      // marginVertical: 5,
      
      borderRadius: 10,
      width: '100%',
      paddingVertical: 10,
      marginVertical: 10,
      paddingHorizontal: 105,
      // justifyContent: 'center',
      alignSelf: 'stretch',
    },
    createBtnText: {
      color: colors.text,
      fontSize: 18,
      textAlign: 'center',
      // alignSelf: 'stretch',
    },
    preferences: {
      marginVertical: 20,
    },
    tabs: {
      flexDirection: 'row',
      marginVertical: 10,
    },
    tab: {
      // color: colors.text,
      // fontSize: 16,

      flex: 1,

      borderWidth: 1,
      borderColor: colors.text,
      // paddingHorizontal: 25,

      // textAlign: 'center',
      paddingVertical: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabText: {
      color: colors.text,
      fontSize: 16,

      // backgroundColor: colors.lightBackground,

      // textAlign: 'center',
    },









    details: {
      // justifyContent: 'center',
      flexDirection: 'row',
      // justifyContent: 'flex-end',
      // flex: 1,
      // marginLeft: 20,
      // textAlign: 'right',
      // alignSelf: 'flex-end'
      // alignItems: 'center',
      // backgroundColor: 'red',
      // flex: 1,
    },
    title: {
      color: colors.text3,
      fontWeight: 'bold',
      fontSize: 16,
  
      // backgroundColor: 'blue',
      // textAlign: 'center',
      // alignSelf: 'flex-end'
    },
    subtitle: {
      color: colors.text,
      fontSize: 20,
      // marginTop: 4,
      // backgroundColor: 'green',
      // flex: 1,
    },
    icon: {
      fontSize: 25,
      color: colors.text,
      marginLeft: 10,
      // backgroundColor: 'blue',
    },
    settings: {
      flexDirection: 'row',
    },
    languageText: {
      color: colors.text,
      fontSize: 16,
    }
  };

  const [voiceChatVisible, setVoiceChatVisible] = React.useState(false);
  

  React.useEffect(() => {
    route.params && route.params.users && socket && handleCreateRoom(route.params.users);

    const acceptInvite = () => {
      
      socket && rooms && room === undefined && route.params && route.params.roomId && handleJoinRoom(route.params.roomId)
    }

    acceptInvite();


    // 
  }, [socket, rooms]);

  const handleCreateRoom = (users) => {
    // const { id, name, username, gender, avatar } = user;
    
    try {
      console.log('handleCreateRoom');
      const roomId = uuidv4();

      socket.emit('create_room', 
        { users, roomId, game },
        (room) => { 
          
          // setRoom(room); 
          setRoomId(roomId); 
          navigation.navigate('Games', { screen: game }); 
          startGaming(game); 
        }
      );

      console.log('handleCreateRoomEMITTED');
      // socket.emit('create_room', { users, roomId: uuidv4(), game });
      
    }
    catch (err) {
      
      console.log(err);
    }
  }

  const handleJoinRoom = async (roomId) => {
    
    // console.log('handleJoinRoom', roomId, socket);
    try {
      
    if (activeTab === 'Voice Chats') {
      
      setVoiceChatVisible(true);
      return;
    }
    
    // const room = rooms.find(room => room.id === roomId);
    
    socket.emit('join_room', 
      { roomId, game, user: user.profile },
      () => {
        setRoomId(roomId); 
        navigation.navigate('Games', { screen: game }); 
        startGaming(game); 
      }
    );
    console.log('handleJoinRoomROOM');
    // if (!Boolean(room.users.find(u => u.id === user.profile.id))) {
    //   console.log('handleJoinRoomEMITTED');
    // }

    
    // await startGaming(game);
    // // setRoom(room);
    // setRoomId(roomId);


    // await sleep(10);
    // navigation.navigate('Games', { screen: game });

    

      

    // if (room.users.find(u => u.id === user.profile.id)) return;

    // socket.emit('join_room', { roomId, user: user.profile });
    }
    catch (err) {
      console.log(err);
    }
  }  

  const handleLeaveRoom = () => {
    try {
      
    } catch (err) {
      
    }
  }

  const voiceChats = [
    { id: 0, participants: profiles, },
    { id: 2, participants: profiles, },
    { id: 4, participants: profiles, },
  ]

  
  
  
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.preferences}>
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
      </View> */}

        {/* <View style={styles.settings}>
          <Text style={styles.languageText}>ENG</Text>
          <MaterialCommunityIcons name='numeric-5-box-outline' style={styles.icon} />
          <MaterialCommunityIcons name='timer-outline' style={styles.icon} />
        </View> */}

        {/* <View style={styles.details}>
          <Text style={styles.subtitle}>{4}/5</Text>
          <MaterialCommunityIcons name='account-multiple' style={styles.icon} />
        </View> */}

      

      {/* {activeTab === 'Voice Chats' && (
        <FlatList
          data={voiceChats}
          keyExtractor={({id}) => id.toString()}
          renderItem={({item}) => <VoiceChatItem {...item} onPress={() => handleJoinRoom(item.id)} />}
        /> 
      )} */}
      {/* {activeTab === 'Party Games' && ( */}
        <FlatList
          data={rooms}
          keyExtractor={({id}) => id.toString()}
          renderItem={({item}) => <RoomItem {...item} onPress={() => handleJoinRoom(item.id)} />}
        /> 
      {/* )} */}
      {!rooms && error && (
        <View>
          <Text>{error.message}</Text>
          <Button type={3} text='Reload' />
        </View>
      )}
      {/* {!rooms && !error && (
        <ActivityIndicator size='large' color={colors.primary} />
      )}        */}
      <Touchable 
        disabled={game === 'WouldYouRather'} 
        style={[styles.createBtn, game === 'WouldYouRather' && {backgroundColor:colors.background}]} 
        onPress={() => handleCreateRoom([user.profile])}
        background={colors.primaryDark}
      >
        <Text style={styles.createBtnText}>Create Room</Text>
      </Touchable>


      <VoiceChatModal
        isVisible={voiceChatVisible}
        hideModal={() => setVoiceChatVisible(false)}
        room={voiceChats[0]}
      />
          
      {/* </View> */}
    </SafeAreaView>
    )
}


export default Lobby;