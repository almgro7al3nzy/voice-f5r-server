import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Settings from './screens/Settings';
import ProfileScreen from './screens/ProfileScreen';
import EditProfile from './screens/EditProfile';
// import OptionsScreen from './screens/00Options';

import AddRole from './screens/AddRole';
import AddRoleDetails from './screens/AddRoleDetails';
import JoinSpace from './screens/JoinSpace';

const Stack = createStackNavigator();

const Login = () => {
  return (
    <Stack.Navigator 
      initalRouteName='Profile' 
      // mode='modal'
      screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
    >
      <Stack.Screen name='EditProfile' component={EditProfile} />
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='Settings' component={Settings} options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} />

      <Stack.Screen name='AddRole' component={AddRole} />
      <Stack.Screen name='AddRoleDetails' component={AddRoleDetails} />
      <Stack.Screen name='JoinSpace' component={JoinSpace} />

      {/* <Stack.Screen name='Options' component={OptionsScreen} /> */}
    </Stack.Navigator>    
  )
}

export default Login
