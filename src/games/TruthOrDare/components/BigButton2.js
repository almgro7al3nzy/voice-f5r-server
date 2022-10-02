import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../colors';

const BigButton2 = () => {
  return (
    <View style={styles.container}>
      {/* <View> */}
        <TextInput 
          style={styles.input}
          maxLength={6}
          autoCapitalize='characters'
        />
      {/* </View> */}
      <TouchableOpacity style={styles.trapezoid}>
        <MaterialCommunityIcons
          name='chevron-right'
          size={25}
          color={colors.text}
        />
      </TouchableOpacity>
    </View>
  )
}

export default BigButton2

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    // backgroundColor: 'black',
    paddingHorizontal: 50,
    // width: '100%',
    height: 100,
    // position: 'absolute',
    color: 'white',
    fontSize: 18,
    borderRightWidth: 50,
    borderRightColor: 'red',
    borderRightColor: 'transparent',
    borderTopWidth: 100,
    borderTopColor: 'red',
    // top: 0,
    // left: 0,
  },
  input2: {
    width: 200,
    height: 0,
    borderBottomWidth: 100,
    borderBottomColor: 'red',
    borderLeftWidth: 50,
    borderLeftColor: 'transparent',   





    backgroundColor: 'black',
    width: '100%',
    height: 100,
    position: 'absolute',
    color: 'white',
    fontSize: 18,
  }
  ,
  trapezoid: {
    width: 200,
    height: 0,
    borderBottomWidth: 100,
    borderBottomColor: 'red',
    borderLeftWidth: 50,
    borderLeftColor: 'transparent',    


    justifyContent: 'center',
    // alignItems: 'center',
  },
  triangle: {
    position: 'absolute',
    right: 0,
    // left: 0,
    width: 200,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    // borderLeftWidth: 100,
    borderRightWidth: 50,
    borderTopWidth: 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderRightColor: 'blue',
    // borderLeftColor: 'green',
    borderTopColor: 'purple',
    // borderBottomWidth: 100,
    // borderBottomColor: 'red'
  }
})
