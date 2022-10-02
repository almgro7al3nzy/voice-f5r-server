import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import colors from '../colors';
import { v4 as uuidv4 } from 'uuid';



const MessageList = ({ messages }) => {
  // const [messages, setMessages] = React.useState([
  //   { 
  //     id: 1,
  //     sender: { id: 3, username: 'Dave', gender: 'M', avatar: 'https://randomuser.me/portraits/thumb/men/75.jpg' },
  //     text: 'Whatsup'
  //   },
  // ]);

  return (
    <View style={styles.container}>
      {messages && messages.map(({ sender, text }) => {
        return (
          <View key={uuidv4()} style={styles.message}>
            <Image source={{ uri: sender.avatar }} style={styles.avatar} />
            <View>
              <Text style={styles.username}>{sender.username}</Text>
              <Text style={styles.text}>{text}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

export default MessageList

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 10,
    // height: 150,
  },
  message: {
    flexDirection: 'row',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  username: {
    color: colors.text3,
  },
  text: {
    color: colors.text,
  },
});
