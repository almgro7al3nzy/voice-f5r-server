import React, { useState, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, View, Alert, Image, FlatList, Dimensions,
  TouchableHighlight, BackHandler, TouchableNativeFeedback, TouchableOpacity, Keyboard } from 'react-native'
// import Voice from '../Voice3';


import { StatusBar, Text, Button } from '../../Components';
import ImageGrid from '../components/ImageGrid';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import { connect } from 'react-redux';
import { createImageMessage, createLocationMessage, createTextMessage } from '../utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ChatItem from '../components/ChatItem';
import Header from '../components/Header';
import { useTheme, useFocusEffect } from '@react-navigation/native';
import Modal from 'react-native-modal';
import ChooseGameModal from '../components/ChooseGameModal';


import KeyboardState from '../components/KeyboardState'
import MeasureLayout from '../components/KeyboardMeasureLayout'
import MessagingContainer, { INPUT_METHOD } from '../components/KeyboardMessagingContainer'
import VoiceChatItem from '../components/VoiceChatItem';




const ChatProfile = ({ route, navigation, chats, error, userId, socket, user, profiles }) => {
  // 
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      backgroundColor: "white",

      flexGrow: 1,
    },
    content: {
      flex: 1,
      backgroundColor: "blue",
      backgroundColor: colors.card,

      flexGrow: 1,
    },
    inputMethodEditor: {
      // flex: 1,
      // backgroundColor: "white"
    },
    toolbar: {
      borderTopWidth: 1,
      borderTopColor: colors.darkTranslucent,
      backgroundColor: colors.card,

      // position: 'absolute',
      // bottom: 0,
    },
    fullscreenOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'black',
      zIndex: 2,
    },
    fullscreenImage: {
      flex: 1,
      resizeMode: 'contain',
    },
  
    title: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'center',
  
      // width: '100%',
      // flex: 0,
  
      // backgroundColor: 'red',
      // marginLeft: -20,
    },
    avatar: {
      width: 40, 
      height: 40, 
      borderRadius: 20,    
      marginRight: 10,
    },
    name: {    
      marginLeft: 10,
      color: 'white',
      fontWeight: 'bold',
    },
    headerRight: {
      flexDirection: 'row',

      // marginRight: 10,
    },

    voiceChats: {
      flexGrow: 0,

      // backgroundColor: 'red',
      // flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    voiceChatItem: {
      marginHorizontal: 10,
      marginVertical: 20,
      backgroundColor: colors.background,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 30,

      // borderWidth: 3,
      // borderColor: colors.background4,

      // width: 44,
      // height: 44,
      // borderRadius: 100,

      alignSelf: 'flex-start',
    },
    voiceChatUserCount: {
      fontWeight: 'bold',
      // fontWeight: '900',
      color: colors.text3,
      fontSize: 18,
    },
    headerIcon: {
      borderRadius: 22,
      width: 44,
      height: 44,
    },
    // headerIcon: {
    //   fontSize: 22,
    //   color: colors.text2,
    //   marginRight: 5,
    // },
    headerTitle: {
      fontSize: 16,
      color: colors.text,
      fontWeight: 'bold',
    },
    headerRightIcon: {
      fontSize: 22,
      color: colors.text2,
      paddingHorizontal: 15,

      // borderWidth: 1,
    }
  };

  const { chatId } = route.params;
  const chat = chats.find(chat => chat.id === chatId);

  const otherUser = chat.participants.find(p => p.id !== userId);

  // 
  
  

  

  // const [messages, setMessages] = useState([
  //   createImageMessage('https://unsplash.it/300/300'),
  //   createTextMessage('World'),
  //   createTextMessage('Hello'),
  //   createLocationMessage({
  //     latitude: 37.78825,
  //     longitude: -122.4324
  //   })
  // ]);
  // const [messages, setMessages] = useState([]);

  const [fullscreenImageId, setFullscreenImageId] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [chooseGameVisible, setChooseGameVisible] = useState(false);
  const [voiceConnected, setVoiceConnected] = useState(false);
  const [inputMethod, setInputMethod] = useState(INPUT_METHOD.NONE);

  const [activeTab, setActiveTab] = React.useState('voice');

  const [selectedImages, setSelectedImages] = React.useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (
        <TouchableOpacity 
          style={styles.title}
          onPress={() => navigation.navigate('ChatProfile', { chatId })}
        >
          {/* <Image style={styles.avatar} source={{ uri: chat.icon || chat.participants.find(p => p.id !== user.id).profile.avatarSource }} /> */}
          <Image style={styles.avatar} source={{ uri: otherUser.profile.avatarSource }} />
          {/* <MaterialCommunityIcons name='bed' style={styles.headerIcon} /> */}
          <Text style={styles.headerTitle}>{chat.name || chat.participants.find(p => p.id !== user.id).name}</Text>
        </TouchableOpacity>
      ),
      headerStyle: { borderBottomColor: colors.border2, borderBottomWidth: 0.5, },
      // title: (
      //   <Header
      //     name={chat.name || otherUser && otherUser.name}
      //     icon={chat.icon || otherUser && otherUser.avatar}
      //     onPress={() => navigation.navigate('ChatProfile', { chatId })}
      //   />
      // ),

      // title: renderTitle(),
      headerTintColor: colors.text,
      // headerStyle: {
      //     backgroundColor: colors.primary
      // },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => setActiveTab('voice')}>
            <MaterialCommunityIcons 
              name='volume-high' 
              style={[styles.headerRightIcon, activeTab === 'voice' && {color: colors.primary} ]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('text')}>
            <MaterialCommunityIcons 
              name='text-box' 
              style={[styles.headerRightIcon, activeTab === 'text' && {color: colors.primary} ]} 
            />
          </TouchableOpacity>
        </View>
      ),
      // headerRight: () => (
      //   <View style={styles.headerRight}>
      //     {/* <TouchableOpacity >
      //       <MaterialCommunityIcons
      //           // name='phone-in-talk'
      //           name='account-voice'
      //           size={25}
      //           // style={{ color: colors.primary, marginRight: 10 }}
      //           style={{ color: colors.text, marginRight: 10 }}
      //           onPress={() => setVoiceConnected(!voiceConnected)}
      //       />
      //     </TouchableOpacity> */}
      //     <TouchableOpacity >
      //       <MaterialCommunityIcons
      //           name='volume-high'
      //           size={25}
      //           style={styles.headerRightButton}
      //       />
      //     </TouchableOpacity>
      //     <TouchableOpacity >
      //       <MaterialCommunityIcons
      //           // name='phone-in-talk'
      //           name='text-box'
      //           size={25}
      //           style={styles.headerRightButton}
      //       />
      //     </TouchableOpacity>
      //     {/* <MaterialCommunityIcons
      //         name='video'
      //         size={25}
      //         style={{ color: colors.text2, marginRight: 10 }}
      //         onPress={() => navigation.navigate('Contacts')}
      //     /> */}
      //     {/* <MaterialCommunityIcons
      //         name='gamepad-variant'
      //         size={25}
      //         style={{ color: colors.text2, marginRight: 10 }}
      //         onPress={() => setChooseGameVisible(true)}
      //     /> */}
      //   </View>
      // )
    });
  }, [navigation, otherUser, activeTab, setActiveTab]);


  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (fullscreenImageId) {
          setFullscreenImageId(null);
          return true;
        }
        return false;
      }

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
    }, [fullscreenImageId, setFullscreenImageId])
  );

  // useEffect(() => {
    
  //   const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
  //     if (fullscreenImageId) {
  //       dismissFullscreenImage();
  //       return true;
  //     }

  //     // else if (modalVisible) setModalVisible(false);

  //     // else navigation.goBack();

  //     return false
  //   });
    
  //   return () => {
  //     subscription.remove();      
  //   }
  // }, []);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  // const showChooseGame = () => setChooseGameVisible(true);
  // const hideChooseGame = () => setChooseGameVisible(false);

  const getOrCreateChat = (userId) => {
    // chats.find(chat => )
  }
  


  const renderTitle = () => {
    return (
      <View style={styles.title}>
        <Image style={styles.avatar} source={{ uri: chat.icon }} />
        <Text style={styles.name}>{chat.name}</Text>
      </View>
    )
  }

  


  const handleChangeInputMethod = (inputMethod) => {
    setInputMethod(inputMethod);
  }

  const handlePressImage = (uri) => {
    // setMessages([ createImageMessage(uri), ...messages ]);
    setSelectedImages(selectedImages.concat(uri));
  }

  const handlePressToolbarCamera = () => {
    // setModalVisible(!modalVisible);
    setIsInputFocused(false);
    setInputMethod(INPUT_METHOD.CUSTOM);
  }

  const handlePressToolbarLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords: { latitude, longitude } } = position;

      setMessages([ createLocationMessage({ latitude, longitude }), ...messages ]);
    })
  }

  const handleChangeFocus = isFocused => {
    setIsInputFocused(isFocused);
  }

  const handleSubmit = (text) => {
    // setMessages([ createTextMessage(text), ...messages ]);

    

    socket.emit('send_message', { text, chatId, senderId: user.id });
  }

  const dismissFullscreenImage = () => {
    setFullscreenImageId(null);
  }

  const handlePressMessage = ({ id, type }) => {
    switch (type) {
      case 'text':
        Alert.alert(
          'Delete message?',
          // 'This message will be permanently deleted',
          null,
          [
            {
              text: 'Cancel',
              style: 'cancel'
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => {
                setMessages(messages.filter(message => message.id !== id))
              }
            }
          ]
        );
        break;
      case 'image':
        setIsInputFocused(false);
        setFullscreenImageId(id);
        break;
      default:
        break;
    }
  }

  const renderFullscreenImage = () => {
    if (!fullscreenImageId) return null;

    const { uri } = messages.find(message => message.id === fullscreenImageId);

    if (!uri) return null;

    return (
      <TouchableHighlight style={styles.fullscreenOverlay} onPress={dismissFullscreenImage}>
        <Image style={styles.fullscreenImage} source={{ uri }} />
      </TouchableHighlight>
    )

  }

  const renderInputMethodEditor = () => (
    // change to modal wrapper
    <View style={styles.inputMethodEditor}>
      <ImageGrid onPressImage={handlePressImage} selectedImages={selectedImages} />
    </View>
  );

  const renderVoiceChatItem = ({ item: { userCount }, }) => {
    return (
      <TouchableOpacity onPress={() => {}} style={styles.voiceChatItem}>
        <Text style={styles.voiceChatUserCount}>0{userCount}</Text>
      </TouchableOpacity>
    )
  }

  // const voiceChats = [
  //   { id: 0, userCount: 1, },
  //   { id: 1, userCount: 2, },
  //   { id: 2, userCount: 1, },
  // ]

  // const voiceChats = [
  //   { id: 0, participants: [{ id: 0, name: 'David'}, { id: 1, name: 'Sofia'}]}
  // ]

  const voiceChats = [
    { id: 0, participants: profiles, },
    { id: 2, participants: profiles, },
    { id: 4, participants: profiles, },
  ]

  // 

  return (
    <View style={styles.container}>
      {/* <VoiceChatItem {...voiceChats[0]} /> */}
{/* 
      {activeTab === 'voice' && (
        <FlatList
          data={voiceChats}
          // renderItem={({item}) => <VoiceChatItem {...item} onJoinVoice={() => {}} socket={socket} />}
          renderItem={renderVoiceChatItem}
          keyExtractor={({id}) => id.toString()}
          showsVerticalScrollIndicator={false}
          horizontal
          style={styles.voiceChats}

          snapToAlignment={'start'}
          decelerationRate={'fast'}
          snapToInterval={Dimensions.get('screen').width}
        />
      )} */}

      {/* <VoiceChatItem {...voiceChats[0]} /> */}

      {/* {activeTab === 'voice' && (
        <FlatList
          data={voiceChats}
          renderItem={({item}) => <VoiceChatItem {...item} onJoinVoice={() => {}} socket={socket} />}
          keyExtractor={({id}) => id.toString()}
          showsVerticalScrollIndicator={false}
          horizontal
          style={styles.voiceChats}

          snapToAlignment={'start'}
          decelerationRate={'fast'}
          snapToInterval={Dimensions.get('screen').width}
        />
      )} */}

      <MeasureLayout>
        {layout => (
          <KeyboardState layout={layout}>
            {keyboardInfo => (
              <MessagingContainer
                {...keyboardInfo}
                inputMethod={inputMethod}
                onChangeInputMethod={handleChangeInputMethod}
                renderInputMethodEditor={renderInputMethodEditor}
              >
                 <View style={styles.content}>
                  {/* <MessageList messages={chat.messages&&chat.messages.reverse()} onPressMessage={handlePressMessage} /> */}
                  <MessageList messages={chat.messages&&chat.messages.reverse()} onPressMessage={handlePressMessage} navigation={navigation} />
                </View>
                
                <View style={styles.toolbar}>
                  <MessageInput
                    isFocused={isInputFocused}
                    onSubmit={handleSubmit}
                    onChangeFocus={handleChangeFocus}
                    // onPressCamera={showModal}
                    onPressCamera={handlePressToolbarCamera}
                    onPressLocation={handlePressToolbarLocation}
                  />
                </View>
              </MessagingContainer>
           

           

            )}
            </KeyboardState>
      )}
      </MeasureLayout>
      {renderFullscreenImage()}

      

     
      
      <ChooseGameModal
        isVisible={chooseGameVisible}
        hideModal={() => setChooseGameVisible(false)}
        playTruthOrDare={() => navigation.navigate('Games', { screen: 'TruthOrDare3', params: { users: chat.participants } })}
        playPartyTrivia={() => navigation.navigate('Games', { screen: 'TruthOrDare3', params: { users: chat.participants } })}
      />
      {/* {voiceConnected && <Voice roomId={chatId} userId={userId} />} */}
    </View>
  );
}

const mapStateToProps = state => ({
  chats: state.chats.chats,
  profiles: state.chats.profiles,
  error: state.chats.error,
  socket: state.chats.socket,
  userId: state.auth.user.id,
  user: state.auth.user,
})

export default connect(
  mapStateToProps,
  // { getChats, getContacts }
)(ChatProfile);


const styles = StyleSheet.create();
