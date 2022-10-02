import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '../../Components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const AccountHeader = ({ name, username, avatar }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // backgroundColor: colors.card,
      // paddingVertical: 30,
      // marginHorizontal: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatar: {
      width: 90,
      height: 90,
      borderRadius: 15,
      borderColor: 'white',
      borderWidth: 2,
    },
    name: {
      fontSize: 20,
      // marginTop: 24,
      // marginBottom: 2,
      fontWeight: 'bold',
    },
    title: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image source={{ uri: avatar }} style={styles.avatar} />
      </TouchableOpacity>
      {/* <View style={styles.title}>
        <Text style={styles.name}>{name}</Text>
        <MaterialCommunityIcons
          name='circle'
          size={5}
          color={colors.text3}
          style={{ marginHorizontal: 5 }}
        />
        <Text style={styles.username}>{username}</Text>
      </View> */}
    </View>
  )
}

export default AccountHeader;