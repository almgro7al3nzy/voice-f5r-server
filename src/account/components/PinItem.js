import React from 'react';
import { View, ImageBackground } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '../../Components';

const IntroItem = ({ index, photo, title, text }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      width: '100%',
      height: '100%',
      width: 100,
      height: 100,
      marginHorizontal: 10,
      marginLeft: index === 0 ? 20 : 0,
      // resizeMode: 'cover',
      // position: 'absolute',
    },
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  )
}

export default IntroItem;