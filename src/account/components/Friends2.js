import React from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Grid, Text, Touchable } from '../../Components';
import IntroItem from './IntroItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const SERVER_IP = 'http://192.168.1.2:8000/uploads/avatars/'



const Friends = ({ friends, onFindFriends }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      marginVertical: 20,
      // flexDirection: 'column',
      // backgroundColor: 'red',
      flexWrap: 'wrap',
    },
    title: {
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 10,
      letterSpacing: 1,
      // paddingHorizontal: 20,
    },
    count: {
      fontWeight: 'normal',
      color: colors.text3,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // justifyContent: 'flex-end',
      paddingHorizontal: 20,
    },
    link: {
      // textTransform: 'uppercase',
      color: colors.primary,
      fontSize: 16,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    content: {
      flex: 1,
      // backgroundColor: 'green',
    },
    gridRow: {
      // width: '100%',
      flex: 1,
      flexDirection: 'row',
      // width: '100%',
      // justifyContent: 'space-between',
      // backgroundColor: 'yellow',
      marginVertical: 1,
    },
    gridItem: {
      flexBasis: '33%',
      // flexBasis: 1,
      // width: '30%',
      // flex: 1,
      // flexGrow: 1,
      // backgroundColor: 'darkviolet',
      backgroundColor: colors.background,
      // marginVertical: '1%',
      // borderWidth: 2,
      // borderColor: 'cyan',

      justifyContent: 'center',
      alignItems: 'center',

      // justifyContent: 'flex-end',
    },
    addIcon: {
      color: colors.background4,
      fontSize: 72,
    },
    avatar: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    name: {
      color: colors.lightText,
      fontSize: 14,
      fontWeight: 'bold',
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',

      width: '100%',
    },
    // content: {
    //   flex: 1,
    //   flexDirection: 'row',
    //   justifyContent: 'space-between',
    //   alignItems: 'flex-end',
    // },
    avatar: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      position: 'absolute',
      zIndex: -1,
      // borderRadius: 5,
    },
  };


  

  return (
    <View style={styles.container}>


          <Touchable background={colors.card} style={styles.gridItem} onPress={onFindFriends}>
            <MaterialCommunityIcons name='plus-thick' style={styles.addIcon} />
          </Touchable>


  
    </View>
  )
}

export default Friends;