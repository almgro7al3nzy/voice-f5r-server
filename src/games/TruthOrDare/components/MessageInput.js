import { useTheme } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, View, TextInput, ScrollView, Dimensions,
  TouchableOpacity, Animated, Keyboard } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Touchable, Text } from '../../../Components';
import { configureTransition } from '../../../utils';
import Voice from '../../components/Voice';
import { SafeAreaView } from 'react-native-safe-area-context';



const State = {
  Typing: 'Typing',
};


const MessageInput = ({ socket, roomId, sender, userId, truthOrDareChoice }) => {
  const { colors } = useTheme();

  const styles = {
    content: {
      flex: 1,
      // marginLeft: 50,
      backgroundColor: 'yellow',
    },
    container: {
      // flex: 1,

      // justifyContent: 'space-around',
      justifyContent: 'center',
      flexDirection: 'row',
      flexGrow: 1,

      // alignItems: 'center',
      alignItems: 'flex-end',
      paddingHorizontal: 10,
      paddingVertical: 10,
      // maxHeight: Dimensions.get('screen').height / 2,
      maxHeight: Dimensions.get('screen').height,
      // width: Dimensions.get('screen').width,
      // width: '100%',

      // position: 'absolute',
      // zIndex: 10000,
      // top: 0,
      // bottom: 0,
      // left: 0,
      // right: 0,
      // backgroundColor: 'green',
    },
    voiceView: {
      // padding: 20,
      backgroundColor: 'purple',
      // position: 'absolute',
      top: 0,
      bottom: 60,
      // bottom: 0,
      left: 0,
      right: 0,
      // width: '100%',
      marginBottom: 60,
    },
    message: {
      color: colors.lightText,
      // color: 'white',
      // height: 40,
      // padding: 50,
      flex: 1,
      // width: '100%',
      width: Dimensions.get('screen').width / 2,


      marginHorizontal: 5,
      paddingHorizontal: 15,
      paddingVertical: 5,
      fontSize: 16,
      backgroundColor: colors.lightTranslucent,
      backgroundColor: colors.darkTranslucent3,
      borderRadius: 10,
    },
    messageInput: {
      backgroundColor: 'blue',
      flex: 1,
      width: '100%',
    },
    sendButton: {
      zIndex: 2,
    },
    sendButtonIcon: {
      fontSize: 25,
      color: colors.lightText2,
    },
    icon: {
      fontSize: 25,
      color: colors.lightText2,

    },
    btn: {
      width: 38,
      height: 38,
      // marginHorizontal: 5,
      marginRight: 20,
      
      // backgroundColor: colors.darkTranslucent3,
      borderRadius: 10,
      // textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      // padding: 10,
    },
    reaction: {
      fontSize: 30,
      marginHorizontal: 5,
    },
    reactions: {
      flexDirection: 'row',
      // justifyContent: 'space-between',
      // alignItems: 'center',

      // paddingHorizontal: 10,
      // paddingVertical: 10,
    },
    buttons: {
      // // position: 'absolute',
      // zIndex: 11,
      // bottom: 0,
      // left: 0,
      flexDirection: 'row',
      backgroundColor: colors.darkTranslucent3,
      // paddingHorizontal: 10,
      // paddingVertical: 5,
      borderRadius: 10,
    },
  };

  const keyboardHeight = React.useRef(new Animated.Value(0)).current;
  const inputScaleX = React.useRef(new Animated.Value(1)).current;
  const reactionsScale = React.useRef(new Animated.Value(1)).current;

  const [transitionState, setTransitionState] = React.useState(null);

  const [text, setText] = React.useState('');
  const [mic, setMic] = React.useState(false);
  const [showMicSettings, setShowMicSettings] = React.useState(false);
  const [inputHeight, setInputHeight] = React.useState(null);

  const [voiceConnected, setVoiceConnected] = React.useState(true);

  const [showEmotes, setShowEmotes] = React.useState(false);
  

  React.useEffect(() => {

    configureTransition();


    let subscriptions
    if (Platform.OS === 'ios') {
      subscriptions = [
        Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow),
        Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide),
      ];
    }
    else {
      subscriptions = [
        Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow),
        Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide),
      ];
    }

    return () => {
      subscriptions.forEach(sub => sub.remove());
    }
  }, []);

  const handleKeyboardDidShow = (e) => {
    // 

    // configureTransition(() => {
    //   setTransitionState(State.Typing);
    // });
    
      setTransitionState(State.Typing);

    Animated.parallel([
      Animated.timing(keyboardHeight, {
        duration: e.duration,
        toValue: -e.endCoordinates.height-20,
        useNativeDriver: true,
      }),
      Animated.timing(inputScaleX, {
        duration: e.duration,
        toValue: 2,
        useNativeDriver: true,
      }),
      Animated.timing(reactionsScale, {
        duration: e.duration,
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }

  const handleKeyboardDidHide = (e) => {

    // configureTransition(() => {
    //   setTransitionState(null);
    // });

    setTransitionState(null);

    
    Animated.parallel([
      Animated.timing(keyboardHeight, {
        duration: e.duration,
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.timing(inputScaleX, {
        duration: e.duration,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(reactionsScale, {
        duration: e.duration,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  }








  const sendMessage = () => {
    
    socket.emit('send_message', { text, roomId, sender });

    setText('');
    // inputRef.current.focus();
  }

  const typingBackground = transitionState ? colors.darkBackground : 'transparent';

  return (
    // <Animated.View style={[styles.container, { transform: [{ translateY: keyboardHeight }] }]}>
    <SafeAreaView style={{ flex: 1 }}>
    <Animated.View style={{ transform: [{ translateY: keyboardHeight }]}}>
      {/* <View style={styles.voiceView}>
      {voiceConnected && <Voice roomId={roomId} userId={userId} truthOrDareChoice={truthOrDareChoice} />}
      </View> */}
      <ScrollView 
        style={[styles.content, { backgroundColor: typingBackground }]} 
        contentContainerStyle={styles.container}
        horizontal 
        showsHorizontalScrollIndicator={false}
      >
      {/* {transitionState !== State.Typing && (
      <Touchable style={styles.btn} background={colors.darkTranslucent2}>
        <MaterialCommunityIcons name='microphone-settings' style={styles.icon} />
      </Touchable>
      )} */}
      {transitionState !== State.Typing && (
        <View style={styles.buttons}>
            <Touchable 
              style={[styles.btn, {marginRight:0}, showMicSettings && {backgroundColor:colors.darkTranslucent4,marginRight:20}]} 
              background={colors.darkTranslucent2}
              onPress={() => setShowMicSettings(!showMicSettings)}
            >
              <MaterialCommunityIcons name='microphone-settings' style={styles.icon} />
            </Touchable>
            {showMicSettings && (
          // <View style={styles.row}>
          <>
            <TouchableOpacity style={styles.btn} >
              <MaterialCommunityIcons name='video' style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}>
              <MaterialCommunityIcons name='camera-retake' style={styles.icon} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.btn}>
              <MaterialCommunityIcons name='microphone' style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={() => {}}>
              <MaterialCommunityIcons name='headphones' style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}>
              <MaterialCommunityIcons name='phone-hangup' style={[styles.icon, {color:'red'}]} />
            </TouchableOpacity>
            {/* <TouchableOpacity style={[styles.btn, {backgroundColor: 'red'}]}>
              <MaterialCommunityIcons name='phone-hangup' style={styles.icon} />
            </TouchableOpacity> */}
            </>
          // </View>
            )}
        </View>
      )}

      {/* <View style={styles.voiceView}>
      {voiceConnected && <Voice roomId={roomId} userId={userId} truthOrDareChoice={truthOrDareChoice} />}
      </View> */}

      {/* <Animated.View style={{ transform: [{ scaleX: inputScaleX }]}}> */}
      {/* <View style={styles.messageInput}> */}
        <TextInput
          // ref={inputRef}
          style={[styles.message, inputHeight]}
          value={text}
          onChangeText={setText}
          onSubmitEditing={sendMessage}
          blurOnSubmit={false}
          returnKeyType='send'
          placeholder={'Send message...'}
          placeholderTextColor={colors.lightText3}
          // multiline
          textAlignVertical='top'
          // numberOfLines={4}
          maxLength={255}
          // onLayout={() => 
          // onContentSizeChange={(e) => 
          onContentSizeChange={(e) => setInputHeight(e.nativeEvent.contentSize.height)}
        />
      {/* </View> */}
      {/* </Animated.View> */}

      {transitionState === State.Typing && (
      <Touchable style={styles.sendButton} background={colors.background} onPress={sendMessage}>
        <MaterialCommunityIcons name='send' style={styles.icon} />
      </Touchable>
      )}

      

      {transitionState !== State.Typing && (
      // <Animated.View style={[styles.reactions, { transform: [{ scaleX: reactionsScale }] }]}>
      <Animated.View style={[styles.reactions,]}>
        <TouchableOpacity>
          <Text style={styles.reaction}>😀</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>🤣</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>😋</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>🧐</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>🤨</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>😢</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>🤭</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>😨</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>🙄</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>😲</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>🥱</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>👍</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>👎</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>💪</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>👀</Text>
        </TouchableOpacity>
      </Animated.View>
      )}

      </ScrollView>

    </Animated.View>
    </SafeAreaView>
  )

  // return (
  //   <View style={styles.container}>
      

  //     <TextInput
  //       // ref={inputRef}
  //       style={styles.message}
  //       value={text}
  //       onChangeText={setText}
  //       onSubmitEditing={sendMessage}
  //       blurOnSubmit={false}
  //       returnKeyType='send'
  //       placeholder={'Send message...'}
  //       placeholderTextColor={colors.lightText3}
  //     />
  //     <TouchableOpacity style={styles.btn} onPress={() => setShowEmotes(true)}>
  //       <MaterialCommunityIcons name='emoticon-outline' style={styles.icon} />
  //     </TouchableOpacity>
  //     <TouchableOpacity style={styles.btn} onPress={() => setShowMicSettings(true)}>
  //       <MaterialCommunityIcons name='microphone-settings' style={styles.icon} />
  //     </TouchableOpacity>
  //   </View>
  // )
}

export default MessageInput;