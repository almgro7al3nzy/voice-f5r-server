import React from 'react';
import { View, Dimensions, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Sidebar from './Sidebar';
import Players from './Players';
import ProfileModal from './ProfileModal';
import Voice from '../../../components/Voice';

const Chat = ({ room, profile, setProfile, myChoice, showQuitModal }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      position: 'absolute',
      // top: 40,
      top: 0,
      bottom: 0,
      // left: 40,
      left: 0,
      right: 0,
      // backgroundColor: 'red',

      // paddingVertical: 40,
      paddingTop: 60,
      paddingHorizontal: 20,

      height: Dimensions.get('window').height + StatusBar.currentHeight,
      // height: 100,
    }
  };

  return (
    <View style={styles.container}>
      <Players 
        users={room && room.users} 
        setProfile={setProfile} 
        choices={room && room.choices}
        myChoice={myChoice}
      />

      <Voice roomId={room && room.id} />

      <Sidebar users={room && room.users} showQuitModal={showQuitModal} />

      <ProfileModal
        isVisible={Boolean(profile)} 
        hideModal={() => setProfile(null)} 
        profile={profile} 
      />
    </View>
  )
}

export default Chat;