import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Touchable, Text } from '../../../Components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const SERVER_IP = 'http://192.168.1.2:8000/uploads/avatars/'


const PersonItem = ({ name, age, avatar, kmAway }) => {
// const PersonItem = (props) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',

      // backgroundColor: 'blue',
      // height: 230,
      borderWidth: 1,
      borderColor: colors.border,
      // padding: 1,

      // flexDirection: 'row',
    },
    avatar: {
      // flex: 1,
      // width: '50%',
      width: '99%',
      height: 200,
      // height: '100%',
      // position: 'absolute',
      // top: 0,
      // left: 0,
      // right: 0,
      // bottom: 0,
    },
    info: {
      // position: 'absolute',
      flexDirection: 'row',

      // width: '100%',
    },
    name: {
      color: colors.lightText,
    },
    age: {
      color: colors.lightText2,
      marginHorizontal: 3,
    },
    kmAway: {
      color: colors.lightText,
    },
    inviteIcon: {
      fontSize: 25,
      color: colors.lightText,
    },
    row: {
      flexDirection: 'row',
      width: '100%',

      justifyContent: 'space-between',
      paddingHorizontal: 5,
      paddingVertical: 10,
    }
  };

  // 
  // return null;

  return (
    <Touchable style={styles.container}>
      {/* <Image source={{ uri: SERVER_IP + avatar }} style={styles.avatar} /> */}
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={styles.row}>
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.age}>{age}</Text>
          <Text style={styles.kmAway}>{kmAway}</Text>
        </View>
        <Touchable>      
          <MaterialCommunityIcons name='account-plus' style={styles.inviteIcon} />
        </Touchable>
      </View>
    </Touchable>
  )
}

export default PersonItem;