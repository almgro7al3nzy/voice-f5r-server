import { useTheme } from '@react-navigation/native';
import React from 'react'
import {
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  Text,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getAvatarColor, getInitials } from '../../utils';

import defaultAvatar from '../../../../assets/images/avatar.png'
import { Touchable } from '../../../Components';



const SERVER_IP = 'http://192.168.1.2:8000/uploads/avatars/'



const InviteFriendItem = ({ id, name, avatar, phone, onInviteFriend, onAddFriend, isFriend }) => {
// const InviteFriendItem = (props) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      // backgroundColor: 'yellow',
      // paddingLeft: 24,
      // backgroundColor: colors.background,
      // backgroundColor: colors.darkBackground,
    },
    contactInfo: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      // backgroundColor: 'blue',
      // justifyContent: 'space-between',
      paddingTop: 16,
      paddingBottom: 16,
      paddingRight: 24,
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
    },
    avatar: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 22,
      width: 44,
      height: 44,
      marginHorizontal: 10,
      // backgroundColor: '#' + ((1<<24)*Math.random() | 0).toString(16)
      backgroundColor: getAvatarColor(name)
    },
    initials: {
      color: colors.lightText,
    },
    details: {
      justifyContent: 'center',
      flex: 1,
      // marginLeft: 20,
    },
    title: {
      color: colors.lightText,
      fontWeight: 'bold',
      fontSize: 16,
    },
    subtitle: {
      color: colors.lightText4,
      fontSize: 15,
      marginTop: 4,
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    action: {
      fontSize: 25,
      color: colors.lightText,
      backgroundColor: colors.darkTranslucent,
      borderRadius: 10,
      margin: 5,
      padding: 5,
    },
    close: {
      fontSize: 25,
      color: colors.lightText,
    },
    invited: {
      color: colors.lightText,
    }
  };

  // const isFriend= true;

  // 
  // return null;

  

  const avatarSource = avatar ? { uri: SERVER_IP + avatar } : defaultAvatar;

  return (
    <Touchable
    background={colors.darkBackground2}
      // underlayColor={colors.background}
      style={styles.container}
      onPress={() => onInviteFriend(id)}
    >
      <View style={styles.contactInfo}>

          <Image style={styles.avatar} source={avatarSource} />

        <View style={styles.details}>
          <Text style={[styles.title]}>{name}</Text>
          <Text style={styles.subtitle}>{'In Game - Truth or Dare - 3/5'}</Text>
        </View>

        <Text style={styles.invited}>INVITED</Text>
      </View>
    </Touchable>
  );
}

export default InviteFriendItem;

// InviteFriendItem.propTypes = {
//   name: PropTypes.string.isRequired,
//   avatar: PropTypes.string.isRequired,
//   phone: PropTypes.string.isRequired,
//   onPress: PropTypes.func.isRequired,
// };


const styles = StyleSheet.create();
