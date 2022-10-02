

import AsyncStorage from '@react-native-async-storage/async-storage';

const themes = {
  light: {
    brand: 'blueviolet',
    backgroundColor: 'white',
    color: 'black',
    color2: 'grey',
  },
  dark: {
    brand: 'purple',
    backgroundColor: '#333',
    color: 'white',
    color2: '#eee',
  },
};


export const themeStore = () => {
  let themeKey = 'dark';

  const restoreTheme = async () => {
    try {
      const theme = await AsyncStorage.getItem('theme');
      

      themeKey = theme;
    } catch (err) {
      
    }
  }

  const getTheme = () => themes[themeKey];

  const setTheme = async (theme) => {
    try {
      AsyncStorage.setItem('theme', theme);
      

      themeKey = theme;
      getTheme();
      // return themes[themeKey];
    } catch (err) {
      
    }
  }

  

  return {
    theme: themes[themeKey],
    getTheme,
    setTheme,
    restoreTheme
  };

}

export const getTheme = themeStore().getTheme
export const setTheme = themeStore().setTheme
export const tStore = themeStore()

export default themeStore().theme;