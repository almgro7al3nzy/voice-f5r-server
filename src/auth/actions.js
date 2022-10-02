
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as t from './types';
import { IP } from '../utils';
// export const api = 'http://192.168.1.2:8000/account';



// export const setTheme = () => async (dispatch) => {
//   try {
//     const theme = await AsyncStorage.getItem('theme');

//     dispatch({ type: t.SET_THEME, theme });
//   } catch (err) {
//     
//   }
// }

export const clearToken = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem('token');

    delete axios.defaults.headers.common['Authorization'];

    dispatch({ type: t.AUTH_ERROR });
  }
  catch (err) {
    
  }
}

export const setToken = async (token) => {
  
  await AsyncStorage.setItem('token', token);

  // 
  axios.defaults.headers.common['Authorization'] = token;
  // axios.defaults.headers.common['Accept'] = 'application/json';
  // axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';

  

  // dispatch({ type: t.AUTH_SUCCESS, user });
}

export const register = ({ name, email, password }) => async dispatch => {
  try {
    const res = await axios.post(`${IP}/api/v1/account/register`, { name, email, password });

    

    setToken(res.data.token);
    // await AsyncStorage.setItem('token', res.data.token);
    // axios.defaults.headers.common['Authorization'] = res.data.token;

    dispatch({ type: t.REGISTER_SUCCESS, user: res.data.user });
  } catch (err) {
    
    dispatch({ type: t.REGISTER_FAIL, error: err.response.data.error || err.message });
  }
}

export const login = ({ email, password }) => async dispatch => {
  console.log('login');
  try {
    const res = await axios.post(`${IP}/api/v1/account/login`, { email, password });

    
    
    setToken(res.data.token);
    // await AsyncStorage.setItem('token', res.data.token);
    // axios.defaults.headers.common['Authorization'] = res.data.token;

    dispatch({ type: t.LOGIN_SUCCESS, user: res.data.user, token: res.data.token });
  } catch (err) {
    console.log(err);
    dispatch({ type: t.LOGIN_FAIL, error: err.response.data.error || err.message });
  }
}

export const clearError = () => async dispatch => {
  dispatch({ type: t.CLEAR_ERROR });
}

export const setPhoneOrEmail = (phoneOrEmail) => async dispatch => {
  dispatch({ type: SET_PHONE_OR_EMAIL, phoneOrEmail });
}


export const getUser = (token) => async (dispatch) => {
  dispatch({ type: t.USER_LOADING });
  
  
  try {
    axios.defaults.headers.common['Authorization'] = token;
    
    
    const res = await axios.get(`${IP}/api/v1/account/user`);
    

    
    
    
    dispatch({ type: t.USER_LOADED, user: res.data });
    // dispatch({ type: t.BOARDS_LOADED, boards: res.data.boards });
  }
  catch (err) {
    
    clearToken();
    // if (err.response && err.response.status === 404) {
    //   
    //   clearToken();
    // }
  }
}

export const logout = () => async (dispatch) => {
  
  try {
    await AsyncStorage.removeItem('token');

    delete axios.defaults.headers.common['Authorization'];

    dispatch({ type: t.LOGOUT_SUCCESS });
  }
  catch (err) {
    
  }
}