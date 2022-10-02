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
      // borderWidth: 1,
      backgroundColor: colors.darkBackground3,
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
      marginRight: -10
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
          {users.map(user => {
            return (
              <Image
                key={user.id}
                style={styles.avatar}
                source={{
                  uri: user.avatar,
                }}
              />
            );
          })}
        </View>

        <View style={styles.details}>
          <Text style={styles.subtitle}>{users.length}/5</Text>
          <MaterialCommunityIcons name='account-multiple' style={styles.icon} />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

export default RoomItem;


const styles = StyleSheet.create();
