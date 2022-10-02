import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '../../Components';

const ImagePoll = () => {
  const { colors } = useTheme();

  const styles = {
    container: {

    },    
  };

  return (
    <View>
      <Text style={styles.question}></Text>
    </View>
  );
}

export default ImagePoll;