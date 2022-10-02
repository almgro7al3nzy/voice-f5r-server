import { useTheme } from '@react-navigation/native';
import React from 'react'
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Image,
  TouchableNativeFeedback
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar, Touchable } from '../../Components';
// import uuid
import defaultAvatar from '../../../assets/images/avatar2.png'


const RoomItem = ({ id, users, activeTab, onPress }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // paddingLeft: 24,
      backgroundColor: 'white',
      // backgroundColor: colors.background,
      // backgroundColor: colors.darkBackground,
      // backgroundColor: 'grey',
      // width: '100%',
      // width: 300,
      // alignSelf: 'stretch'
      // alignItems: 'stretch'
      // flexDirection: 'row',
      // justifyContent: 'space-between'
    },
    roomItem: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: colors.lightBorder,
      borderColor: colors.background4,
      borderWidth: 1,
      // backgroundColor: colors.background,
      // backgroundColor: colors.darkBackground3,
      // backgroundColor: colors.darkTranslucent2,
      // backgroundColor: colors.lightTranslucent2,
      marginVertical: 5,
      
      borderRadius: 10,
      width: '100%',
      paddingVertical: 5,
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      
    },
    avatars: {
      flexDirection: 'row',
    },
    avatar: {
      borderRadius: 22,
      width: 44,
      height: 44,

      // marginRight: -10
      // marginHorizontal: 10,
      marginRight: 10,
      // marginVertical: 40,

      // backgroundColor: colors.darkBackground,
      
      
      borderWidth: 1,
      // borderColor: colors.background2,
      backgroundColor: colors.background,
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

  
// 
  return (
      <Touchable onPress={onPress} style={styles.roomItem} background={colors.background}>
        <View style={styles.avatars}>
          {/* {users && users.map(user => {
            return (
              <Image
                key={user.id}
                style={styles.avatar}
                source={{
                  uri: user.avatar,
                }}
              />
            );
          })} */}
          {Array.from(Array(5).keys()).map((_, index) => {
            const user = users[index]
            // 

            // const avatarSource = user ? { uri: user.avatarSource } : defaultAvatar;
            // const avatarSource = { uri: user && user.avatarSource }
            // const avatarSource = user && { uri: user.avatarSource || user.avatar } || defaultAvatar;
            const avatarSource =
              user && user.avatarSource ? { uri: user.avatarSource }
              : user && !user.avatarSource ? defaultAvatar
              : null;

            // return <Avatar key={index} size={44} avatar={user && user.avatar} />
            // if (activeTab === 'Voice Chats') {
            //   return (
            //     <View
            //   )
            // }

            return <Image key={index} style={styles.avatar} source={avatarSource} />;
          })}
        </View>

        {/* <View style={styles.settings}>
          <Text style={styles.languageText}>ENG</Text>
          <MaterialCommunityIcons name='numeric-5-box-outline' style={styles.icon} />
          <MaterialCommunityIcons name='timer-outline' style={styles.icon} />
        </View> */}

        {/* <View style={styles.details}>
          <Text style={styles.subtitle}>{users.length}/5</Text>
          <MaterialCommunityIcons name='account-multiple' style={styles.icon} />
        </View> */}
    </Touchable>
  );
}

export default RoomItem;
