import { useTheme } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight, Dimensions, StatusBar } from 'react-native'
import Modal from 'react-native-modal';


const ProfileModal = ({ profile, isVisible, hideModal }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // height: Dimensions.get('window').height + StatusBar.currentHeight,
      backgroundColor: colors.card,
      // backgroundColor: colors.darkBackground2,

      // backgroundColor: 'blue',
      // padding: 3,
      // paddingTop: 10,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    header: {
      // justifyContent: 'center',
      alignItems: 'center',
      top: -44,
      // position: 'absolute',
      // margin: 0,
      // padding: 0,
      // backgroundColor: 'red',
    },
    image: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 93,
    height: 93,
    borderRadius: 100 / 2,
    backgroundColor: "red",
    backgroundColor: colors.card,
    // backgroundColor: colors.darkBackground2,
    },
    avatar: {
      width: 88,
      height: 88,
      borderRadius: 44,
    },
    name: {
      color: colors.text
    },
    username: {
      color: colors.text3
    },
    actions: {
      flexDirection: 'row',
      // backgroundColor: 'blue',
      // top: -22,
    },
    action: {
      flex: 1,
      paddingVertical: 10,
      backgroundColor: colors.border,
      // backgroundColor: 'blue',
    },
    actionText: {
      color: colors.text,
      textAlign: 'center',
      borderRightWidth: 1,
      borderColor: colors.border2,
    }
  };

  
  return (
    
    <Modal 
      isVisible={isVisible}
      onBackButtonPress={hideModal}
      onBackdropPress={hideModal}
      backdropOpacity={0.5}
      statusBarTranslucent
      style={{
        justifyContent: 'flex-end',
        margin: 0,   
        marginBottom: Dimensions.get('screen').height - Dimensions.get('window').height - StatusBar.currentHeight,
        // height: Dimensions.get('window').height + StatusBar.currentHeight,

        // backgroundColor: 'yellow',
        // marginBottom: 100,
        // paddingBottom: 100,
        // position: 'absolute'
        // bottom: 0,
        // flex: 0,
      }}
      useNativeDriverForBackdrop={true}
      useNativeDriver={true}
      swipeDirection='down'
      onSwipeComplete={hideModal}
      animationInTiming={500}
        // swipeThreshold={400}
    >
      {profile && (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.image}>
            <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          </View>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.username}>@{profile.username}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableHighlight style={styles.action}>
            <Text style={styles.actionText}>Add Friend</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.action}>
            <Text style={styles.actionText}>Send Message</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.action}>
            <Text style={[styles.actionText, {color:'red', borderRightWidth:0}]}>Votekick</Text>
          </TouchableHighlight>
        </View>
      </View>
      )}
      {!profile && (
        <Text>WTF</Text>
      )}
    </Modal>  
  );
}

export default ProfileModal

// ADD MUTE BUTTON