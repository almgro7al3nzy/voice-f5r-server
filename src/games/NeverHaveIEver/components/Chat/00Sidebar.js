import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PlayerAvatars from './Players';
import { useTheme } from '@react-navigation/native';
// import Countdown from './Countdown';

const Sidebar = ({ users, setProfile, showQuitModal, roomCode, timer, setTimer, currentPlayerIndex, setCurrentPlayerIndex, 
  onInviteFriends,
  // friends, onInviteFriend 
}) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',

      // zIndex: 1,
      // backgroundColor: 'green',

      position: 'absolute',
      right: 0,
      top: 50,
      // bottom: 0,

      // top: 0,
      // bottom: 0,
      // justifyContent: 'center',
      // alignItems: 'center',
      
    },
    code: {
      // backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
      // top: 50,
      // position: 'absolute',
      // right: 0,
    },
    codeLabel: {
      fontSize: 20,
      color: colors.lightText2,
      fontWeight: 'bold',
    },
    codeValue: {
      fontSize: 20,
      color: colors.lightText2,
    },
    players: {
      // backgroundColor: 'yellow',
      justifyContent: 'center',
      alignItems: 'center',
    },
    inviteBtn: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.darkTranslucent,
      backgroundColor: colors.lightTranslucent,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,


      // borderWidth: 1,
      // borderColor: 'yellow',
      // borderColor: colors.lightText,
    },
    inviteIcon: {
      color: colors.lightText,
      // color: colors.primary4,
      fontSize: 25,
    },
    cogIcon: {
      color: colors.lightText2,
      // marginVertical: 50,
      // marginBottom: 100,
    },
    settings: {
      marginVertical: 10,
    },
    // top: {
    //   position: 'absolute',
    //   top: 50,
    //   // bottom: 0,
    //   right: 0,
    //   left: 0,
    //   zIndex: 1,
    //   // width: '100%',
    //   // backgroundColor: 'green',
    //   // flex: 1,
    //   justifyContent: 'center',      
    //   alignItems: 'center',
    // }
  };


  return (
    <View style={styles.container}>

      <View style={styles.top}>
        <TouchableOpacity style={styles.settings} onPress={showQuitModal}>
          <MaterialCommunityIcons name='cog-outline' size={32} style={styles.cogIcon} />
        </TouchableOpacity>
        {/* <Countdown timer={timer} setTimer={setTimer} /> */}
        
      </View>

      <View style={styles.players}>
        {/* <View style={styles.inviteBtn} pointerEvents='box-only'>
          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#ffff00', true)} onPress={onInviteFriends}>
              <MaterialCommunityIcons name='plus-thick' style={styles.inviteIcon} />
            </TouchableNativeFeedback>  
        </View>

        <PlayerAvatars 
          users={users} 
          setProfile={setProfile} 
          currentPlayerIndex={currentPlayerIndex}
          setCurrentPlayerIndex={setCurrentPlayerIndex}
        />      */}

        <TouchableOpacity style={styles.settings} onPress={showQuitModal}>
          <MaterialCommunityIcons name='message' size={32} style={styles.cogIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settings} onPress={showQuitModal}>
          <MaterialCommunityIcons name='emoticon' size={32} style={styles.cogIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settings} onPress={showQuitModal}>
          <MaterialCommunityIcons name='microphone-settings' size={32} style={styles.cogIcon} />
        </TouchableOpacity>
         
      </View>



      {/* <TouchableOpacity style={styles.reaction}>
        <MaterialCommunityIcons name='emoticon-outline' size={32} style={{ color: colors.lightText2 }} />
      </TouchableOpacity> */}


      
    </View>
  )
}

export default Sidebar