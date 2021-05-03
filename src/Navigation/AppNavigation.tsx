import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../Screen/Home';
import {Profile} from '../Screen/Profile';
import {ButtonComponent} from '../Components/Button';
import {CreateEmployee} from '../Screen/CreateEmployee';

export const AppNavigation = () => {
  const Stack = createStackNavigator();

  const headerStyle = {
    title: 'Dashboard',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#0a70c9',
    },
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Home} options={headerStyle} />
      <Stack.Screen
        name="Add Employee"
        component={CreateEmployee}
        options={{...headerStyle, title: 'Add Employee'}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{...headerStyle, title: 'Profile'}}
      />
      <Stack.Screen name="ButtonComponent" component={ButtonComponent} />
    </Stack.Navigator>
  );
};
