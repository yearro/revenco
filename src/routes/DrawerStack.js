import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer'
import MainStack from './MainTabStack';
import ProfileUser from '../screens/ProfileUser';
import Information from '../screens/Information';
import Sidebutton from '../components/Sidebutton';
import colors from '../config/colors';

import {connect} from 'react-redux';
import {logout} from '../redux/actions';

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: colors.midnihgtBlue,
  },
  imageContanier: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50, 
  },
});

const MenuDrawer = createDrawerNavigator();

const DrawerNavigator = ({
  logout
}) => (
  <MenuDrawer.Navigator
    drawerStyle={styles.drawerContainer}
    drawerContent={(props) => {
      const mixObject = {...props, ...{lout: logout}};
      return(
        <CustomDrawerContent {...mixObject} />
      )
    }}
  >
    <MenuDrawer.Screen
      name='Administrar Usuarios'
      component={MainStack}
    />
    <MenuDrawer.Screen
      name='Editar perfil'
      component={ProfileUser}
    />
    <MenuDrawer.Screen
      name='Sobre la aplicación'
      component={Information}
    />
  </MenuDrawer.Navigator>
);

function CustomDrawerContent({
  navigation,
  lout,
}) {
  return (
    <>
    <View style={styles.imageContanier}>
      <Image
        source={
          require('../assets/playstore-icon.png')
        }
        style={styles.image}
        resizeMode={'cover'}
      />
    </View>
    
    <Sidebutton
      title='Administrar Usuarios'
      iconName='account-multiple'
      pressFunction={() => {
        navigation.navigate('Administrar Usuarios');
      }}
    />
    <Sidebutton
      title='Editar perfil'
      iconName='account-details'
      pressFunction={() => {
        navigation.navigate('Editar perfil');
      }}
    />
    <Sidebutton
      title='Sobre la aplicación'
      iconName='alpha-i-box-outline'
      pressFunction={() => {
        navigation.navigate('Sobre la aplicación');
      }}
    />
    <Sidebutton
      title='Cerrar sesión'
      iconName='death-star'
      pressFunction={() => lout()}
    />
    </>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(() => ({}), mapDispatchToProps)(DrawerNavigator);
