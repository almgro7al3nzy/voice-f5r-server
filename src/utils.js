


// export const IP = 'https://outlandapp.herokuapp.com/api'
export const IP = 'https://7334-131-175-147-29.ngrok.io'

// export const IP = 'http://192.168.1.2:8080'
// export const IP = 'http://10.168.69.218:8080/api/v1'
// export const IP = 'http://10.0.2.2:8080/api/v1'
// export const IP = 'http://localhost:8080'

export function capitalize(string) {
  if (!string) return;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function pluralize(count, noun, suffix = 's') {
  return `${count} ${noun}${count !== 1 ? suffix : ''}`;
}

export function debounce(func, timeout = 300){
  // 
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}



export function getInitials(name) {
  const match = name.match(/(\w)?\w*\s*(\w)?/);
  return match ? match.slice(1).join('') : '';
}


export function getAvatarColor(name) {
  const hexCode = name
    .split('')
    .reduce((acc, char) => (acc * char.charCodeAt(0)) % 0xffffff, 1)
    .toString(16);

  return `#${'0'.repeat(6 - hexCode.length) + hexCode}`;
}



// export const debounce = (func, wait) => {
//   let timeout;

//   return function executedFunction(...args) {
//     const later = () => {
//       clearTimeout(timeout);
//       func(...args);
//     };

//     clearTimeout(timeout);
//     timeout = setTimeout(later, wait);
//   };
// };

import { LayoutAnimation, Platform } from 'react-native';

export function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function sleep(duration = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

export function configureTransition(onConfigured = () => {}) {
  const animation = LayoutAnimation.create(
    750,
    LayoutAnimation.Types.easeInEaseOut,
    LayoutAnimation.Properties.opacity,
  );

  const promise = new Promise(resolve => {
    // Workaround for missing LayoutAnimation callback support on Android
    if (Platform.OS === 'android') {
      LayoutAnimation.configureNext(animation);
      setTimeout(resolve, 750);
    } else {
      LayoutAnimation.configureNext(animation, resolve);
    }
  });

  onConfigured();

  return promise;
}
