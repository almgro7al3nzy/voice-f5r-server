import React from 'react';
import { View, TouchableHighlight, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '../../Components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const InviteItem = ({ users }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // paddingLeft: 24,
      backgroundColor: 'white',
      backgroundColor: colors.card,
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
      paddingVertical: 16,
      paddingHorizontal: 20,
      // paddingRight: 24,
      // borderBottomColor: colors.border,
      // borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.darkBorder,
      borderColor: colors.border,
      // borderTopWidth: 1,
      borderBottomWidth: 1,
      width: '100%',
      // alignSelf: 'stretch',
      // width: 300,
      // flexDirection: 'row',
      justifyContent: 'space-between',
      // justifyContent: 'space-around',
      // backgroundColor: 'red'
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
      justifyContent: 'center',
      // justifyContent: 'flex-end',
      // flex: 1,
      // marginLeft: 20,
      // textAlign: 'right',
      // alignSelf: 'flex-end'
      // alignItems: 'flex-end'
    },
    title: {
      color: colors.text,
      fontWeight: 'bold',
      fontSize: 18,
  
      // backgroundColor: 'blue',
      // textAlign: 'center',
      // alignSelf: 'flex-end'
    },
    subtitle: {
      color: colors.text3,
      fontSize: 16,
      marginTop: 4,
    },
    row: {
      flexDirection: 'row',
    }
  };

  return (
    <TouchableHighlight style={styles.container}>
      <View style={styles.roomItem}>
        <View>
          <Text style={styles.title}>Ninja</Text>
          <View style={styles.row}>
            {users.map(user => {
              return <Text key={user.id}>{user.name}, </Text>
            })}
          </View>
        </View>

        <View style={styles.details}>
        {/* <View style={styles.avatars}>
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
        </View> */}
          {/* <Text style={[styles.title]}>Code</Text> */}
          
          <MaterialCommunityIcons name='account-multiple' size={25} color={colors.text3} />
          <Text style={styles.subtitle}>{users.length}/5</Text>
        </View>
      </View>
      
    </TouchableHighlight>
  );
}

export default InviteItem;