

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as t from './types';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import axios from 'axios';


export const api = 'http://192.168.1.2:8000/account';



export const getTheme = () => async (dispatch) => {
  try {
    const theme = await AsyncStorage.getItem('theme');
    
    changeNavigationBarColor('#E6E6FA', true, true);
    
    // color, lightMode, animated
    // changeNavigationBarColor('#fafafa', true, true);
    // changeNavigationBarColor('#f1f1f1', true, true);
    // changeNavigationBarColor('translucent', true, true);


    if (theme) dispatch({ type: t.SET_THEME, theme });
  } catch (err) {
    
  }
}

export const setTheme = (theme) => async (dispatch) => {
  try {
    AsyncStorage.setItem('theme', theme);

    await dispatch({ type: t.SET_THEME, theme });
    // changeNavigationBarColor(theme === 'light' ? '#ffffff' : '#000000', true, true);
    changeNavigationBarColor(theme === 'light' ? '#E6E6FA' : '#000000', true, true);
  } catch (err) {
    
  }
}




export const addRole = ({ roleId, prompt1, infoList }) => async dispatch => {
  try {
    const res = await axios.post(`${api}/addRole`, { roleId, prompt1, infoList });

    dispatch({ type: t.ROLE_ADDED, role: res.data });
  } 
  catch (err) {
    dispatch({ type: t.USER_ERROR, err });
  }
}


export const setRoleId = (roleId) => (dispatch) => {
  dispatch({ type: t.SET_ROLE_ID, roleId })
}

// getCardsAndPins
export const getRoles = () => async (dispatch) => {
  
  try {
    const res = await axios.get(`${api}/space2s`);


    dispatch({ type: t.ROLES_LOADED, roles: res.data })
  }
  catch (err) {
    
    dispatch({ type: t.ROLES_ERROR, err });
  }
}


export const addUserPrompt = ({ userId, promptId, value, choice }) => async (dispatch) => {
  
  try {
    const res = await axios.post(`${api}/user_prompt`, { userId, promptId, value, choice });    
    
    dispatch({ type: t.USER_PROMPT_ADDED, userPrompt: res.data });
  }
  catch (err) {
    
  }
}


export const addPhotos = (formData) => async (dispatch) => {
  
  try {
    const res = await axios.patch(`${api}/profile/photos`, formData);
    

    
    
    dispatch({ type: t.PHOTOS_ADDED, photos: res.data });
  }
  catch (err) {
    
  }
}


export const uploadAvatar = (formData) => async (dispatch) => {
  
  try {
    const res = await axios.patch(`${api}/profile/avatar`, formData);
    

    
    
    dispatch({ type: t.AVATAR_UPLOADED, avatar: res.data });
  }
  catch (err) {
    
  }
}
