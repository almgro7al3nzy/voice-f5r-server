import React from 'react';
import { TouchableOpacity, TouchableHighlight, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Text from './Text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const TabbedHeaderTitle = ({ activeTab, tabs }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // // flex: 1,
      // width: '100%',
      // borderRadius: 15, 
      // // borderRadius: 15, 
      // paddingHorizontal: 50, 
      // paddingHorizontal: 25, 
      // paddingVertical: 5,
      // backgroundColor: 'red',

      // // position: 'absolute',
      // // zIndex: 5,


      flexDirection: 'row',
      alignItems: 'center',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      // alignItems: 'flex-end',
    },
    // title: {
    //   // fontSize: 18, 
    //   fontSize: title && title.split(' ').length === 1 ? 18 : 16,
    //   fontWeight: 'bold', 
    //   color: colors.text,
    // },
    dropdownIcon: {
      fontSize: 15,
      color: colors.text3,
      marginLeft: 3,
      marginTop: 3,
    },
    tab: {
      backgroundColor: 'green',
      backgroundColor: colors.background,
      padding: 10,
      // borderRadius: 15, 
    },
    icon: {
      fontSize: 25,
      color: colors.text,
    }
  };

  

  return (
    <View style={styles.container}>
      {tabs.map(({icon, onPress}, index) => {
        
        const radius = 15;
        const borderRadius = 
          index === 0 ? { borderTopLeftRadius: radius, borderBottomLeftRadius: radius, } :
          index === tabs.length - 1 ? { borderTopRightRadius: radius, borderBottomRightRadius: radius, } : {}
        return (
          <TouchableHighlight key={icon} underlayColor={colors.background3} style={[styles.tab, borderRadius]} onPress={onPress}>
            <MaterialCommunityIcons name={icon} style={styles.icon} />
          </TouchableHighlight>
        );
      })}
    </View>
  )

  // return (
  //   <TouchableHighlight underlayColor={colors.background3} style={styles.container} onPress={onPress}>
  //     <View style={styles.content}>
  //       <Text style={styles.title}>{title}</Text>
  //       {!nodropdown && <MaterialCommunityIcons name='menu-down' style={styles.dropdownIcon} />}
  //     </View>
  //   </TouchableHighlight>
  // )  

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

export default TabbedHeaderTitle;