import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/Login';

const LoginStack = createStackNavigator();

const LoginNavigator = () => (
  <LoginStack.Navigator
    initialRouteName='Login'
    headerMode='none'
  >
    <LoginStack.Screen
      name="LoginScreen"
      component={Login}
    />
  </LoginStack.Navigator>
);

export default LoginNavigator;