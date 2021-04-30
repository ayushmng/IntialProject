import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../Screen/Home';
import {Profile} from '../Screen/Profile';
import {ButtonComponent} from '../Components/Button';
import {CreateEmployee} from '../Screen/CreateEmployee';

export const AppNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ButtonComponent" component={ButtonComponent} />
      <Stack.Screen name="CreateEmployee" component={CreateEmployee} />
    </Stack.Navigator>
  );
};
