import React from 'react';
import { Text, StyleSheet, Linking, Platform, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create(
  {
    callButton: {
      width: '80%',
      padding: 15,
      backgroundColor: colors.wisteria,
      marginVertical: 15,
      borderRadius: 20,
    },
    callButtonText: {
      color: colors.white,
      fontSize: 18,
      textAlign: 'center',
    }
  });

const CallButton = () => {

  const makeCall = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${2281130407}';
    } else {
      phoneNumber = 'telprompt:${2281130407}';
    }
    Linking.openURL(phoneNumber);
  };

  return(
    <TouchableOpacity
      onPress={makeCall}
      activeOpacity={0.7} style={styles.callButton}
    >
      <Text style={styles.callButtonText}><Icon name='phone-classic' size={18} color={colors.white}/>  Línea de atención a Clientes</Text>
    </TouchableOpacity>
  
  );
};

export default CallButton;
