import { useTheme } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight, FlatList } from 'react-native'
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import defaultAvatar from '../../../../assets/images/avatar.png'
import { Touchable } from '../../../Components';



const SERVER_IP = 'http://192.168.1.2:8000/uploads/avatars/'


const ProfileModal = ({ profile, isVisible, hideModal }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // flex: 1,
      backgroundColor: colors.card,
      // backgroundColor: 'blue',
      // padding: 3,
      // paddingTop: 10,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    header: {
      // justifyContent: 'center',
      alignItems: 'center',
      top: -44,
      // position: 'absolute',
      // margin: 0,
      // padding: 0,
      // backgroundColor: 'red',
    },
    image: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 93,
    height: 93,
    borderRadius: 100 / 2,
    backgroundColor: "red",
    backgroundColor: colors.card,
    },
    avatar: {
      width: 88,
      height: 88,
      borderRadius: 44,
    },
    name: {
      color: colors.text
    },
    username: {
      color: colors.text3
    },
    actions: {
      flexDirection: 'row',
      // backgroundColor: 'blue',
      // top: -22,
    },
    action: {
      flex: 1,
      paddingVertical: 10,
      backgroundColor: colors.border,
      // backgroundColor: 'blue',
    },
    actionText: {
      color: colors.text,
      textAlign: 'center',
      borderRightWidth: 1,
      borderColor: colors.border2,
    },
    prompts: {
      // justifyContent: 'space-around',
      // alignItems: 'space-around',

      flexDirection: 'row',
      // alignItems: 'center',
      // flexWrap: 'wrap',
      flex: 1,
      // paddingLeft: 5,

      // backgroundColor: 'red',
      paddingHorizontal: 5,
      paddingVertical: 5,
    },
    prompt: {
      // backgroundColor: colors.background,
      // backgroundColor: colors.darkTranslucent2,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',

      marginHorizontal: 5,
      marginVertical: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,

      borderRadius: 5,

      borderWidth: 0.5,
      borderColor: colors.border2,
    },
    promptTitle: {
      fontSize: 14,
      color: colors.text,
      // color: colors.textInverse,
    },
    promptIcon: {
      fontSize: 20,
      color: colors.text3,
      // color: colors.textInverse,
      marginRight: 5,
    },
    actionBtns2: {
      flexDirection: 'row',
    },
    actionBtns: {
      flexDirection: 'row',
      position: 'absolute',
      // left: 10,
      top: 50,
      // backgroundColor: 'blue',
      flex: 1,
      width: '100%',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      // top: -22,
    },
    actionBtn: {
      // flex: 1,
      paddingVertical: 5,
      paddingHorizontal: 5,
      marginVertical: 10,
      marginHorizontal: 10,
      backgroundColor: colors.border,
      borderRadius: 10,
      // backgroundColor: 'blue',
    },
    actionIcon: {
      fontSize: 25,
      color: colors.text3,
      // color: colors.textInverse,
      // marginRight: 5,
    },
    voteKickBtn: {
      // paddingVertical: 5,
      // paddingHorizontal: 5,
      // marginVertical: 10,
      // marginHorizontal: 10,
      // backgroundColor: colors.border,
      // borderRadius: 10,

      // position: 'absolute',
      // right: 20,
      // top: 50,
    }
  };

  const prompts =  [ 
    // { icon: 'map-marker', title: 'Milano' }, 
    // { icon: 'cash', title: '400 EUR/month' }, 
    // { icon: 'timetable', title: '2 years' }, 

    { icon: 'account-hard-hat', title: 'Student' }, 
    { icon: 'account-multiple', title: 'Overnight guests' }, 
    { icon: 'silverware-clean', title: 'Cleaning' }, 
    { icon: 'power-sleep', title: '12AM' }, 
    { icon: 'account-heart', title: 'Yes with visits' }, 
    { icon: 'gamepad-variant', title: 'Gaming' }, 
    // { icon: 'translate', title: ['English', 'Italian', 'Spanish'] },
    { icon: 'translate', title: 'English, Italian, Spanish' },
    { icon: 'smoking', title: 'No Smoking'},
    { icon: 'paw', title: 'No Pets'},
    { icon: 'music', title: 'Loud music'},

  ];

  const renderPromptItem = ({ item: { icon, title } }) => {
    return (
      <View style={styles.prompt}>
        <MaterialCommunityIcons name={icon} style={styles.promptIcon} />
        <Text style={styles.promptTitle}>{title}</Text>
      </View>
    );
  }

  const avatarSource = profile && profile.avatar ? { uri: SERVER_IP + profile.avatar } : defaultAvatar;

  if (!profile) return null;
  
  return (
    
    <Modal 
      isVisible={isVisible}
      onBackButtonPress={hideModal}
      onBackdropPress={hideModal}
      backdropOpacity={0.5}
      statusBarTranslucent
      style={{
        justifyContent: 'flex-end',
        margin: 0,          
      }}
      // useNativeDriverForBackdrop={true}
      useNativeDriver={true}

      swipeDirection='down'
      onSwipeComplete={hideModal}
      animationInTiming={500}
        // swipeThreshold={400}
    >
      {profile && (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <View style={styles.actionBtns}>
          <View style={styles.actionBtns2}>
          <Touchable background={styles.background2} style={styles.actionBtn}>            
            <MaterialCommunityIcons name='account-plus-outline' style={styles.actionIcon} />
          </Touchable>

          <Touchable background={styles.background2} style={styles.actionBtn}>
          <MaterialCommunityIcons name='message-outline' style={styles.actionIcon} />
          </Touchable>
          </View>
          
        <Touchable style={styles.actionBtn}>
          <MaterialCommunityIcons name='close' style={[styles.actionIcon, {color:'red'}]} />
          </Touchable>
        </View>
          <View style={styles.image}>
            <Image source={avatarSource} style={styles.avatar} />
          </View>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.username}>@{profile.username}</Text>
        </View>

        <FlatList
          data={prompts}
          // renderItem={({item}) => <VoiceChatItem {...item} onJoinVoice={() => {}} socket={socket} />}
          renderItem={renderPromptItem}
          keyExtractor={({icon}) => icon}
          showsHorizontalScrollIndicator={false}
          horizontal
          // style={styles.prompts}
          contentContainerStyle={styles.prompts}

          // snapToAlignment={'start'}
          // decelerationRate={'fast'}
          // snapToInterval={Dimensions.get('screen').width}
        />

        {/* <View style={styles.actions}>
          <TouchableHighlight style={styles.action}>
            <Text style={styles.actionText}>Add Friend</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.action}>
            <Text style={styles.actionText}>Send Message</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.action}>
            <Text style={[styles.actionText, {color:'red', borderRightWidth:0}]}>Votekick</Text>
          </TouchableHighlight>
        </View> */}
      </SafeAreaView>
      )}
      {/* {!profile && (
        <Text>WTF</Text>
      )} */}
    </Modal>  
  );
}

export default ProfileModal

const styles = StyleSheet.create()
