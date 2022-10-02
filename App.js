import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Route } from './source/utils/routes';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {
          Route.map((item)=>(<Stack.Screen name={item.name} key={item.id} component={item.comp}/>))
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;