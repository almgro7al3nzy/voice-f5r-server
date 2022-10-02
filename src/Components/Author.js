import React from 'react';
import { View, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import defaultAvatar from '../../assets/images/avatar.png'
import Text from './Text';

const SERVER_IP = 'http://192.168.1.2:8000/uploads/avatars/'


const Author = ({ size = 100, name, avatar, fontSize = 14, color }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: size,
      height: size,
      borderRadius: size / 2,
      // borderColor: 'white',
      // borderWidth: 2,
    },
    name: {
      marginHorizontal: 6,
      fontSize,
      color: color || colors.text
    }
  };

  const avatarSource = avatar ? { uri: SERVER_IP + avatar } : defaultAvatar;

  return (
    <View style={styles.container}>
      <Image source={avatarSource} style={styles.avatar} />
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
    </View>
    // <Image source={avatar} style={styles.avatar} />
  )
}

export default Author;