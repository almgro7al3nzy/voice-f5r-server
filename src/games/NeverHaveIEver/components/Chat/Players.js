import { useTheme } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Image, TouchableNativeFeedback } from 'react-native'
import { getInitials, getAvatarColor } from '../../../utils'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CHOICES } from '../Game';


const Players = ({ myChoice, choices, users, setProfile, currentPlayerIndex, setCurrentPlayerIndex, onInviteFriends }) => {
  const { colors } = useTheme();
  
  const styles = {
    container: {
      margin: 5,
    },
    content: {
      alignItems: 'center',
    },
    avatars: {
      // flex: 1,
      flexDirection: 'row',
      // backgroundColor: 'red',

      // justifyContent: 'center',
      // alignItems: 'center',
      // alignItems: 'flex-start',
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
      // alignItems: 'center',
      // justifyContent: 'center',
      // width: 44,
      // height: 44,
      // borderRadius: 22,
      // borderWidth: 25,
      // borderColor: 'transparent',
      // backgroundColor: '#' + ((1<<24)*Math.random() | 0).toString(16)
    },
    initials: {
      color: colors.darkText,
      // backgroundColor:getAvatarColor(user.name)
    },

    inviteBtn: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.darkTranslucent,
      backgroundColor: colors.lightTranslucent,
      justifyContent: 'center',
      alignItems: 'center',
      // marginVertical: 10,

      margin: 5,

      // borderWidth: 1,
      // borderColor: 'yellow',
      // borderColor: colors.lightText,
    },
    inviteIcon: {
      color: colors.lightText,
      // color: colors.primary4,
      fontSize: 25,
    },
    choice: {
      backgroundColor: colors.primary7,
      color: colors.lightText,
      borderRadius: 5,
      // padding: 5,
    }
  };

  // console.log('choices', choices, choices && Object.keys(choices), myChoice);
  console.log('choices', choices, myChoice);
  
  return (
    
    <View style={styles.avatars}>
      {users && users.map((user, index) => {
        // const playerChoiceAvatarStyle = {
        //   borderWidth: 1,
        //   borderRadius: 22,
        //   borderColor: 
        //   myChoice && choices[user.id] === CHOICES.NEVER ? colors.primary7 :
        //   myChoice && choices[user.id] === CHOICES.DONE_THAT ? colors.primary6 :
        //   !myChoice &&  'transparent'
        // }

        // const playerChoiceTextStyle = { color: 
        //   myChoice && choices[user.id] === CHOICES.NEVER ? colors.primary7 : 
        //   myChoice && choices[user.id] === CHOICES.DONE_THAT ? colors.primary6 : 
        //   !myChoice && colors.lightText
        // }


        const playerChoiceAvatarStyle = {
          borderWidth: 1,
          borderRadius: 22,
          borderColor: 
          myChoice && choices[user.id] === CHOICES.NEVER ? colors.primary7 :
          myChoice && choices[user.id] === CHOICES.DONE_THAT ? colors.primary6 :
          'transparent'
        }

        const playerChoiceTextStyle = { color: 
          myChoice && choices[user.id] === CHOICES.NEVER ? colors.primary7 : 
          myChoice && choices[user.id] === CHOICES.DONE_THAT ? colors.primary6 : 
          colors.lightText
        }
        
        // console.log('NHIE playerSTLYES', user.id, myChoice, playerChoiceAvatarStyle, playerChoiceTextStyle);
        console.log('avatarsource', user.avatarSource);
        return (
          <TouchableOpacity
            key={user.username}
            // underlayColor={colors.grey}
            style={styles.container}
            onPress={() => setProfile(user)}
          >
            <View style={styles.content}>
            {/* {myChoice && choices && (
                <Text style={[styles.choice, {backgroundColor: choices[user.id] === CHOICES.NEVER ? colors.primary7 : colors.primary3} ]}>{choices[user.id]}</Text>
              )} */}
              <View style={playerChoiceAvatarStyle}>
                <Image style={[styles.avatarImg,]} source={{ uri: user.avatarSource }} />
              </View>

              {/* <View style={[styles.avatar, currentPlayerStyle]}>
                {user.avatar && <Image style={[styles.avatarImg,]} source={{ uri: user.avatarSource }} />}
                {!user.avatar && <Text style={[styles.initials, {backgroundColor:getAvatarColor(user.name)}]}>{getInitials(user.name)}</Text>}
              </View> */}
              {/* <Text style={styles.text}>{user.username}</Text> */}
              <Text style={[styles.text, playerChoiceTextStyle]}>{user.name && user.name.split(' ')[0]}</Text>
              
            </View>
          </TouchableOpacity>
        );
      })}

      <View style={styles.inviteBtn} pointerEvents='box-only'>
        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#ffff00', true)} onPress={onInviteFriends}>
          <MaterialCommunityIcons name='plus-thick' style={styles.inviteIcon} />
        </TouchableNativeFeedback>  
      </View>
    </View>
  );
}

export default Players

