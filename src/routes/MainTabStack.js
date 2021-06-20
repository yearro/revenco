import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';
import colors from '../config/colors';
import SearchAccount from '../screens/SearchAccount';
import AccountStack from '../routes/AccountStacks';

const MainTabs = createBottomTabNavigator();

const MainNavigation = () => {
  return(
    <MainTabs.Navigator
      tabBarOptions={{
        showLabel: true,
        activeTintColor: colors.clouds,
        inactiveTintColor: colors.concrete,
        activeBackgroundColor: colors.wetAsphalt,
        inactiveBackgroundColor: colors.midnihgtBlue,
        style: {
          height: 80,
        },
        tabStyle: {
          height: 80,
        },
        labelStyle: {
          fontSize: 15,
          paddingBottom: 10,
        },
      }}
    >
      <MainTabs.Screen
        name='Buscar'
        component={SearchAccount}
        options={{
          tabBarIcon: ({focused,color}) => {
            Icon.loadFont();
            const inconSize = focused ? 40 : 35;
            return(
              <View>
                <Icon name='account-search' color={color} size={inconSize} />
              </View>
            );
          },
        }}
      />
      <MainTabs.Screen
        name='Agregar'
        component={AccountStack}
        options={{
          tabBarIcon: ({focused,color}) => {
            Icon.loadFont();
            const inconSize = focused ? 40 : 35;
            return(
              <View>
                <Icon name='plus-circle' color={color} size={inconSize} />
              </View>
            );
          },
        }}
      />
    </MainTabs.Navigator>
  );
};

export default MainNavigation;