import React, { useEffect } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '@react-navigation/native';
import RoomsStack from './chats';
import ExploreStack from './explore';
// import ContactsStack from './contacts';
import AccountStack from './account';
import GamesStack from './games';
import { setSocket } from './chats/actions';
import { connect } from 'react-redux';
import { io } from 'socket.io-client';
const ENDPOINT = 'http://10.0.2.2:8000/chats';
import { createStackNavigator } from '@react-navigation/stack';
import TruthOrDare from './games/TruthOrDare';





const Tab = createMaterialBottomTabNavigator();


const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator initialRouteName='Rooms' 
    // screenOptions={{ headerShown: false }}
    >
      {/* <Stack.Screen name='Games' component={GamesStack} /> */}
      <Stack.Screen name='Rooms' component={HomeTabs} />

      <Stack.Screen name='TruthOrDare' component={TruthOrDare} />
    </Stack.Navigator>
  )
}




const getTabBarIcon = icon => ({ color }) => (
  <MaterialCommunityIcons name={icon} size={26} color={color} />
);

const HomeTabs = ({ setSocket }) => {
  const { colors } = useTheme();

  // useEffect(() => {
  //   const socket = socketConnect();

  //   
  //   return () => {
  //     socket.disconnect();
  //   }
  // }, []);

  // const socketConnect = () => {
  //   const socket = io(ENDPOINT, { transports: ['websocket'] });
  //   

  //   socket.on('connected', data => {
  //     
  //   });


  //   setSocket(socket);

  //   return socket;
  // }

  return (
    <Tab.Navigator
      initialRouteName='Rooms'
      activeColor={colors.primary}
      inactiveColor={colors.text3}
      // screenOptions={{ showLabel: false, tabBarLabel: '' }}
      barStyle={{ 
        // paddingBottom: 48,         
        backgroundColor: colors.background 
      }}
    >
      <Tab.Screen 
        name="Rooms" 
        component={RoomsStack} 
        options={{
          // tabBarLabel: 'Rooms',
          tabBarIcon: getTabBarIcon('home')
        }} 
      />
      {/* <Tab.Screen 
        name="Contacts" 
        component={ContactsStack} 
        options={{
          // tabBarLabel: 'Contacts',
          tabBarIcon: getTabBarIcon('contacts')
        }} 
      /> */}
      <Tab.Screen 
        name="Explore" 
        component={ExploreStack} 
        options={{
          // tabBarLabel: 'Explore',
          tabBarIcon: getTabBarIcon('compass')
        }}
      />
      <Tab.Screen 
        name="Games" 
        component={TruthOrDare} 
        options={{
          // tabBarLabel: 'Account',
          tabBarIcon: getTabBarIcon('controller-classic'),
          tabBarVisible: false
        }}
      />
      {/* <Tab.Screen 
        name="Games" 
        component={GamesStack} 
        options={{
          // tabBarLabel: 'Account',
          tabBarIcon: getTabBarIcon('controller-classic'),
          tabBarVisible: false
        }}
      /> */}
      <Tab.Screen 
        name="Account" 
        component={AccountStack} 
        options={{
          // tabBarLabel: 'Account',
          tabBarIcon: getTabBarIcon('account')
        }}
      />
    </Tab.Navigator>
  );
}

export default App;


