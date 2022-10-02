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
import { getAvatarColor, getInitials } from '../../utils';

const ContactItem = ({ id, name, avatar, phone, onPress, onAddFriend, isFriend }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      paddingLeft: 24,
      backgroundColor: 'white'
    },
    contactInfo: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 16,
      paddingBottom: 16,
      paddingRight: 24,
      borderBottomColor: colors.grey,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    avatar: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 22,
      width: 44,
      height: 44,
      // backgroundColor: '#' + ((1<<24)*Math.random() | 0).toString(16)
      backgroundColor: getAvatarColor(name)
    },
    initials: {
      color: colors.textInverse,
    },
    details: {
      justifyContent: 'center',
      flex: 1,
      marginLeft: 20,
    },
    title: {
      color: colors.black,
      fontWeight: 'bold',
      fontSize: 16,
    },
    subtitle: {
      color: colors.blue,
      fontSize: 15,
      marginTop: 4,
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    action: {
      fontSize: 25,
      color: colors.text2,
      backgroundColor: colors.darkTranslucent,
      borderRadius: 10,
      margin: 5,
      padding: 5,
    },
    close: {
      fontSize: 25,
      color: colors.text3,
    }
  };

  // const isFriend= true;

  

  const isFriendStyle = isFriend && { color: colors.primary };

  return (
    <TouchableHighlight
      underlayColor={colors.background}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.contactInfo}>
        {/* <Image
          style={styles.avatar}
          source={{
            uri: avatar,
          }}
        /> */}

        <View style={styles.avatar}>
          {avatar && <Image style={styles.avatarImg} source={{ uri: avatar }} />}
          {!avatar && <Text style={styles.initials}>{getInitials(name)}</Text>}
        </View>

        <View style={styles.details}>
          <Text style={[styles.title]}>{name}</Text>
          <Text style={styles.subtitle}>{phone}</Text>
        </View>

        {/* <View style={styles.actions}>
          <TouchableNativeFeedback onPress={() => onAddFriend(id)}>
            <MaterialCommunityIcons name={isFriend ? 'account-check' : 'account-plus'} style={[styles.action, isFriendStyle]} />
          </TouchableNativeFeedback>

          <TouchableNativeFeedback>
            <MaterialCommunityIcons name='email' style={styles.action} />
          </TouchableNativeFeedback>

          <TouchableNativeFeedback>
            <MaterialCommunityIcons name='chess-pawn' style={styles.action} />
          </TouchableNativeFeedback>

        </View> */}
      </View>
    </TouchableHighlight>
  );
}

export default ContactItem;

// ContactItem.propTypes = {
//   name: PropTypes.string.isRequired,
//   avatar: PropTypes.string.isRequired,
//   phone: PropTypes.string.isRequired,
//   onPress: PropTypes.func.isRequired,
// };


const styles = StyleSheet.create();
