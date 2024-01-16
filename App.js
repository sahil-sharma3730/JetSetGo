import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TravelRequestScreen from './src/screens/TravelRequestScreen';
import FlightResultsScreen from './src/screens/FlightResultsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TravelRequestScreen"
          component={TravelRequestScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FlightResultsScreen"
          component={FlightResultsScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
