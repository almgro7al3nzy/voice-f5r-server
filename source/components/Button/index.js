import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { colors } from '../../utils/colors'
import TextView from '../TextView'
import { styles } from './style'

const Button = ({label,onPress,flex}) => {
  return (
    <TouchableOpacity style={{flex,...styles.container}} onPress={onPress}>
        <TextView bold color={colors.blue}>{label}</TextView>
    </TouchableOpacity>
  )
}

export default Button