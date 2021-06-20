import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';
import colors from '../config/colors';
import Header from '../components/Header';
import { ScrollView } from 'react-native';
import CallButton from '../components/CallButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 18,
    color: colors.black,
    padding: 5,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 50,
    marginTop: 20,
  },
});

const Information = () => {
  return(
    <>
      <Header />
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={
              require('../assets/salesman.jpeg')
            }
            style={styles.image}
            resizeMode={'center'}
          />
            <Text style={styles.text}>
              El registro de vendedores por comisión (REVENCO) mejoran la productividad comercial centralizando y automatizando los planes de incentivos y comisiones de una organización.
            </Text>
            <Text style={styles.text}>Las aplicaciones de cálculo de comisiones permiten seguir el rendimiento y crear informes de empleados, calcular la compensación de comisiones en función de las variables de rendimiento y gestionar fechas clave en el ciclo de ventas o compensaciones de la empresa.</Text>
            <Text style={styles.text}>El software de seguimiento de comisiones también ayuda a gestionar los requisitos de informes normativos relacionados con compensaciones o bonos. Los programas de cálculo de comisiones guardan relación con el software para administración de clientes potenciales, los programas de nóminas y los sistemas automatizados de ventas.</Text>
            <CallButton />
        </View>
      </ScrollView>
    </>
  );
}

export default Information;