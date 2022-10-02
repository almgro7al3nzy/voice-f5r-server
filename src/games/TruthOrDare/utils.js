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


export function configureTransitionFast(onConfigured = () => {}) {
  const animation = LayoutAnimation.create(
    100,
    LayoutAnimation.Types.easeInEaseOut,
    LayoutAnimation.Properties.opacity,
  );

  const animation2 = {
    duration: 100,
    create: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
    }
  };

  const promise = new Promise(resolve => {
    // Workaround for missing LayoutAnimation callback support on Android
    if (Platform.OS === 'android') {
      LayoutAnimation.configureNext(animation2);
      setTimeout(resolve, 750);
    } else {
      LayoutAnimation.configureNext(animation2, resolve);
    }
  });

  onConfigured();

  return promise;
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


