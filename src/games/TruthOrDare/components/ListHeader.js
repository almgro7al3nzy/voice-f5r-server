import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '../../../Components';


const ListHeader = ({ title, children, count }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flexDirection: 'row',
      backgroundColor: colors.background2,
      backgroundColor: colors.darkBackground,
      paddingHorizontal: 24,
      paddingVertical: 10,
    },
    title: {
      textTransform: 'uppercase',
      fontWeight: 'bold',
      color: colors.text3,
      letterSpacing: 0.5,
    },
    count: {
      fontWeight: 'normal',
      color: colors.text3,
      marginLeft: 5,
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title || children}</Text>
      <Text style={styles.count}>{count}</Text>
    </View>
  )
}

export default ListHeader;