import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import ApiConnect from '../api/ApiConnect';
import { navigate } from '../navigationRef';
const URL = '/api/v1/auth';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signin':
      return { errorMessage: '', token: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'signout':
      return { token: null, errorMessage: '' };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'signin', payload: token });
    navigate('ProductList');
  } else {
    navigate('loginFlow');
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: 'clear_error_message' });
};

const signup = (dispatch) => async ({ email, password, hubCatNumber }) => {
  try {
    const response = await ApiConnect.post(`${URL}/signup`, {
      email,
      password,
      hubCatNumber,
    });
    await AsyncStorage.setItem('token', response.data.token);
    // await AsyncStorage.getItem('token');//gives token back
    dispatch({ type: 'signin', payload: response.data.token });

    navigate('ProductList');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'somthing went wrong with sign up',
    });
  }
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await ApiConnect.post(`${URL}/signin`, {
        email,
        password,
      });
      await AsyncStorage.setItem('token', response.data.token);
      // await AsyncStorage.getItem('token');//gives token back
      dispatch({ type: 'signin', payload: response.data.token });

      navigate('ProductList');
    } catch (err) {
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign in',
      });
    }
  };
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'signout' });
  navigate('loginFlow');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: '' }
);
