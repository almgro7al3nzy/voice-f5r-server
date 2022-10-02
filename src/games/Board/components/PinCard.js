import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react'
import { View, Image, TouchableOpacity, Animated, TouchableHighlight } from 'react-native'
import { Text, Button, Author, Touchable, ImageGrid2, ImageList } from '../../../Components';
// import { getInitials } from '../utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import ActionsModal from './ActionsModal';



const SERVER_IP = 'http://192.168.1.8:8000/uploads/pin_images/'



const Card = ({ text, file, author, onReplying, filesSources }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      borderBottomWidth: 0.5,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.card,
      // paddingHorizontal: 20,
      paddingVertical: 0,


      borderRadius: 5,
      // borderRadius: 10,
      // backgroundColor: 'red',
    },
    // avatarRow: {
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   width: 22,
    //   height: 22,
    //   borderRadius: 11,
    //   backgroundColor: '#' + ((1<<24)*Math.random() | 0).toString(16)
    // },
    avatar: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 22,
      height: 22,
      borderRadius: 11,
      // backgroundColor: '#' + ((1<<24)*Math.random() | 0).toString(16)
      backgroundColor: colors.background2
    },
    initials: {
      color: colors.textInverse,
    },
    contentRow: {
      paddingVertical: 10,
    },
    authorRow: {
      // backgroundColor: 'red',
      paddingVertical: 10,
      // height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',


      paddingHorizontal: 15,
    },
    author: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    authorRowText: {
      marginHorizontal: 6,
      color: colors.text3
    },
    actionsRow: {
      flexDirection: 'row',
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    actionBtn: {
      flex: 0.5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    actionBtnText: {
      paddingHorizontal: 3,
    },
    text: {
      // fontWeight: 'bold',
      fontSize: 16,
      color: colors.text,

      paddingHorizontal: 15,
    },
    image: {
      // flex: 1,
      // width: 300,
      width: '100%',
      // width: '90%',
      height: 300,

      // borderRadius: 10,
      // justifyContent: 'center',
      // alignItems: 'center',

    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    replyIcon: {
      fontSize: 25,
      color: colors.text3,
    }
  };

  const [showActions, setShowActions] = React.useState(false);
  const [actionsVisible, setActionsVisible] = React.useState(false);
  const [fullscreenImage, setFullscreenImage] = React.useState(null);

  // const [replying, setReplying] = useState(false);

  // const showReplyInput = () => setReplying(true);

  // const renderLeftActions = (progress, dragX) => {
  //   const translateX = dragX.interpolate({
  //     inputRange: [0, 50, 100, 101],
  //     outputRange: [-20, 0, 0, 1],
  //   });

  //   return (
  //     <RectButton style={styles.leftAction} onPress={() => {}}>
  //       <Animated.Text
  //         style={[
  //           styles.actionBtnText,
  //           { transform: [{ translateX }] }
  //         ]}
  //         >
  //           Reply
  //         </Animated.Text>
  //     </RectButton>
  //   );
  // }

  // const onSwipeableLeftOpen = () => onReplying();

  const showProfile = () => {}

  const handleStateChange = ({ nativeEvent }) => {
    
    if (nativeEvent.state !== 4) return;

    setActionsVisible(true);
    // if (nativeEvent.state === State.ACTIVE) {
    //   Alert.alert("I'm being pressed for so long");
    // }
  }

  

  return (
    <TouchableHighlight onPress={() => {}}>
    <LongPressGestureHandler minDurationMs={500} onHandlerStateChange={handleStateChange}>
      <View style={styles.container}>
      <View style={styles.contentRow}>
        <Text style={styles.text}>
          {text}
        </Text>
      </View>

      {file && <Image source={{ uri: SERVER_IP + file }} style={styles.image} />}

      {filesSources && (
        <ImageList
          selectedImages={filesSources}
          onPressImage={(image) => setFullscreenImage(image)}
        />
      )}

      {author && (
      <View style={styles.authorRow}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.author} onPress={showProfile}>
            <Author name={author.name} avatar={author.avatar} color={colors.text3} size={22} />
          </TouchableOpacity>        

          <MaterialCommunityIcons name='clock-outline' size={15} color={colors.text3} />

          <Text style={styles.authorRowText}>6h</Text>

          <MaterialCommunityIcons name='map-marker-outline' size={15} color={colors.text3} />

          <Text style={styles.authorRowText}>0.9km</Text>
        </View>

        {/* <Touchable onPress={onReplying} background={colors.background2}>
          <MaterialCommunityIcons name='reply' style={styles.replyIcon} />
        </Touchable> */}
      </View>      
      )}

      {/* {actionsVisible && (
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionBtn}>
          <MaterialCommunityIcons name={'emoticon-excited-outline' || 'eye-outline'} size={25} color={colors.text3} />
          <Text style={styles.actionBtnText}>Watch</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <MaterialCommunityIcons name='reply-outline' size={25} color={colors.text3} />
          <Text style={styles.actionBtnText}>Reply</Text>
        </TouchableOpacity>
      </View>
      )} */}


      <ActionsModal isVisible={actionsVisible} hideModal={() => setActionsVisible(false)} pinText={text} />
      </View>
    </LongPressGestureHandler>
    </TouchableHighlight>
  );
}

export default Card
