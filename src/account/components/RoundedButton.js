import React from 'react';
import { View, TouchableHighlight, Button } from 'react-native';
import { useTheme } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from '../../Components';


const RoundedButton = ({ title, icon, size = 20 }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // borderRadius: 15, 
      // backgroundColor: 'red',
    },
    content: {
      flexDirection: 'row',
      // alignItems: 'center',
      backgroundColor: colors.background,
      // backgroundColor: 'red',
      // borderRadius: 15, 
      // borderTopRightRadius: 30,
      borderRadius: 10,
      paddingHorizontal: 15, 
      // paddingVertical: 5,
      paddingTop: 5,
      paddingBottom: 2,
    },
    title: {
      color: colors.text,
    },
  };

  return (
    <TouchableHighlight style={styles.container}>
      <View style={styles.content}>
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={size}
            color={colors.text2}
          />
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableHighlight>
  )
}

export default RoundedButton;