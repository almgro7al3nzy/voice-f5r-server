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
      // width: '100%',

      // height: 35,
      // borderRadius: 15, 
      // paddingHorizontal: 50, 
      // paddingHorizontal: 25, 
      // paddingLeft: 25,
      
      // paddingVertical: 5,
      // borderRadius: 15, 
      // backgroundColor: onPress ? colors.background: 'transparent',

      // position: 'absolute',
      // zIndex: 5,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      // alignItems: 'flex-end',

      // paddingHorizontal: 25, 
      // paddingVertical: 5,
      height: 35,
      justifyContent: 'center',

      borderRadius: 15, 
      backgroundColor: onPress ? colors.background: 'transparent',
    },
    title: {
      // fontSize: 18, 
      fontSize: title && title.split(' ').length === 1 ? 18 : 16,
      fontWeight: 'bold', 
      color: colors.text,

      paddingHorizontal: 15, 
      // paddingLeft: 25,
      // paddingVertical: 5,
    },
    dropdownIcon: {
      fontSize: 15,
      color: colors.text3,
      marginLeft: 3,
      marginTop: 3,
    },
    nextIcon: {
      fontSize: 20,
      color: colors.text3,
      // backgroundColor: colors.background2,

      // borderTopRightRadius: 15, 
      // borderBottomRightRadius: 15, 

      // // paddingVertical: 5,
      // paddingHorizontal: 5, 
      // height: 35,
      // textAlign: 'center',
      // marginTop: 5,
      // paddingTop: 5,
      // paddingRight: 15,
    },
    nextButton: {
      // backgroundColor: 'red',
      height: 35,
      // backgroundColor: colors.background2,

      borderTopRightRadius: 15, 
      borderBottomRightRadius: 15, 

      // paddingVertical: 5,
      paddingHorizontal: 10, 
      justifyContent: 'center',
      alignItems: 'center',
    },
    prevIcon: {
      fontSize: 20,
      color: colors.text3,
    },
    prevButton: {
      // backgroundColor: 'red',
      height: 35,
      // backgroundColor: colors.background2,

      borderTopLeftRadius: 15, 
      borderBottomLeftRadius: 15, 

      // paddingVertical: 5,
      paddingHorizontal: 10, 
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  return (
    // <TouchableHighlight underlayColor={colors.background3} style={styles.container} onPress={onPress}>
      <View style={styles.content}>
      <TouchableHighlight underlayColor={colors.background3} 
        style={styles.prevButton} 
        onPress={onPress}
        >
          <MaterialCommunityIcons name='chevron-left' style={styles.prevIcon} />
        </TouchableHighlight>
        <Text style={styles.title}>{title}</Text>
        {/* {dropdown && <MaterialIcons name={dropdownShowing ? 'arrow-drop-up' :'arrow-drop-down'} style={styles.dropdownIcon} />} */}
        {!nodropdown && <MaterialCommunityIcons name='menu-down' style={styles.dropdownIcon} />}

        <TouchableHighlight underlayColor={colors.background3} 
        style={styles.nextButton} 
        onPress={onPress}
        >
          <MaterialCommunityIcons name='chevron-right' style={styles.nextIcon} />
        </TouchableHighlight>
      </View>
    // </TouchableHighlight>
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