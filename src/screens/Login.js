import React, { useState, useEffect } from 'react';
import {View,Image,StyleSheet,Text, TouchableOpacity} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Input } from 'react-native-elements';
import {isValidEmail} from '../utils';
import {adminUsers} from '../config/adminUsersData';
import Spinner from 'react-native-loading-spinner-overlay';
import {login as loginAction} from '../redux/actions';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 25,
    color: colors.white,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50, 
  },
  textButton: {
    fontSize: 20,
    color: colors.white,
    padding: 20,
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: colors.pumpkin,
  },
});

const Login = ({
  isLoading,
  loginIn
}) => {
  const [userEmail, updateUsername] = useState('');
  const [passUser, updatePassuser] = useState('');

  useEffect(() => {
    getFromStorage()
  }, []);

  const getFromStorage = async () => {
    const savedData = JSON.parse(
      await AsyncStorage.getItem('user-data'),
    );
    if(savedData) {
      loginIn(savedData)
    }
  };
  
  const validateUserData = () => {
    if (isValidEmail(userEmail) && passUser.length > 3) {
      const registeredUser = adminUsers.filter((user) => user.email == userEmail && user.pass == passUser)
      if(!registeredUser.length) {
        sendMessages('danger', 'Usuario no registrado');
      } else {
        loginIn(registeredUser)
      }

    } else {
      sendMessages('danger', 'Correo o contraseña no válidos');
    }
  }

  const sendMessages = (type, message) => {
    showMessage({message, type});
  }

  return(
    <View style={styles.loginContainer}>
      <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          textStyle={styles.text}
        />
      <Image
        source={
          require('../assets/playstore-icon.png')
        }
        style={styles.image}
        resizeMode={'cover'}
      />
      <Input
        placeholder='Correo Electrónico'
        onChangeText={value => updateUsername(value)}
        leftIcon={
          <Icon
            name='email-outline'
            size={24}
            color='black'
          />
          }
      />
      <Input
        placeholder='Contraseña'
        secureTextEntry={true}
        onChangeText={value => updatePassuser(value)}
        leftIcon={
          <Icon
            name='lock-outline'
            size={24}
            color='black'
          />
          }
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={validateUserData}
      >
        <Text style={styles.textButton}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    loginIn: (userData) => dispatch(loginAction({userData})),
  };
};

const mapStateToProps = globalState => {
  return {
    isLoading: globalState.LoginReducer.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);