import React from 'react';
import { TouchableOpacity, TouchableHighlight, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Text from './Text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const HeaderTitle = ({ title, onPress, nodropdown = false, dropdownShowing }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // flex: 1,
      width: '100%',
      borderRadius: 15, 
      // borderRadius: 15, 
      paddingHorizontal: 50, 
      paddingHorizontal: 25, 
      paddingVertical: 5,
      backgroundColor: onPress ? colors.background: 'transparent',

      // position: 'absolute',
      // zIndex: 5,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      // alignItems: 'flex-end',
    },
    title: {
      // fontSize: 18, 
      fontSize: title && title.split(' ').length === 1 ? 18 : 16,
      fontWeight: 'bold', 
      color: colors.text,
    },
    dropdownIcon: {
      fontSize: 15,
      color: colors.text3,
      marginLeft: 3,
      marginTop: 3,
    }
  };

  return (
    <TouchableHighlight underlayColor={colors.background3} style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {/* {dropdown && <MaterialIcons name={dropdownShowing ? 'arrow-drop-up' :'arrow-drop-down'} style={styles.dropdownIcon} />} */}
        {!nodropdown && <MaterialCommunityIcons name='menu-down' style={styles.dropdownIcon} />}
      </View>
    </TouchableHighlight>
  )  

  // if (onPress) return (
  //   <TouchableHighlight underlayColor={colors.background3} style={styles.container} onPress={onPress}>
  //     <Text style={styles.title}>{title}</Text>
  //   </TouchableHighlight>
  // )  
  // else return (
  //   <TouchableOpacity style={styles.container} onPress={onPress}>
  //     <Text style={styles.title}>{title}</Text>
  //   </TouchableOpacity>
  // )
}

export default HeaderTitle;