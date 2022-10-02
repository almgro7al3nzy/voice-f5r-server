import { useTheme } from '@react-navigation/native';
import React from 'react'
import { FlatList, StyleSheet, Image, TouchableOpacity, View } from "react-native";
import { Text } from '../../Components';
import MapView from "react-native-maps";
import { Touchable } from '../../Components';


const MessageList = ({ messages, onPressMessage, navigation }) => {

  const { colors } = useTheme();

  const styles = {
    container: {
    flex: 1,
    overflow: 'visible', // Prevents clipping on resize!
    },
    messageRow: {
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    marginBottom: 4,
    paddingHorizontal: 5,
    // marginRight: 10,
    // marginLeft: 60,
    },
    messageBubble: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.background,
    // borderRadius: 20,
    width: '100%',


    flexDirection: 'row',
    },
    text: {
    fontSize: 16,
    color: colors.text,
    },
    image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    },
    map: {
    width: 250,
    height: 250,
    borderRadius: 10,
    },


    senderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'center',
      // width: 22,
      // height: 22,
      // borderRadius: 11,
      // backgroundColor: '#' + ((1<<24)*Math.random() | 0).toString(16)
    },
    avatar: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: '#' + ((1<<24)*Math.random() | 0).toString(16)
    },
    initials: {
      color: colors.textInverse,
    },
    senderRowText: {
      marginHorizontal: 6,
      color: colors.text2,
      // fontSize: 12,
    },
    joinBtn: {
      marginHorizontal: 20,
      color: colors.text,
    },
    actions: {
      flexDirection: 'row',
    },
    type: {
      textTransform: 'uppercase',
      fontWeight: 'bold',
      color: colors.text,
      marginHorizontal: 5,
    }
  };

  const renderMessageItem = ({ item, item: { sender, createdAt } }) => {
    
    return (
      <View key={item.id} style={styles.messageRow}>
        <TouchableOpacity onPress={() => onPressMessage(item)}>
          <View style={styles.senderRow}>
            <View style={styles.avatar}>
              {sender && sender.avatar && <Image style={styles.avatarImg} source={{ uri: sender.avatar }} />}
            </View>

            <Text style={styles.senderRowText} numberOfLines={1}>
              {sender && sender.name}
            </Text>

            <Text style={styles.senderRowText} numberOfLines={1}>
              {createdAt}
            </Text>
          </View>
          {renderMessageBody(item)}
          
        </TouchableOpacity>
      </View>
    )
  }

  const renderMessageBody = ({ type, text, uri, coordinate, roomId }) => {
    switch (type) {
      // link redirect to webview
      case 'text':
        
        return (
          <View style={styles.messageBubble}>
            <Text style={styles.text}>
              {text}
            </Text>
          </View>
        );
      case 'truthOrDare':
        
        return (
          <View style={styles.messageBubble}>
            <Text style={styles.type}>
              Invite
            </Text>
            <Text style={styles.text}>
              {/* Invited to Truth Or Dare */}
              Truth Or Dare
            </Text>

            <View style={styles.actions}>
              <Touchable onPress={() => navigation.navigate('Games', {screen: 'TruthOrDare', params: { roomId: text }})}>
                {/* <Text style={styles.joinBtn}>Join</Text> */}
                <Text style={styles.joinBtn}>Accept</Text>
              </Touchable>
              <Touchable>
                {/* <Text style={styles.joinBtn}>Join</Text> */}
                <Text style={styles.joinBtn}>Remove</Text>
              </Touchable>
            </View>
          </View>
        );
      case 'image':
        return <Image style={styles.image} source={{ uri }} />;
      case 'location':
        return (
          <MapView
            style={styles.map}
            initialRegion={{
              ...coordinate,
              latitudeDelta: 0.08,
              longitudeDelta: 0.04
            }}
          >
            <MapView.Marker coordinate={coordinate} />
          </MapView>
        );
      default:
        return (
          <View style={styles.messageBubble}>
            <Text style={styles.text}>
              {text}
            </Text>
          </View>
        );
    }
  }

  // 

  return (
    <FlatList
      inverted
      style={styles.container}
      data={messages}
      renderItem={renderMessageItem}
      keyExtractor={item => item.id.toString()}
      keyboardShouldPersistTaps={'handled'}
    />
  );
}

export default MessageList


const styles = StyleSheet.create();