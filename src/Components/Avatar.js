import React from 'react';
import { View, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import defaultAvatar from '../../assets/images/avatar2.png'


const SERVER_IP = 'http://192.168.1.2:8000/uploads/avatars/'


const Avatar = ({ size = 50, avatar, ...rest }) => {
  const { colors } = useTheme();

  const styles = {
    container: {

    },
    avatar: {
      width: size,
      height: size,
      borderRadius: size / 4,
      // borderColor: 'white',
      // borderWidth: 2,
    },
  };

  const avatarSource = avatar ? { uri: SERVER_IP + avatar } : defaultAvatar;

  return (
    <Image source={avatarSource} style={styles.avatar} {...rest} />
    // <Image source={avatar} style={styles.avatar} />
  )
}

export default Avatar;