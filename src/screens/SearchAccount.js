import React, { useState, useEffect, createRef } from 'react';
import {View,Text,StyleSheet,FlatList} from 'react-native';
import colors from '../config/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import {showMessage} from 'react-native-flash-message';
import DelayInput from "react-native-debounce-input";
import SellerCard from '../components/SellerCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.clouds,
  },
  textNotSellers: {
    fontSize: 20,
    color: colors.midnihgtBlue,
    fontWeight: 'bold',
  },
  notSellerContainer: {
    marginVertical: 20,
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  filtexInput: {
    width: '100%',
    margin: 10,
    height: 40,
    borderColor: colors.silver,
    borderWidth: 1,
    backgroundColor: colors.white,
    fontSize: 15,
    paddingLeft: 15,
  }
});

const SearchAccount = ({navigation}) => {
  const [sellers, updateSellers] = useState([])
  const [filterText, updateFilterText] = useState('');
  const [filterList, updateFilterList] = useState('');
  const inputRef = createRef();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchSellers();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchSellers = async () => {
    let sellerList = JSON.parse(
      await AsyncStorage.getItem('user-list'),
    );
    if(sellerList) {
      updateSellers(sellerList);
      updateFilterList(sellerList);
    }
  }

  const deleteSeller = (sellerId) => {
    const newSellerList = sellers.filter((seller) => seller.id != sellerId);
    AsyncStorage.removeItem('user-list');
    AsyncStorage.setItem('user-list', JSON.stringify(newSellerList));
    updateSellers(newSellerList);
    updateFilterList(newSellerList);
    sendMessages('info', 'Vendedor Eliminado');
  }

  const sendMessages = (type, message) => {
    showMessage({message, type});
  }

  const debounced = (value) => {
    updateFilterText(value);
    if (value.length) {
      const newSellerFilter = sellers.filter((seller) => seller.id.includes(value));
      updateFilterList(newSellerFilter);
    } else {
      updateFilterList(sellers)
    }
  };

  return(
    <>
      <Header />
      <View style={styles.container}>
        {
          filterList.length ? (
            <>
              <DelayInput
                placeholder='Filtrar por RFC'
                value={filterText}
                minLength={3}
                inputRef={inputRef}
                onChangeText={value => debounced(value)}
                delayTimeout={500}
                style={styles.filtexInput}
              />
              <FlatList
                data={filterList}
                style={{
                  width: '100%',
                }}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <SellerCard
                  id={item.id}
                  name={item.name}
                  email={item.email}
                  deleteItem={deleteSeller}
                  />
                )}
              />
            </>
          ) : (
            <View style={styles.notSellerContainer}>
              <Text style={styles.textNotSellers}>Sin vendedores</Text>
            </View>
            
          )
        }
      </View>
    </>
  );
}

export default SearchAccount;