import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux';
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import { useTheme } from '@react-navigation/native';


const ChatProfile = ({ route, navigation, chats, error }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
    },
  };

  const { chatId } = route.params;

  
  
  const chat = chats.find(chat => chat.id === chatId);

  return (
    <View style={styles.container}>
      <EmojiSelector onEmojiSelected={emoji => {}} />

    </View>
  )
}

const mapStateToProps = state => ({
  chats: state.chats.chats,
  error: state.chats.error
})

export default connect(
  mapStateToProps,
  // { getChats, getContacts }
)(ChatProfile);

