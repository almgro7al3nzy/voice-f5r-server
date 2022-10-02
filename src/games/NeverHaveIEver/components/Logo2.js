import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '../../../Components';

const Logo = () => {
  const { colors } = useTheme();

  const styles = {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'transparent',
      // width: '100%',
      // width: 200,
      height: 200,
      // borderRadius: 200 / 2,
      borderRadius: 100,
    },
    title: {
      color: colors.primary2,
      fontSize: 22,
      // fontWeight: 'bold',
    },
    subtitle: {
      color: colors.primary3,
      fontSize: 64,
      fontWeight: 'bold',
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Never Have I</Text>
      <Text style={styles.subtitle}>Ever</Text>
    </View>
  )
}

export default Logo;