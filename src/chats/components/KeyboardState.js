import React from 'react';
import { Keyboard, Platform, View } from 'react-native';
import { useTheme } from '@react-navigation/native';



const INITIAL_ANIMATION_DURATION = 250;

const KeyboardState = ({ children, layout, layout: { height } }) => {
  const { colors } = useTheme();

  const styles = {
    container: {

    }
  };

  const [contentHeight, setContentHeight] = React.useState(height);
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);
  const [keyboardVisible, setKeyboardVisible] = React.useState(false);
  const [keyboardWillShow, setKeyboardWillShow] = React.useState(false);
  const [keyboardWillHide, setKeyboardWillHide] = React.useState(false);
  const [keyboardAnimationDuration, setKeyboardAnimationDuration] = React.useState(INITIAL_ANIMATION_DURATION);

  React.useEffect(() => {
    let subscriptions
    if (Platform.OS === 'ios') {
      subscriptions = [
        Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow),
        Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide),
        Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow),
        Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide),
      ];
    }
    else {
      subscriptions = [
        Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow),
        Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide),
      ];
    }

    return () => {
      subscriptions.forEach(sub => sub.remove());
    }
  }, []);

  // todel
  React.useEffect(() => {

    
  }, [keyboardVisible]);

  const measure = (e) => {
    
    const { 
      endCoordinates: { height, screenY }, 
      duration = INITIAL_ANIMATION_DURATION 
    } = e;

    // setContentHeight(screenY - layout.y);
    setContentHeight(layout.height - height - layout.y);
    // setKeyboardHeight(height);
    setKeyboardHeight(height + layout.y);

    setKeyboardAnimationDuration(duration);


    
  }

  const handleKeyboardWillShow = (e) => {
    setKeyboardWillShow(true);
    measure(e);
  }

  const handleKeyboardDidShow = (e) => {
    setKeyboardWillShow(false);
    setKeyboardVisible(true);
    measure(e);
  }

  const handleKeyboardWillHide = (e) => {
    setKeyboardWillHide(true);
    measure(e);
  }

  const handleKeyboardDidHide = () => {
    setKeyboardWillHide(false);
    setKeyboardVisible(false);
  }

  return children({
    containerHeight: layout.height,
    contentHeight,
    keyboardHeight,
    keyboardVisible,
    keyboardWillShow,
    keyboardWillHide,
    keyboardAnimationDuration,
  });
}

export default KeyboardState;