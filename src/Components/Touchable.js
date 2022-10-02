import React from 'react';
import { View, Platform, TouchableNativeFeedback, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '@react-navigation/native';

const Touchable = ({ type = 'highlight', disabled, background, underlayColor, style, children, onPress, ...rest }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      backgroundColor: 
        // type === 'highlight' && !disabled ? colors.primary : 
        type === 'highlight' && disabled ? colors.background3 : 
        'transparent',
    }
  };

  // highlight, opacity, none USE UNDERLAYCOLOR NOT BACKGROUND

  // 

  return (
    type === 'none' ? 
    <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
     : type === 'opacity' ? 
    <TouchableOpacity disabled={disabled} {...rest}>{children}</TouchableOpacity>
     :
    type === 'highlight' && Platform.OS === 'android'
    //  ? <View style={{ borderRadius: style && style.borderRadius }}><TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(background || colors.background4, true)} {...rest}><View style={style}>{children}</View></TouchableNativeFeedback></View>
     ? <View style={{ borderRadius: style && style.borderRadius }}><TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(background || colors.background4)} onPress={onPress} disabled={disabled} {...rest}><View style={[styles.container, style]}>{children}</View></TouchableNativeFeedback></View>

     : <TouchableHighlight underlayColor={'red'} disabled={disabled} {...rest}>{children}</TouchableHighlight>
  )
}

// Touchable.propTypes = {
//   type: PropTypes.string,
//   title: PropTypes.string.isRequired,
//   subtitle: PropTypes.string,
// };

// Touchable.defaultProps = {
//   icon: null,
//   subtitle: null,
// };


export default Touchable;