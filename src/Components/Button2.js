import React from 'react';
import { View, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from './Text';

const Button2 = ({ title, icon, type = 'solid', loading, size, disabled, style, children, onPress, ...rest }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // backgroundColor: 'green',
      // width: '100%',
      // flex: 1,
      // justifyContent: 'flex-start',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      // flex: 1,
      
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: 
        type === 'solid' && !disabled ? colors.primary : 
        type === 'solid' && disabled ? colors.background3 : 
        'transparent',
      borderRadius: 5,
      // width: '50%',
      paddingHorizontal: 40,
      paddingVertical: 5,

      borderWidth: type === 'outline' ? 1 : 0,
      borderColor: colors.primary,
      borderColor: colors.border2,
    },
    icon: {
      marginRight: 10,
      fontSize: 24,
      color: colors.text3,
    },
    title: {
      color: disabled ? colors.text3 : type === 'solid' ? colors.textInverse: colors.text,
      fontSize: size === 'small' ? 12 : 16,
      // fontWeight: '700', 
      // fontWeight: 'bold', 
    }
  };

  const contentColor = 
    type === 'solid' && !disabled ? colors.lightText :
    colors.primary

  return (
    // type === 'solid' || type === undefined && size === 'medium' || size === undefined (
      <TouchableHighlight underlayColor={colors.background} style={[styles.container, style]} onPress={onPress} disabled={disabled}>
        <View style={styles.content}>
          {!loading && icon && <MaterialCommunityIcons name={icon} style={styles.icon} />}
          {!loading && title && <Text style={styles.title}>{title || children}</Text>}
          {loading && <ActivityIndicator size='large' color={contentColor} style={{ justifyContent: 'center', alignItems: 'center' }} />}
        </View>
      </TouchableHighlight>
    // )
  );
}

export default Button2;