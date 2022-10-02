import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from './Text';


const ListHeader = ({ title, children, count, rightText, rightIcon, rightOnPress }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flexDirection: 'row',
      backgroundColor: colors.background2,
      backgroundColor: colors.card,
      paddingHorizontal: 20,
      // paddingHorizontal: 10,
      paddingVertical: 10,
      justifyContent: 'space-between',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      // backgroundColor: colors.background2,
      // backgroundColor: colors.card,
      // paddingHorizontal: 24,
      // paddingVertical: 10,
      // justifyContent: 'space-between',
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
    rightIcon: {
      fontSize: 20,
      color: colors.text3
    },
    rightText: {
      fontWeight: 'bold',
      color: colors.text3,
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>{title || children}</Text>
        <Text style={styles.count}>{count}</Text>
      </View>
      <TouchableOpacity onPress={rightOnPress} style={styles.row}>
        <MaterialCommunityIcons name={rightIcon} style={styles.rightIcon} />
        <Text style={styles.rightText}>{rightText}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ListHeader;