import { useTheme } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../colors';

const RoomCodeInput = ({ onJoinRoom, onCreateRoom }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // flex: 1,
      // marginTop: 150,
      flexDirection: 'row',
      // justifyContent: 'center',
      // justifyContent: '',
      // alignItems: 'center',
      // alignItems: 'stretch',
      // width: '100%',
      // backgroundColor: 'green',
    },
    input: {
      // backgroundColor: 'black',
      paddingHorizontal: 20,
      // width: '100%',
      height: 60,
      // position: 'absolute',
      color: 'white',
      fontSize: 18,
      borderRightWidth: 25,
      borderRightColor: 'red',
      borderRightColor: 'rgba(128,0,0,0.3)',
      borderTopWidth: 60,
      borderTopColor: 'rgba(128,0,0,0.3)',
      // top: 0,
      // left: 0,
      width: '50%',
    },
    button: {
      width: 100,
      width: '50%',
      height: 0,
      borderBottomWidth: 60,
      borderBottomColor: 'rgba(0,0,139,0.3)',
      borderLeftWidth: 25,
      borderLeftColor: 'rgba(128,0,0,0.3)',    
  
  
      // position: 'absolute',
      justifyContent: 'center',
      // alignItems: 'center',
    },
    chevron: {
      position: 'absolute',
      right: 0,
      // bottom: 0,
      top: 5,
    },
    submitText: {
      color: colors.lightText,
      position: 'absolute',
      right: 50,
      // bottom: 0,
      top: 17,
      // left: 10,
      fontSize: 18,
    }
  };

  const [text, setText] = React.useState('');

  // const handleCreateRoom = () => {
    
  // }

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        maxLength={6}
        value={text}
        onChangeText={setText}
        onSubmitEditing={() => onJoinRoom(text)}
        returnKeyType='go'
        autoCapitalize='characters'
        placeholder='Enter Code'
        placeholderTextColor='lightgrey'
      />
      <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={text ? () => onJoinRoom(text) : onCreateRoom}>
        <View>
          <Text style={styles.submitText}>{text ? 'Join Game' : 'Create Game'}</Text>
          <MaterialCommunityIcons
            name='chevron-right'
            size={50}
            color={'white'}
            style={styles.chevron}
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default RoomCodeInput

const styles = StyleSheet.create()
