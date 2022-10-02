import React from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from './Text';
import { useHeaderHeight } from "@react-navigation/stack";


// const Header = ({ title, leftText, leftIcon, onPressLeftButton }) => {
const Header = ({ leftButton, middleButton, rightButton }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      height: useHeaderHeight(),
      backgroundColor: 'red',
      backgroundColor: colors.card,
      paddingVertical: 8,
    },
    title: {
      // position: 'absolute',
      // left: 0,
      // right: 0,
      // top: 0,
      // bottom: 0,
      marginLeft: 20,
      fontSize: 18,
      fontWeight: 'bold',
      paddingVertical: 2,
    },
    leftButton: {
      marginLeft: 20,
      // position: 'absolute',
      // top: 0,
    },
    rightButton: {
      marginRight: 20,
      // position: 'absolute',
      // top: 0,
    },
    row: {
      flexDirection: 'row',
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
      {leftButton && (
        <TouchableOpacity style={styles.leftButton} onPress={leftButton.onPress}>
          {leftButton.icon && (
            <MaterialCommunityIcons name={leftButton.icon} size={25} color={colors.text} />
          )}
          {leftButton.text && (
            <Text>{leftButton.text}</Text>
          )}
        </TouchableOpacity>
      )}
      {middleButton && <Text style={styles.title}>{middleButton.text}</Text>}
      </View>
      {rightButton && (
        <TouchableOpacity style={styles.rightButton} onPress={rightButton.onPress}>
          {rightButton.icon && (
            <MaterialCommunityIcons name={rightButton.icon} size={25} color={colors.text} />
          )}
          {rightButton.text && (
            <Text>{rightButton.text}</Text>
          )}
        </TouchableOpacity>
      )}
    </SafeAreaView>
  )
}

export default Header;