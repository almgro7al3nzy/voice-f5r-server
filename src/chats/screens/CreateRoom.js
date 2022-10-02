import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';

const CreateRoom = () => {
  const { colors } = useTheme();

  const styles = {
    container: {

    }
  };

  return (
    <View style={styles.container}>
      
    </View>
  )
}

export default CreateRoom;