import React from 'react'
import { Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@react-navigation/native';
import ChatsStack from './chats';
import AccountStack from './account';
import GamesStack from './games';

import { createStackNavigator, CardStyleInterpolators, TransitionPresets, TransitionSpecs, HeaderStyleInterpolators  } from '@react-navigation/stack';
import Socket from './Socket';

import GamesIndexScreen from './games/GamesIndex';
import ChatsIndexScreen from './chats/ChatsIndex';
import AccountIndexScreen from './account/AccountIndex';
// import OpinionsIndexScreen from './opinions/OpinionsIndex';
import { StatusBar } from './Components';
// import { Ionicons } from '@expo/vector-icons';
import { localize } from './localized';
import RemotePushController from './RemotePushController';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


// const OpinionsIndex = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="OpinionsIndex" component={OpinionsIndexScreen} options={{ title: 'Opinions' }} />
//   </Stack.Navigator>
// );

const ChatsIndex = () => (
  <Stack.Navigator 
  // screenOptions={{ headerTitleAlign: 'center' }}
  >
    <Stack.Screen name="ChatsIndex" component={ChatsIndexScreen} options={{ title: 'Chats' }} />      
  </Stack.Navigator>
);

const GamesIndex = () => (
  <Stack.Navigator>
    <Stack.Screen name="GamesIndex" component={GamesIndexScreen} options={{ title: 'Games' }} />
  </Stack.Navigator>
);

const AccountIndex = () => (
  <Stack.Navigator>
    <Stack.Screen name="AccountIndex" component={AccountIndexScreen} options={{ title: 'Me' }} />
  </Stack.Navigator>
);


const HomeTabs = ({ route, navigation }) => {
  const { colors } = useTheme();

  const getTabBarIcon = icon => ({ color, focused, size }) => {
    // 
    return (
      <MaterialCommunityIcons 
        name={focused ? icon : `${icon}-outline`} 
        size={size} 
        color={color} 
        // style={{ paddingVertical: 5, }}
        // style={{ ...(icon === 'pin' && { transform: [{ rotate: '45deg' }] } )}}
      />
    );
  }

  const getTabBarIcon2 = icon => ({ color, focused, size }) => {
    // 
    return (
      <Ionicons 
        name={focused ? icon : `${icon}-outline`} 
        size={size} 
        color={color} 
        style={{ ...(icon === 'pin' && { transform: [{ rotate: '45deg' }] } )}}
      />
    );
  }

  const [menuShowing, setMenuShowing] = React.useState(false);

  return (
    <>
    <Tab.Navigator
      initialRouteName='GamesIndex'
      // screenOptions={{ headerTitleAlign: 'center' }}
      tabBarOptions={{ 
        // activeColor: 'black',
        activeTintColor: colors.text,
        // activeTintColor: colors.primary3,
        // inactiveTintColor: colors.text3,
        labelStyle: { fontSize: 12 },
        // showLabel: false,
        style: { 
          backgroundColor: '#E6E6FA', 
          paddingVertical: 6, 
        }
        // style: { height: 49 },
      }}
    >
      <Tab.Screen 
        name="ChatsIndex" 
        component={ChatsIndex} 
        options={{ 
          // headerTitleAlign: 'center',
          // headerShown: true, 
          // tabBarIcon: getTabBarIcon('message'),
          tabBarIcon: getTabBarIcon2('chatbox'),
          // tabBarBadge: 3,         
          tabBarLabel: localize('Chats')
          // tabBarLabel: localize('')
        }} 
        // options={({ route }) => ({
        //   headerTitle: 'route',
        // })}
      />

      <Tab.Screen 
        name="GamesIndex" 
        component={GamesIndex} 
        options={{ 
          tabBarIcon: getTabBarIcon('help-network'),      
          tabBarLabel: localize('Rooms')          
        }}
      />
      
      <Tab.Screen 
        name="AccountIndex" 
        component={AccountIndex} 
        options={{ 
          tabBarIcon: getTabBarIcon('account'),
          tabBarLabel: localize('Me')
        }}
      />
    </Tab.Navigator>
    </>
  );
}




const App = ({navigation}) => {

  const forFade = ({ current, closing }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
    const progress = Animated.add(
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      next
        ? next.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          })
        : 0
    );
  
    return {
      cardStyle: {
        transform: [
          {
            translateX: Animated.multiply(
              progress.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [
                  screen.width, // Focused, but offscreen in the beginning
                  0, // Fully focused
                  screen.width * -0.3, // Fully unfocused
                ],
                extrapolate: 'clamp',
              }),
              inverted
            ),
          },
        ],
      },
    };
  };

  

  return (
    <Socket>
      <StatusBar navigation={navigation} />

      <RemotePushController />

    <Stack.Navigator initialRouteName='Home' 
      screenOptions={{ 
        headerShown: false,
        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        // cardStyleInterpolator: forSlide,
      }}
    >
      <Stack.Screen name='Home' component={HomeTabs} />

      <Stack.Screen name='Chats' component={ChatsStack} 
      options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, }}
      />
      
      <Stack.Screen name='Games' component={GamesStack} 
        options={{ cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, }}
      />
      <Stack.Screen name='Account' component={AccountStack} 
      // options={{ cardStyleInterpolator: forSlide, }} 
      />
    </Stack.Navigator>
    </Socket>
  )
}


export default App;


