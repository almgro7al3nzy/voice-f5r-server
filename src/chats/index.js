import React from 'react'
// import { View, Text } from 'react-native'
import { createStackNavigator, CardStyleInterpolators, } from '@react-navigation/stack'

import ContactsScreen from './screens/Contacts';
import ProfileScreen from './screens/Profile';
import ChatScreen from './screens/Chat';
import ExploreScreen from './screens/Explore';
import CreateChatScreen from './screens/CreateChat';
import ChatProfileScreen from './screens/ChatProfile';
import CreateRoom from './screens/CreateRoom';
import FindRoom from './screens/FindRoom';
import AddIntro from './screens/AddIntro';
import Pins from './screens/Pins';
import RankingPoll from './screens/RankingPoll';

// import ChatsProvider from './Provider';

const Stack = createStackNavigator();

const ChatStack = () => {
  
  return (
    <Stack.Navigator initialRouteName='Chat' 
    // screenOptions={{ headerTitleStyle: { textAlign: 'center'}}}
    // screenOptions={{ headerShown: false }}
    // screenOptions={{ headerTitle: false }}

    screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, }}
    >
      {/* <Stack.Screen name='Chats' component={ChatsScreen} /> */}
      <Stack.Screen name='Chat' component={ChatScreen} />
      <Stack.Screen name='Pins' component={Pins} />
      <Stack.Screen name='ChatProfile' component={ChatProfileScreen} />
      <Stack.Screen name='Contacts' component={ContactsScreen} />
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='RankingPoll' component={RankingPoll} options={{ title: 'Opinions' }} />
      {/* #search, find, explore */}
      <Stack.Screen name='Explore' component={ExploreScreen} />
      <Stack.Screen name='CreateChat' component={CreateChatScreen} />
      <Stack.Screen name='AddIntro' component={AddIntro} 
      options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, }}
      />

      <Stack.Screen name='CreateRoom' component={CreateRoom} />
      <Stack.Screen name='FindRoom' component={FindRoom} options={{ title: 'Rooms' }} />
      
    </Stack.Navigator>
  )
}

export default ChatStack
