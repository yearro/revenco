import React from 'react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';

import FlashMessage from 'react-native-flash-message';
import RootNavigation from './routes/Root';
import {Provider} from 'react-redux';
import store from './redux/store';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#34495e',
  },
});
const App = () => {

  return (
    <SafeAreaView style={styles.mainContainer}>
      <FlashMessage position='top'/>
      <StatusBar />
      <Provider store={store}>
        <RootNavigation />
      </Provider>
    </SafeAreaView>
  );
};

export default App;
