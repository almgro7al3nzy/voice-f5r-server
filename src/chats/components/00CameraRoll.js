import React from 'react'
import { View, Text } from 'react-native'
import * as MediaLibrary from 'expo-media-library';

const CameraRoll = () => {


  const hasPermission = async () => {
    try {
      const hasPermission = await MediaLibrary.getPermissionsAsync();      
      
      if (hasPermission) return true;

      const permission = await MediaLibrary.requestPermissionsAsync();
      return permission === 'granted';
    } catch (err) {
      
    }
  }

  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default CameraRoll
