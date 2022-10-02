import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import StatusBar from '../../_components/StatusBar'

const ChatList = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#5E8D48" barStyle="light-content" />
      <View style={styles.appBar} />
      <View style={styles.content} />
    </View>
  );
}

export default ChatList

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor:'#79B45D',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});