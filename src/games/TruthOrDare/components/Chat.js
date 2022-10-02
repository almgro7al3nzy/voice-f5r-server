import React from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import MessageInput from './MessageInput'
import MessageList from './MessageList'

const Chat = ({ messages, socket, roomId, user }) => {

  const styles = {
    container: {
      flex: 1,
      // paddingBottom: 50,
      // marginBottom: 50,
    }
  }
  return (
    <View style={styles.container}>
      <MessageList messages={messages} />

      <MessageInput 
        socket={socket} 
        roomId={roomId} 
        sender={{ username: user.username, avatar: user.avatar }} 
      />
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({})
