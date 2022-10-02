import React from 'react';
import { View, Image, FlatList, TouchableHighlight } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Button, Text } from '../../Components';
import { v4 as uuidv4 } from 'uuid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const ForYouItem = ({ icon, participants, invites, location, habits }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.card,
      // padding: 30,
      padding: 10,
    },
    roomIcon: {
      // flex: 1,
      flexDirection: 'row',
      width: 80,
      flexWrap: 'wrap',
      margin: 10,
      // borderRadius: 20,
      // backgroundColor: 'blue',
      // padding: 1,
      // zIndex: 1,
    },
    avatar: {
      // zIndex: 0,
      width: 40,
      height: 40,
      // borderRadius: 20,
    },
    joinCount: {
      position: 'absolute',
      zIndex: 1,
      right: 0,
      // top: 0,
      bottom: 20,
      // alignSelf: 'flex-end',
      // backgroundColor: colors.background,
      // padding: 5,
      // width: 10,
      // borderRadius: 10,
    },
    nameAge: {
      flexDirection: 'row',
    },
    joinIcon: {
      fontSize: 25,
      color: colors.text2,
      marginRight: 5,
    },
    joinBtn: {
      // alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 5,
      marginVertical: 5,
    },
    close: {
      fontSize: 25,
      color: colors.text3,
      position: 'absolute',
      right: 5,
      top: 5,
    },
  };

  // const participantAvatars = participants.map(p => p.avatar);
  // const invitesAvatars = invites.map(i => i.avatar);
  const avatars = [...participants.map(p => p.avatar), ...invites.map(i => i.avatar)];
  const users = [...participants, ...invites];
  
  const joinChat = () => {

  }

  const removeRoom = () => {

  }

  return (
    <View style={styles.container}>
      {/* <MaterialCommunityIcons name='close' style={styles.close} onPress={removeRoom} /> */}

      <View style={styles.roomIcon}>
        {avatars.map((avatar, index) => {
          const borderRadius = 
            index === 0 ? {borderTopLeftRadius: 20} :
            index === 1 ? {borderTopRightRadius: 20} :
            index === 2 ? {borderBottomLeftRadius: 20} :
            {borderBottomRightRadius: 20}
          return <Image key={uuidv4()} source={{ uri: avatar }} style={[styles.avatar, borderRadius]} />
          // <View style={{ border}}
        })}
      </View>

      {/* <View style={styles.joinCounter}> */}
        {/* <Text style={styles.joinCount}>
          {participants.length}/{participants.length + invites.length}
        </Text> */}
      {/* </View> */}

      {/* <View style={styles.location}> */}
        <Text style={styles.locationText}>{location}</Text>
      {/* </View> */}

      {/* <View style={styles.names}>
        {users.map(p => {
          return (
            <View key={uuidv4()} style={styles.nameAge}>
              <Text style={styles.name}>{p.name}, </Text>
              <Text style={styles.age}>{p.age}</Text>
            </View>
          );
        })}
      </View> */}

      {/* <TouchableHighlight onPress={joinChat}>
        <View style={styles.joinBtn}>
          <MaterialCommunityIcons name='login' style={styles.joinIcon} />
          <Text style={styles.joinText}>Join</Text>
        </View>
      </TouchableHighlight>

      <TouchableHighlight onPress={removeRoom}>
        <View style={styles.joinBtn}>
          <MaterialCommunityIcons name='close' style={styles.joinIcon} />
          <Text style={styles.joinText}>Remove</Text>
        </View>
      </TouchableHighlight> */}
    </View>
  )
}


const ForYou = ({ rooms }) => {
  const { colors } = useTheme();

  const styles = {
    container: {

    }
  };

  return (
    <View style={styles.container}>
      {rooms && (
        <FlatList
          data={rooms}
          keyExtractor={({id}) => id.toString()}
          renderItem={({item}) => <ForYouItem {...item} />}
          horizontal={true}
        />
      )}
    </View>
  )
}

export default ForYou;