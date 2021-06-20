import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerStack from './DrawerStack';
import LoginStack from './LoginStack';
import {connect} from 'react-redux';

const RootStack = createStackNavigator();

const RootNavigation = ({
  validUser,
}) => (
  <NavigationContainer>
    <RootStack.Navigator headerMode='none'>
      {
        validUser
        ? (
          <RootStack.Screen
            name='DrawerStack'
            component={DrawerStack}
          />
        ) : (
          <RootStack.Screen
            name='LoginStack'
            component={LoginStack}
          />
        )
      }
    </RootStack.Navigator>
  </NavigationContainer>
);
const mapStateToProps = globalState => {
  return {
    validUser: globalState.LoginReducer.valid,
  };
};
export default connect(mapStateToProps)(RootNavigation);