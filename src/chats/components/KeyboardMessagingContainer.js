import React from 'react';
import { View, BackHandler, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useTheme, useFocusEffect } from '@react-navigation/native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { configureTransition } from '../utils';

export const INPUT_METHOD = {
  NONE: 'NONE',
  KEYBOARD: 'KEYBOARD',
  CUSTOM: 'CUSTOM',
}

const MessagingContainer = ({ 
  children,
  inputMethod,
  onChangeInputMethod, 
  renderInputMethodEditor,
  containerHeight,
  contentHeight,
  keyboardVisible,
  keyboardHeight,
  keyboardWillShow,
  keyboardWillHide,
  keyboardAnimationDuration
}) => {
  const { colors } = useTheme();

  const styles = {
    container: {

    }
  };

  configureTransition();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (inputMethod === INPUT_METHOD.CUSTOM) {
          onChangeInputMethod(INPUT_METHOD.NONE);
          return true;
        }

        return false;
      }
      
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => 
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [inputMethod, onChangeInputMethod])
  );

  React.useEffect(() => {
    if (keyboardVisible) onChangeInputMethod(INPUT_METHOD.KEYBOARD);

    else if (!keyboardVisible && inputMethod !== INPUT_METHOD.CUSTOM) onChangeInputMethod(INPUT_METHOD.NONE);

    
    // const animation = LayoutAnimation.create(
    //   keyboardAnimationDuration,
    //   Platform.OS === 'android' ? LayoutAnimation.Types.easeInEaseOut : LayoutAnimation.Types.keyboard,
    //   LayoutAnimation.Properties.scaleY,
    // );
    // LayoutAnimation.configureNext(animation);


    // LayoutAnimation.configureNext(
    //   LayoutAnimation.create(
    //     500,
    //     LayoutAnimation.Types.keyboard,
    //     LayoutAnimation.Properties.scaleXY
    //   )
    // );
  }, [keyboardVisible, inputMethod]);




  
  
  const useContentHeight = keyboardWillShow || inputMethod === INPUT_METHOD.KEYBOARD;

  const containerStyle = { 
    height: useContentHeight ? contentHeight : containerHeight,

    // backgroundColor: 'red',
    // padding: 10,
    // borderWidth: 5,    
  };

  const showCustomInput = inputMethod === INPUT_METHOD.CUSTOM && !keyboardWillShow;

  const keyboardIsHidden = inputMethod === INPUT_METHOD.NONE && !keyboardWillShow;

  const keyboardIsHiding = inputMethod === INPUT_METHOD.KEYBOARD && keyboardWillHide;

  const inputStyle = { 
    height: showCustomInput ? keyboardHeight || 250 : 0,
    marginTop: isIphoneX() && (keyboardIsHidden || keyboardIsHiding) ? 24 : 0,

    // backgroundColor: 'blue',
    // padding: 10,
    // borderWidth: 5,
  };

  
  return (
    <View style={containerStyle}>
      {children}
      <View style={inputStyle}>{renderInputMethodEditor()}</View>
    </View>
  );
}

export default MessagingContainer;