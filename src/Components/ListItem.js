import React from 'react';
import { StyleSheet, View, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import Text from './Text';

const ListItem = ({ icon, ionicons = false, title, subtitle, right, onPress }) => {
  const { colors } = useTheme();
  
  const styles = {
    borderContainer: {
      // paddingLeft: 20,
      backgroundColor: colors.card,
      backgroundColor: 'red',
    },
    wrapper: {
      flexDirection: 'row',
      // paddingTop: 16,
      // paddingBottom: 16,
      // paddingRight: 24,
      borderBottomColor: colors.border,
      // borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: 0.5,
      // marginLeft: 5,
      paddingVertical: 16,
      paddingHorizontal: 20,

      backgroundColor: colors.card,
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',

      // backgroundColor: colors.card,
    },
    contentContainer: {
      justifyContent: 'center',
      flex: 1,
      marginLeft: 5,
    },
    title: {
      color: colors.text,
      // fontWeight: 'bold',
      fontSize: 16,
    },
    subtitle: {
      color: colors.text2,
      fontSize: 15,
      marginTop: 4,
    },
    icon: {
      color: colors.text,
      color: colors.text3,
      marginRight: 10,
    },
    right: {
      // marginRight: 20,

    },
    rightText: {
      color: colors.text2,
      fontSize: 14,
    }
  };

  return (
    <TouchableNativeFeedback 
      // style={styles.borderContainer}
      // underlayColor={colors.border}
      background={TouchableNativeFeedback.Ripple(colors.background3)}
      onPress={onPress}
    >
      <View style={styles.wrapper}>
        <View style={styles.container}>
          {icon && !ionicons && (
            <MaterialCommunityIcons
              name={icon}
              size={icon === 'block-helper' ? 20: 24}
              style={styles.icon}
            />
          )}
          {icon && ionicons && (
            <Ionicons
              name={icon}
              size={24}
              style={styles.icon}
            />
          )}
          <View style={styles.contentContainer}>
            <Text style={[styles.title]}>{title}</Text>

            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>

          {/* <View style={styles.right}> */}
            <Text style={styles.rightText}>{right}</Text>
          {/* </View> */}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}


export default ListItem;
// ListItem.propTypes = {
//   icon: PropTypes.string,
//   title: PropTypes.string.isRequired,
//   subtitle: PropTypes.string,
// };

// ListItem.defaultProps = {
//   icon: null,
//   subtitle: null,
// };

// const styles = StyleSheet.create();
