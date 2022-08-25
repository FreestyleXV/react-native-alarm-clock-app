import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TitleScreen from './components/TitleScreen';
import AlarmListScreen from './components/AlarmListScreen';
import AlarmOptionsScreen from './components/AlarmOptionsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Title"
          component={TitleScreen}
          options={{
            headerShown: false,
          }} 
        />
        <Stack.Screen
          name="AlarmList"
          component={AlarmListScreen}
          options={{
            headerStyle:{backgroundColor:'black'},
            headerTintColor:'white',
            title:'Lista alarmów'
          }}
        >
        </Stack.Screen>
        <Stack.Screen
          name="AlarmOptions"
          component={AlarmOptionsScreen}
          options={{
            headerShown: false,
          }}
        >
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}