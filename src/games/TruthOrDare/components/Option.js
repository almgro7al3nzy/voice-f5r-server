import { useTheme } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

import { TRUTH, DARE, CHOICES } from '../types';


const Option = ({ option, style, truthOrDareChoice, onPress, currentPlayerId, isCurrentPlayer, ...rest }) => {
  const { colors } = useTheme();

  const styles = {
    notCurrentPlayer: {
      Truth: {
        // opacity: 0,
        // backgroundColor: 'rgba(255,255,255,0.5)',
      },
      Dare: {
        // opacity: 0,
        // backgroundColor: 'rgba(0,0,0,0.1)',
      },
      text: {
        color: 'white',
        fontSize: 48,
        fontWeight: 'bold',
        // backgroundColor: 'cyan',
        // textAlign: 'center',
      },
    },
    Truth: {
      flex: 1,
      backgroundColor: 'lightcoral',
      backgroundColor: 'rgba(255,0,0,0.5)',    
      justifyContent: 'center',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row',
  
      // paddingTop: 50,
    },
    
    Dare: {
      flex: 1,
      backgroundColor: 'rgba(100,149,237,0.6)',
      // backgroundColor: 'rgba(0,0,255,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
  
      // paddingTop: 50,
    },
  
  
  
  
  
    text: {
      color: 'white',
      fontSize: 48,
      fontWeight: 'bold',
      // backgroundColor: 'cyan',
      // textAlign: 'center',
    },
    // option: {
    //   // textAlign: 'center',
    //   flex: 1,
    //   // width: '100%',
    //   // alignItems: 'center',
    // },
    option: {
      flex: 1,
      backgroundColor: 'lightcoral',
      backgroundColor: 'rgba(255,0,0,0.5)',    
      justifyContent: 'center',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row',
  
      // paddingTop: 30,
    },
  }

  const optionChosenStyle = {
    paddingTop: 30,
    // marginTop: 20,
  };

  

  return (
    
    <TouchableOpacity 
      style={[{ flex: truthOrDareChoice && truthOrDareChoice !== option ? 0 : 1, ...styles[option], ...style }, truthOrDareChoice && optionChosenStyle, !isCurrentPlayer && styles.notCurrentPlayer[option] ]} 
      onPress={onPress}
      {...rest}
    >
      {/* <SafeAreaView> */}
      <Text style={{ alignSelf: truthOrDareChoice === option ? 'flex-start' : !currentPlayerId && option === DARE ? 'flex-start' : !currentPlayerId && option === TRUTH ? 'flex-end' : 'center', ...styles.text }}>
        {option}
      </Text>
      {/* </SafeAreaView> */}
    </TouchableOpacity>
  )
}

export default Option

const styles = StyleSheet.create()
