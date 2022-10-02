import React from 'react'
import { View, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

const MiniMessageList = ({ messages }) => {

  const renderMessages = ({ item: { id, text, senderAvatar, senderUsername } }) => {
    return (
      null
    )
  }
  
  return (
    <View>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={messages}
        renderItem={renderMessages}
      />
    </View>
  )
}

export default MiniMessageList
