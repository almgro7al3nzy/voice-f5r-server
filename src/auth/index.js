import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import WelcomeScreen from './screens/Welcome';
import BirthdayScreen from './screens/Birthday';
import PhoneOrEmail from './screens/PhoneOrEmail';
import OtpVerification from './screens/OtpVerification';
import Login2 from './screens/Login2';
import LoginTemp from './screens/LoginTemp';

const Stack = createStackNavigator();

const Login = () => {
  return (
    <Stack.Navigator initalRouteName='Login'
    // screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Welcome' component={WelcomeScreen} 
      // options={{ headerShown: false }} 
      options={{ title: '' }}
      />
      
      <Stack.Screen name='PhoneOrEmail' component={PhoneOrEmail} 
      options={{ title: '' }}
      />
      <Stack.Screen name='OtpVerification' component={OtpVerification} 
      options={{ title: '' }}
      />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Login2' component={Login2} />
      <Stack.Screen name='LoginTemp' component={LoginTemp} />
      <Stack.Screen name='Register' component={RegisterScreen} options={{ title: 'Sign up' }} />
      <Stack.Screen name='Birthday' component={BirthdayScreen} options={{}} />
      {/* <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} /> */}
    </Stack.Navigator>
  )
}

export default Login
