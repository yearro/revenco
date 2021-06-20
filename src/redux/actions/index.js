import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = ({userData}) => {

  return dispatch => {
    dispatch({
      type: 'LOADING',
      isLoading: true,
    });

    setTimeout(() => {
      AsyncStorage.setItem('user-data', JSON.stringify(userData));
      dispatch({
        type: 'LOGIN_IN',
        userData,
      });

      dispatch({
        type: 'LOADING',
        isLoading: false,
      });
    }, 2000);
  };
};

export const updateuserdata = ({userData}) => {
  AsyncStorage.removeItem('user-data');
  AsyncStorage.setItem('user-data', JSON.stringify(userData));
  return {
    type: 'UPDATEUSER',
    userData,
  };
}

export const logout = () => {
  AsyncStorage.removeItem('user-data');
  return {
    type: 'LOGOUT',
  };
};
