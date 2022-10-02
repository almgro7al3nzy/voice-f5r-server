import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Button } from '../../Components';
import * as Facebook from 'expo-facebook';

const FB_APP_ID = '486950379287130';

const FBLogin = () => {
  const { colors } = useTheme();

  const styles = {
    container: {

    }
  };

  React.useEffect(() => {
    

    initSocialLogin();
  }, []);

  const initSocialLogin = async () => {
    try {
      const fb = await Facebook.initializeAsync({ appId: FB_APP_ID });
      
    } catch (e) {
      
    }
  };

  const fbLogin = async () => {
    try {
      const { token, type } = await Facebook.logInWithReadPermissionsAsync({
        appId: FB_APP_ID,        
        permissions: ['public_profile'],
      });
  
      // GET USER DATA FROM FB API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      const user = await response.json();
      
  
      // GET PROFILE IMAGE DATA FROM FB API
      // NOTE THAT I SET THE IMAGE WIDTH TO 500 WHICH IS OPTIONAL
      const pictureResponse = await fetch(
        `https://graph.facebook.com/v8.0/${user.id}/picture?width=500&redirect=false&access_token=${token}`
      );

      
      const pictureOBject = await pictureResponse.json();
      const userObject = {
        ...user,
        // photoUrl: pictureOBject.data.url,
      };
  
      
      return { type, token, user: userObject };
    } catch (e) {
      return { error: e };
    }
  };
  
  const handleFBLoginPress = async () => {
      const { type, token, user, error } = await fbLogin();
  
      if (type && token) {
        if (type === 'success') {
          // DISPATCH TOKEN AND USER DATA
          // TO HANDLE NAVIGATION TO HOME AND DISPLAY USER INFO

          
          // dispatch({ type: 'FB_LOGIN', token, user });


        }
      } else if (error) {
        
      }
    };

  return (
    <View style={styles.container}>
      {/* <Button onPress={handleStartPress}>Start</Button> */}
      <Button onPress={handleFBLoginPress}>Facebook</Button>
    </View>
  )
}

export default FBLogin;