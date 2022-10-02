import React from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Grid, Text, Touchable } from '../../Components';
import IntroItem from './IntroItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Friends = ({ friends }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      width: '100%',

      // marginVertical: 20,
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
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
    },
    link: {
      textTransform: 'uppercase',
      color: colors.primary,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    content: {
      flex: 1,
      // backgroundColor: 'green',
      width: '100%',
    },
    // gridRow: {
    //   // width: '100%',
    //   flex: 1,
    //   flexDirection: 'row',
    //   // width: '100%',
    //   // justifyContent: 'space-between',
    //   // backgroundColor: 'yellow',
    //   marginVertical: 1,
    // },
    listItem: {
      // flexBasis: '33%',

      paddingHorizontal: 20,
      paddingVertical: 20,

      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',

      // height: 100,
      // marginVertical: 2,

      // justifyContent: 'center',
      // justifyContent: 'center',

      alignItems: 'center',
      // flexBasis: 1,
      // width: '30%',
      // flex: 1,
      // flexGrow: 1,

      // backgroundColor: 'darkviolet',

      backgroundColor: colors.background,

      // marginVertical: '1%',
      // borderWidth: 2,
      // borderColor: 'cyan',
    },
    createPinIcon: {
      // color: colors.background4,
      color: colors.text3,
      fontSize: 25,
    },
    createPinText: {
      color: colors.text,
      fontSize: 16,

      fontWeight: 'bold',
    }
  };

  const intros2 = [
    { id: 1, title: 'Professional Dentist', photo: 'https://randomuser.me/portraits/men/75.jpg', },
    { id: 2, title: 'Gaming, Movies', photo: 'https://randomuser.me/portraits/women/75.jpg', },
    { id: 3, title: 'Professional Dentist', photo: 'https://randomuser.me/portraits/men/75.jpg', },
    { id: 4, title: 'Gaming, Movies', photo: 'https://randomuser.me/portraits/women/75.jpg', },
    { id: 5, title: 'Professional Dentist', photo: 'https://randomuser.me/portraits/men/75.jpg', },
    { id: 6, title: 'Gaming, Movies', photo: 'https://randomuser.me/portraits/women/75.jpg', },
  ]

  return (
    <View style={styles.container}>

      <Touchable background={colors.background4} style={styles.listItem}>
        <MaterialCommunityIcons name='plus-thick' style={styles.createPinIcon}  />
        <Text style={styles.createPinText}>Create Pin</Text>
      </Touchable>
        


      {/* <Grid
        data={[]}
        renderItem={({item, index}) => <IntroItem {...item} index={index} />}
        keyExtractor={item => item.id.toString()}
      /> */}

      {/* <Grid
        data={intros2}
        renderItem={({item, index}) => <IntroItem {...item} index={index} />}
        keyExtractor={item => item.id.toString()}
      /> */}

      {/* <FlatList
        data={intros2}
        renderItem={({item, index}) => <IntroItem {...item} index={index} />}
        keyExtractor={item => item.id.toString()}
      /> */}
    </View>
  )
}

export default Friends;