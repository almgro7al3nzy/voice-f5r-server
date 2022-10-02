import PropTypes from "prop-types";
import { LayoutAnimation, Platform } from 'react-native';


export const messageShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['text', 'image', 'location']),
    text: PropTypes.string,
    uri: PropTypes.string,
    coordinate: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired
    })
});


let messageId = 0;

function getNextId() {
    messageId += 1;
    return messageId;
}

export function createTextMessage(text) {
    return {
        type: 'text',
        id: getNextId(),
        text
    };
}

export function createImageMessage(uri) {
    return {
        type: 'image',
        id: getNextId(),
        uri
    };
}

export function createLocationMessage(coordinate) {
    return {
        type: 'location',
        id: getNextId(),
        coordinate
    };
}



import { v4 as uuidv4 } from 'uuid';
// import 'react-native-get-random-values';


import {capitalize} from '../utils';

const mapContact = contact => {
  const {
    name, picture, phone, cell, email,
  } = contact;

  return {
    id: uuidv4(),
    name: `${capitalize(name.first)} ${capitalize(name.last)}`,
    avatar: picture.large,
    phone,
    cell,
    email,
    favorite: Math.random() >= 0.5, // randomly generate favorite contacts
  };
};

export const fetchContacts = async () => {
  const response = await fetch('https://randomuser.me/?results=100&seed=fullstackio');
  const contactData = await response.json();

  return contactData.results.map(mapContact);
};

export const fetchUserContact = async () => {
  const response = await fetch('https://randomuser.me/?seed=fullstackio');
  const userData = await response.json();

  return mapContact(userData.results[0]);
};

export const fetchRandomContact = async () => {
  const response = await fetch('https://randomuser.me/');
  const userData = await response.json();

  return mapContact(userData.results[0]);
};



export function configureTransition(onConfigured = () => {}) {
  const animation = LayoutAnimation.create(
    100,
    LayoutAnimation.Types.easeInEaseOut,
    LayoutAnimation.Properties.opacity,
  );

  const promise = new Promise(resolve => {
    // Workaround for missing LayoutAnimation callback support on Android
    if (Platform.OS === 'android') {
      LayoutAnimation.configureNext(animation);
      setTimeout(resolve, 50);
    } else {
      LayoutAnimation.configureNext(animation, resolve);
    }
  });

  onConfigured();

  return promise;
}
