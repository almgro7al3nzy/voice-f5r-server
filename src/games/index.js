import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
// import TruthOrDareScreen from './TruthOrDare';
import NeverHaveIEver from './NeverHaveIEver';
import TruthOrDare from './TruthOrDare';
import Poll from './Poll';
import Board from './Board';
// import FindRoom from './screens/FindRoom';
// import CreateRoom from './screens/CreateRoom';



const Stack = createStackNavigator();

const Games = () => {
  return (
    <Stack.Navigator 
    screenOptions={{ headerShown: false }}
    >
      {/* <Stack.Screen name='TruthOrDare' component={TruthOrDareScreen} /> */}
      <Stack.Screen name='TruthOrDare' component={TruthOrDare} />
      <Stack.Screen name='NeverHaveIEver' component={NeverHaveIEver} />
      <Stack.Screen name='Poll' component={Poll} />
      <Stack.Screen name='Board' component={Board} />
      {/* <Stack.Screen name='FindRoom' component={FindRoom} /> */}
      {/* <Stack.Screen name='CreateRoom' component={CreateRoom} /> */}
    </Stack.Navigator>
  );
}

export default Games;