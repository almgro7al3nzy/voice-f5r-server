import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { colors } from '../../../utils/colors'
import { generateRandomColor } from '../../../utils/functions'
import Avatar from '../../Avatar'
import TextView from '../../TextView'
import { styles } from './style'

const HomeListItem = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Avatar text={label} backgroundColor={generateRandomColor()} />
      <View style={styles.textContent}>
        <TextView bold color={colors.black}>{label}</TextView>
      </View>
    </TouchableOpacity>
  )
}

export default HomeListItem