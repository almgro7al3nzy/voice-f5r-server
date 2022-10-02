import React from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, Image, TouchableNativeFeedback } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Button2, Grid, Text } from '../../Components';
import IntroItem from './IntroItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SERVER_IP = 'http://192.168.1.2:8000/uploads/photos/'



const Friends = ({ friends, onShowImagePicker, photos }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
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
    },
    actions: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    addIcon: {
      color: colors.background4,
      fontSize: 72,
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
      {/* <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.title}>
            FRIENDS <Text style={styles.count}>{intros2.length}</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <MaterialCommunityIcons name='plus' size={15} color={colors.primary} />
          <Text style={styles.link}>ADD FRIENDS</Text>          
        </TouchableOpacity>
      </View> */}

      <View style={styles.content}>
        <View style={styles.gridRow}>
          <View style={styles.gridItem}>
            <Image source={{ uri: SERVER_IP + photos[0] }} style={styles.image} />
          </View>
          <View style={[styles.gridItem, {marginHorizontal:'0.5%'}]}>
            <Image source={{ uri: SERVER_IP + photos[1] }} style={styles.image} />
          </View>
          <View style={styles.gridItem}>
            <Image source={{ uri: SERVER_IP + photos[2] }} style={styles.image} />
          </View>
        </View>
        
        <View style={styles.gridRow}>
          <View style={styles.gridItem}>
            <Image source={{ uri: SERVER_IP + photos[3] }} style={styles.image} />
          </View>
          <View style={[styles.gridItem, {marginHorizontal:'0.5%'}]}>
            <Image source={{ uri: SERVER_IP + photos[4] }} style={styles.image} />
          </View>
          <TouchableNativeFeedback onPress={onShowImagePicker} 
          // background={TouchableNativeFeedback.Ripple(colors.background4)}
          background={TouchableNativeFeedback.Ripple(colors.card)}
          >
            <View style={styles.gridItem}>
              {photos[5] && <Image source={{ uri: SERVER_IP + photos[5] }} style={styles.image} />}
              {!photos[5] && <MaterialCommunityIcons name='plus-thick' style={styles.addIcon}  />}
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>

      {/* <View style={styles.actions}>
        <Button2 title='Add Photo' type='outline' onPress={onShowImagePicker} style={{ width: '33.33%', marginTop: 20 }} />
      </View> */}

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