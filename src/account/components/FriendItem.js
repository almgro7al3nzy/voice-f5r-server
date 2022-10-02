import React from 'react';
import { View, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '../../Components';

const FriendItem = ({ index, name, avatar }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      marginHorizontal: 10,
      marginLeft: index === 0 ? 20 : 0,
    },
    image: {
      width: '100%',
      height: '100%',
      width: 44,
      height: 44,
      borderRadius: 22,
      resizeMode: 'cover',
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
      <Image source={{ uri: avatar }} style={styles.image} />

      <View>
        <Text style={styles.title}>{name.split(' ')[0]}</Text>
      </View>
    </View>
  );
}

export default FriendItem;