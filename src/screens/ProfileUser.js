import React from 'react';
import {Text,StyleSheet,Image,TouchableOpacity} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../config/colors';
import Header from '../components/Header';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import { useState } from 'react';
import { View } from 'react-native';
import {updateuserdata as loginAction} from '../redux/actions';
import {isValidEmail,
  isValidPhoneNumber,
} from '../utils';

const styles = StyleSheet.create({
  warnigText: {
    fontSize: 15,
    color: colors.black,
    marginBottom: 15,
  },
  centerContent: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: colors.esmerald,
  },
  textButton: {
    fontSize: 20,
    color: colors.white,
    padding: 20,
  },
});

const ProfileUser = ({
  userInformation,
  updateuserdata,
}) => {
  const {email,image,name,pass,telephone} = userInformation[0];
  const [emailUser, updateEmailUser] = useState(email);
  const [passUser, updatePassUser] = useState(pass);
  const [nameUser, updateNameUser] = useState(name);
  const [phoneUser, updatePhoneUser] = useState(telephone);
  const validateUserData = () => {
    const sizeName = (nameUser.trim()).length;
    if(sizeName < 5 || sizeName > 40) {
      sendMessages('danger', 'El nombre debe tener entre 5 y 40 caracteres');
      return 
    } else {
      userInformation[0].name = nameUser
    }
    if (!isValidEmail(emailUser)) {
      sendMessages('danger', 'Correo no válido');
      return
    } else {
      userInformation[0].email = emailUser
    }
    if (!isValidPhoneNumber(phoneUser)) {
      sendMessages('danger', 'Teléfono no válido');
      return
    } else {
      userInformation[0].telephone = phoneUser
    }
    const sizePass = (passUser.trim()).length;
    if (sizePass < 6 || sizePass > 20) {
      sendMessages('danger', 'Longitud de contraseña no válida');
      return
    } else {
      userInformation[0].pass = passUser
    }
    updateuserdata(userInformation)
    sendMessages('success', 'Datos actualizados');
  }

  const sendMessages = (type, message) => {
    showMessage({message, type});
  }

  return(
    <>
      <Header />
      <KeyboardAwareScrollView>
        <View style={styles.centerContent}>
          <Image
            source={{
              uri: image,
            }}
            style={styles.image}
            resizeMode={'cover'}
          />
          <Input
            placeholder='Nombre'
            value={nameUser}
            onChangeText={value => updateNameUser(value)}
            leftIcon={
              <Icon
                name='account'
                size={24}
                color='black'
              />
              }
          />
          <Input
            placeholder='Teléfono'
            value={phoneUser}
            onChangeText={value => updatePhoneUser(value)}
            leftIcon={
              <Icon
                name='cellphone'
                size={24}
                color='black'
              />
              }
          />
          <Input
            placeholder='Correo Electrónico'
            value={emailUser}
            onChangeText={value => updateEmailUser(value)}
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
            value={passUser}
            secureTextEntry={true}
            onChangeText={value => updatePassUser(value)}
            leftIcon={
              <Icon
                name='lock-outline'
                size={24}
                color='black'
              />
              }
          />
          <Text style={styles.warnigText}> <Icon name='hand-okay' size={24} color='black'/>La contraseña debe contener de 6 a 20 caracteres.</Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={validateUserData}
          >
            <Text style={styles.textButton}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
}

const mapStateToProps = globalState => {
  return {
    userInformation: globalState.LoginReducer.userdata,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateuserdata: (userData) => dispatch(loginAction({userData})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);