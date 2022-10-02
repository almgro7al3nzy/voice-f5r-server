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
// import uuid

const RoomItem = ({ id, users, onPress }) => {
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
      borderWidth: 1,
      // backgroundColor: colors.darkBackground3,
      // backgroundColor: colors.darkTranslucent2,
      backgroundColor: colors.lightTranslucent2,
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
      borderRadius: 11,
      width: 44,
      height: 44,

      // marginRight: -10
      // marginHorizontal: 10,
      marginRight: 10,
      // marginVertical: 40,

      backgroundColor: colors.darkBackground,
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
      color: colors.lightText,
      fontSize: 20,
      // marginTop: 4,
      // backgroundColor: 'green',
      // flex: 1,
    },
    icon: {
      fontSize: 25,
      color: colors.lightText,
      marginLeft: 10,
      // backgroundColor: 'blue',
    },
    settings: {
      flexDirection: 'row',
    },
    languageText: {
      color: colors.lightText,
      fontSize: 16,
    }
  };

  

  return (
    <TouchableNativeFeedback
      // underlayColor={colors.grey}
      // style={styles.container}
      onPress={onPress}
    >
      <View style={styles.roomItem}>
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
            return (
              <Image
                key={index}
                style={styles.avatar}
                source={{
                  uri: user && user.avatar,
                }}
              />
            );
          })}
        </View>

        <View style={styles.settings}>
          <Text style={styles.languageText}>ENG</Text>
          <MaterialCommunityIcons name='numeric-5-box-outline' style={styles.icon} />
          <MaterialCommunityIcons name='timer-outline' style={styles.icon} />
        </View>

        {/* <View style={styles.details}>
          <Text style={styles.subtitle}>{users.length}/5</Text>
          <MaterialCommunityIcons name='account-multiple' style={styles.icon} />
        </View> */}
      </View>
    </TouchableNativeFeedback>
  );
}

export default RoomItem;


const styles = StyleSheet.create();
