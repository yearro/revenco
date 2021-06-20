import React, {useState, useEffect} from 'react';
import {View,StyleSheet, Text,TouchableOpacity} from 'react-native';
import colors from '../config/colors';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {showMessage} from 'react-native-flash-message';
import axios from 'axios';
import {isValidEmail,
  isValidPhoneNumber,
  isValidRFC,
} from '../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    color: colors.wetAsphalt,
    marginTop: 15,
  },
  warnigText: {
    fontSize: 15,
    color: colors.black,
    marginBottom: 15,
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
  dropDownContainer: {
    height: 50,
    width: '90%',
    maxWidth: 400,
    marginVertical: 20,
  },
});

const ManageAccount = () => {
  const [idUser, updateIdUser] = useState('');
  const [nameUser, updateNameUser] = useState('');
  const [phoneUser, updatePhoneUser] = useState('');
  const [emailUser, updateEmailUser] = useState('');
  const [stateList, updatestateList] = useState([]);
  const [open, setOpen] = useState(false);
  const [stateValue, setStateValue] = useState(null);

  useEffect(() => { 
    fetchStates();
  }, []);

  const validateUserData = () => {
    const newUserInfo = {};
    if (stateValue == null) {
      sendMessages('danger', 'Tiene que seleccionar un estado');
      return
    } else {
      newUserInfo.edo = stateValue
    }
    if(!isValidRFC(idUser)) {
      sendMessages('danger', 'El número de identificación no válido');
      return 
    } else {
      newUserInfo.id = idUser
    }
    const sizeName = (nameUser.trim()).length;
    if(sizeName < 5 || sizeName > 40) {
      sendMessages('danger', 'El nombre debe tener entre 5 y 40 caracteres');
      return 
    } else {
      newUserInfo.name = nameUser
    }
    if (!isValidEmail(emailUser)) {
      sendMessages('danger', 'Correo no válido');
      return
    } else {
      newUserInfo.email = emailUser
    }
    if (!isValidPhoneNumber(phoneUser)) {
      sendMessages('danger', 'Teléfono no válido');
      return
    } else {
      newUserInfo.telephone = phoneUser
    }
    AddNewUser(newUserInfo)
  };

  const AddNewUser = async (newUserInfo) => {
    let sellerList = JSON.parse(
      await AsyncStorage.getItem('user-list'),
    );
    if(sellerList) {
      const registeredSeller = sellerList.filter((seller) => seller.id == newUserInfo.id)
      if(!registeredSeller.length) {
        sellerList.push(newUserInfo)
      } else {
        sendMessages('danger', 'RFC de usuario ya se encuentra registrado.');
        return
      }
    } else {
      sellerList = []
      sellerList.push(newUserInfo)
    }
    AsyncStorage.setItem('user-list', JSON.stringify(sellerList));
    sendMessages('success', 'Se registró al nuevo usuario');
    ClearForm()
  };

  const ClearForm = () => {
    updateIdUser('');
    updateNameUser('');
    updatePhoneUser('');
    updateEmailUser('');
    setOpen(false);
    setStateValue(null);
  };

  const fetchStates = async () => {
    const savedList = JSON.parse(
      await AsyncStorage.getItem('state-list'),
    );
    if(savedList) {
      updatestateList(savedList);
    } else {
      const {data, status} = await axios.get(
        'https://raw.githubusercontent.com/martinciscap/json-estados-municipios-mexico/master/estados.json',
      );
      if(status== 200) {
        const statesItems=[]
        data.map((state) => {
          statesItems.push({ value: state.clave, label: state.nombre })
        });
        updatestateList(statesItems);
        AsyncStorage.setItem('state-list', JSON.stringify(statesItems));
      }
    }
  };

  const sendMessages = (type, message) => {
    showMessage({message, type});
  }

  return(
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Agregar nuevo Vendedor</Text>
        <View>
          <DropDownPicker
            open={open}
            value={stateValue}
            items={stateList}
            setOpen={setOpen}
            setValue={setStateValue}
            setItems={updatestateList}
            placeholder='Selecciona un estado'
            containerStyle={
            styles.dropDownContainer
            }/>
        </View>
        <Input
          placeholder='RFC'
          value={idUser}
          onChangeText={value => updateIdUser(value)}
          leftIcon={
            <Icon
              name='card-account-details-outline'
              size={24}
              color='black'
            />
          }/>
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
          }/>
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
          }/>
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
            }/>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={validateUserData}
          >
            <Text style={styles.textButton}>Guardar</Text>
          </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default ManageAccount;