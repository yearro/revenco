import React from 'react';
import {View,Text,StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../config/colors';
import {DrawerActions, useNavigation} from '@react-navigation/native'
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.alizarin,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const Header = () => {
  const navigation = useNavigation();
  
  return(
    <View style={styles.container}>
      <Text style={styles.text}>REVENCO</Text>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer()) }
      >
        <Icon size={30} name="menu" color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;