import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from '../../colors';
import ContactInfoItem from '../components/ContactInfoItem';
import ContactThumbnail from '../components/ContactThumbnail';

const ProfileScreen = ({ route, navigation: { navigate } }) => {
  const { avatar, name, email, phone, cell } = route.params.contact;

  return (
      <View style={styles.container}>
          <View style={styles.avatarSection}>
              <ContactThumbnail 
                  avatar={avatar}
                  name={name}
                  phone={phone}
              />
          </View>
          <View style={styles.detailsSection}>
              <ContactInfoItem icon='email' title='Email' subtitle={email} />
              <ContactInfoItem icon='phone' title='Work' subtitle={phone} />
              <ContactInfoItem icon='cellphone' title='Personal' subtitle={cell} />
          </View>
      </View>
  );
}

export default ProfileScreen



const styles = StyleSheet.create({
  container: {
      flex: 1
  },
  avatarSection: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.blue
  },
  detailsSection: {
      flex: 1,
      backgroundColor: 'white'
  }
});
