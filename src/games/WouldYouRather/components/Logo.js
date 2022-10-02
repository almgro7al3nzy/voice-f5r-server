import React from 'react';
import { View, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '../../../Components';

const Logo = ({ fontSize, color }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'transparent',
      // width: '100%',
      // width: 200,
      height: 200,
      height: 150,
      // borderRadius: 200 / 2,
      borderRadius: 100,
      width: Dimensions.get('window').width,
    },
    subtitle: {
      color: colors.text,
      fontSize: 32,
      fontWeight: 'bold',
    },
    title: {
      color: colors.text,
      fontSize: 20,
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Would You</Text>
      <Text style={styles.subtitle}>Rather</Text>
    </View>
  )
}

export default Logo;