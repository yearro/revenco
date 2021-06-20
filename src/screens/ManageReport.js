import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import colors from '../config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.amethyst,
  },
  text: {
    fontSize: 25,
    color: colors.white,
    fontWeight: 'bold',
  },
});

const ManageReport = () => {
  return(
    <View style={styles.container}>
      <Text style={styles.text}>Administrar Reporte</Text>
    </View>
  );
}

export default ManageReport;