import React from 'react';
import {SafeAreaView,Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import ManageAccount from '../screens/ManageAccount';
import ManageReport from '../screens/ManageReport';
import Header from '../components/Header';

const AccountStack = createStackNavigator();

const AccountNavigator = () => (
  <AccountStack.Navigator
    initialRouteName='ManageAccount'
    headerMode='screen'
  >
    <AccountStack.Screen
      name="ManageAccount"
      component={ManageAccount}
      options={{
        header: () => (<Header />),
      }}
    />
    <AccountStack.Screen
      name="ManageReport"
      component={ManageReport}
      options={{
        header: () => (<SafeAreaView><Text>Titulo ventana uno</Text></SafeAreaView>),
      }}
    />
  </AccountStack.Navigator>
);

export default AccountNavigator;