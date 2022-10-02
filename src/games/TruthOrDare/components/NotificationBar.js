import React from 'react';
import { View, Animated } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '../../../Components';
import { sleep } from '../../../utils';

const NotificationBar = ({ message }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      position: 'absolute',
      top: 80,
      zIndex: 1,
      backgroundColor: colors.darkTranslucent3,
      // borderRadius: 5,
      // width: '100%',
      paddingHorizontal: 50,
      paddingVertical: 10,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: colors.lightText,
      fontWeight: 'bold',
      fontSize: 16,
    }
  };

  const scale = React.useRef(new Animated.Value(0)).current;
  const opacity = React.useRef(new Animated.Value(1)).current;

  
  React.useEffect(() => {


    
    
    const transition = async () => {
      Animated.timing(scale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      // await sleep(1000);

      Animated.timing(opacity, {
        toValue: 0,
        delay: 1500,
        duration: 300,
        useNativeDriver: true,
      }).start(transitionOut);

      
    }
    
    const transitionOut = () => {
      
      Animated.timing(scale, {
        toValue: 0,
        // delay: 2000 + 2000,
        delay: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();

      Animated.timing(opacity, {
        toValue: 1,
        // delay: 2000 + 2000,
        delay: 700,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }

    if (message) transition();

    // return () => {
      // transitionOut();
    // }
  }, [message]);


  return (
    <Animated.View 
      style={[ styles.container, { transform: [{ scale }], opacity } ]}>
      <Text style={styles.title}>
        {message}
        {/* He Joined */}
        </Text>
    </Animated.View>
  )
}

export default NotificationBar;