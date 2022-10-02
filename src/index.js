
import React, { useEffect } from 'react'
import { useColorScheme, Platform, UIManager } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen'



import AuthStack from './auth';
import HomeStack from './HomeStack';

import { getUser, clearToken } from './auth/actions';
import { getTheme } from './account/actions';
// import { StatusBar } from './Components';
// import { initLocalization } from './localized';



const Stack = createStackNavigator();

const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // background: 'black',
    primary: 'darkviolet',
    primaryLight: '#E6E6FA',
    primaryDark: '#D8BFD8',
    primary2: 'red',
    primary3: 'blue',
    primary4: 'yellow',
    primary5: 'green',
    primary6: 'dodgerblue',
    primary7: 'red',
    text2: '#555',
    text3: '#999',
    text4: '#bbb',
    textInverse: 'white',
    textInverse2: '#ddd',
    notification: 'darkviolet',
    notification: 'blueviolet',
    lightBackground: 'white',
    background2: '#bbb',
    // background3: '#ddd',
    background3: '#ececec',    
    background4: '#e1e1e1',    
    border2: '#ccc',
    translucent: 'rgba(0,0,0,0.1)',
    primaryTransparent: 'rgba(148,0,211,0.3)',
    border: '#eee',
    darkBackground: '#111222',
    darkBackground: '#111',
    darkBackground2: '#222',
    darkBackground3: '#313131',
    darkBorder: '#333444',
    darkText: '#000000',
    lightText: '#ffffff',
    darkText2: '#cccccc',
    lightText2: '#cccccc',
    lightText3: '#aaaaaa',
    lightText4: 'rgba(255,255,255,0.5)',
    lightTranslucent: 'rgba(255,255,255,0.3)',
    lightTranslucent2: 'rgba(255,255,255,0.1)',
    lightTranslucent3: 'rgba(255,255,255,0.5)',
    darkTranslucent: 'rgba(0,0,0,0.1)',
    darkTranslucent2: 'rgba(0,0,0,0.5)',
    darkTranslucent3: 'rgba(0,0,0,0.25)',
    darkTranslucent4: 'rgba(0,0,0,0.75)',
    // secondary: ''
    info: '#3498db',
  warning: '#f1c40f',
  danger: '#e74c3c',
  success: '#2ecc71',

    info: 'blue',
    danger: 'red',
    warning: 'yellow',
    success: 'lime',
    // backgroundInverse: 
    basic: 'red',
    basic2: 'blue',
    basicTranslucent: 'rgba(255,0,0,0.3)',
    basic2Translucent: 'rgba(0,0,255,0.3)',
    lightBorder: 'white',
    // darkBackground: '#414141',
    truth: 'darkred',
    dare: 'dodgerblue',
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'darkviolet',
    background: '#222',
    // border: '#444',
    border2: '#444',
    primary: 'mediumpurple',
    text2: '#eee',
    text3: '#aaa',
    textInverse: 'black',
    // card: '#222',
    notification: 'blueviolet',
  },
};


if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}







const Auth = ({ user, getUser, clearToken, state, getTheme, theme }) => {

  const scheme = useColorScheme();

  useEffect(() => {


    const bootstrapAsync = async () => {  
      try {            
        
        const token = await AsyncStorage.getItem('token');
        
        
        if (!token) return clearToken();
    
        const decoded = jwtDecode(token);

        const now = Date.now() / 1000;

        if (decoded.exp < now) return clearToken();
        
        return getUser(token);
    
      } catch (err) {
        console.log(err);
      }
    }

    const prepare = async () => {
      try {
        // initLocalization();
        
        getTheme();

        await bootstrapAsync();

      }
      catch (err) {
        console.log(err);
      }
    }
    
    prepare();
    // bootstrapAsync();
    // SplashScreen.hide();

    // setTimeout(() => SplashScreen.hide(), 500)
    // if (user !== undefined) SplashScreen.hide();
  }, []);

  // React.useEffect(() => {
  //   
  // })

  React.useEffect(() => {

    if (user !== undefined) SplashScreen.hide();
  }, [user]);

  

  
  // const theme = theme === 'dark' ? DarkTheme : DefaultTheme;
  // scheme !== 'dark' ? DarkTheme : DefaultTheme
  return (
    user !== undefined &&
      <SafeAreaProvider>
        <NavigationContainer theme={theme === 'dark' ? CustomDarkTheme : CustomDefaultTheme}>
          <Stack.Navigator>
            {Boolean(user) ? (
            <Stack.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
            ) : (
              <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
              )}
          </Stack.Navigator>
        </NavigationContainer>    
      </SafeAreaProvider>
  );
}

const mapStateToProps = state => ({
  user: state.auth.user,
  state: state,
  theme: state.account.theme
})

export default connect(
  mapStateToProps,
  { getUser, clearToken, getTheme }
  // { logout, loadUser, setCurrentUser, updateLocation }
)(Auth);


