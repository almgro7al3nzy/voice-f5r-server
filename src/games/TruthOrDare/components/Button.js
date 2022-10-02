import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import colors from '../colors'

const Button = ({ children, style, disabled, ...rest }) => {
  const styles = {
    button: {
      display: children ? 'flex' : 'none',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: disabled ? colors.text4 : colors.text,
      paddingVertical: 5,
      paddingHorizontal: 20,
    },
    text: {
      fontSize: 20,
      color: colors.text,
      color: disabled ? colors.text3 : colors.text,
    }
  };

  return (
    <TouchableOpacity style={[styles.button, style]} disabled={disabled} {...rest}>
      <Text style={styles.text}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create()
