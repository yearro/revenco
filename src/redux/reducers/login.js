const defaultState = {
  loading: false,
  valid: false,
  userdata: {},
};

const login = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN_IN':
      return {
        ...state,
        valid: true,
        userdata: action.userData,
      };
    case 'LOGOUT':
      return {
        ...state,
        valid: false,
      };
    case 'LOADING':
      return {
        ...state,
        loading: action.isLoading,
      };
    case 'UPDATEUSER':
      return {
        ...state,
        userdata: action.userData,
      };
    default:
      return state;
  }
};

export default login;