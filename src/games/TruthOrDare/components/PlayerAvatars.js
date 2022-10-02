import { useTheme } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Image, Animated } from 'react-native'
import { getInitials, getAvatarColor } from '../utils';
import defaultAvatar from '../../../../assets/images/avatar.png'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SERVER_IP = 'http://192.168.1.2:8000/uploads/avatars/'




const PlayerAvatars = ({ users, setProfile, currentPlayerIndex, setCurrentPlayerIndex, currentPlayerId, voters }) => {
  const { colors } = useTheme();
  
  const styles = {
    container: {
      margin: 5,
    },
    content: {
      alignItems: 'center',
    },
    avatars: {
      // backgroundColor: colors.card2,
      // marginVertical: 15,
      // opacity: 0.1,
    },  
    avatarImg: {
      borderRadius: 22,
      width: 44,
      height: 44,
      // borderWidth: 5,
      // borderColor: 'transparent'
    },
    text: {
      color: colors.lightText2,
    },
    avatar: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 46,
      height: 46,
      borderRadius: 23,
      borderWidth: 2,
      borderColor: 'transparent',
      // backgroundColor: '#' + ((1<<24)*Math.random() | 0).toString(16)
    },
    initials: {
      color: colors.darkText,
      // backgroundColor:getAvatarColor(user.name)
    },
    reaction: {
      color: colors.lightText,
      fontSize: 20,
    },
    row: {
      flexDirection: 'row',

      justifyContent: 'center',
      alignItems: 'center',
    }
  };

  // 
  const scale = React.useRef(new Animated.Value(0)).current;
  const opacity = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {


    
    
    const transition = async () => {
      Animated.timing(scale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      // await sleep(1000);

      Animated.timing(opacity, {
        toValue: 0,
        delay: 1500,
        duration: 300,
        useNativeDriver: true,
      }).start(transitionOut);

      
    }
    
    const transitionOut = () => {
      
      Animated.timing(scale, {
        toValue: 0,
        // delay: 2000 + 2000,
        delay: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();

      Animated.timing(opacity, {
        toValue: 1,
        // delay: 2000 + 2000,
        delay: 700,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    if (voters && voters.length) transition();

    // return () => {
      // transitionOut();
    // }
  }, [voters]);

  return (
    
    <View style={styles.avatars}>
      {users.map((user, index) => {
        // const currentPlayerStyle = index === currentPlayerIndex && {borderColor: colors.primary}
        const currentPlayerAvatarStyle = currentPlayerId === user.id && {borderColor: colors.success}
        const readyPlayerNameStyle = currentPlayerId === user.id && {color: colors.success}

        const avatarSource = { uri: user.avatarSource || user.avatar } || defaultAvatar;
        
        
        // const avatarSource = user.avatar ? { uri: SERVER_IP + user.avatar } : defaultAvatar;

        const voter = voters && voters.find(voter => voter.id === user.id)
        // const reaction = `thumb-${vote}`

        const reaction = voter && `thumb-${voter.vote}`
        // let reaction;
        // 
        // if (voters) reaction = `thumb-${voters.find(voter => voter.id === user.id).vote}`

        return (
          <View style={styles.row} key={user.id}>
            <Animated.View style={[ styles.reactionView, { transform: [{ scale }], opacity } ]}>
              {reaction && <MaterialCommunityIcons name={reaction} style={styles.reaction} />}
            </Animated.View>

            <TouchableOpacity
              
              // underlayColor={colors.grey}
              style={styles.container}
              onPress={() => setProfile(user)}
            >
              <View style={styles.content}>
                <View style={[styles.avatar, currentPlayerAvatarStyle]}>
                  <Image style={[styles.avatarImg,]} source={avatarSource} />                
                </View>
                <Text style={[styles.text, readyPlayerNameStyle]}>{user.name && user.name.split(' ')[0]}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

export default PlayerAvatars

const styles = StyleSheet.create()
