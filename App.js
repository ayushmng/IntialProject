import React from 'react';
// import {ButtonComponent from './src/Components/Button';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigation} from './src/Navigation/AppNavigation';

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
};

export default App;
