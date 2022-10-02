import React from 'react'
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Linking, Button } from 'react-native';

import colors from '../../colors'
import ContactItem from '../components/ContactItem';
import { connect } from 'react-redux';



const Contacts = ({ navigation, contacts, error }) => {

  const renderContact = ({ item, item: { name, avatar, phone } }) => {
    return (
      <ContactItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigation.navigate('Profile', { contact: item })}
      />
    );
  }

  return (
    <View>
      {contacts ? (
        <FlatList
        data={contacts}
        keyExtractor={item => item.id}
        renderItem={renderContact}
      />        
      ) : error ? (
        <View>
        <Text>{error.message}</Text>
        <Button type={3} text='Reload' />
        </View>
      ) : (
        <ActivityIndicator size='large' color={colors.brand} />
      )}
    </View>
  )
}


const mapStateToProps = state => ({
  contacts: state.chats.contacts,
  error: state.chats.error
})

export default connect(
  mapStateToProps,
  // { getChats, getContacts }
)(Contacts);
