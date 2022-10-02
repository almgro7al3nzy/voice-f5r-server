import React from 'react';
import { View, ImageBackground, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '../../Components';

const IntroItem = ({ index, photo, title }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      marginHorizontal: 10,
      marginLeft: index === 0 ? 20 : 0,
    },
    image: {
      width: '100%',
      height: '100%',
      width: 170,
      height: 170,
      resizeMode: 'cover',
      // borderRadius: 20,
      // position: 'absolute',
    },
    // image: {
    //   width: '100%',
    //   height: '100%',
    //   width: 100,
    //   height: 100,
    //   resizeMode: 'cover',
    //   position: 'absolute',
    // },
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.image} />

      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  )
}

export default IntroItem;