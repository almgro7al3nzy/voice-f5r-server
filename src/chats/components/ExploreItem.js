import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  TouchableOpacity
} from 'react-native';
import { Text, Button }  from '../../Components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MessageList from './MessageList';
import { createImageMessage, createLocationMessage, createTextMessage } from '../utils';
import { configureTransition } from '../../utils';


const ContactItem = ({ name, icon, members, messages_ }) => {
  const { colors } = useTheme();
  const styles = {
    container: {
      // paddingLeft: 24,
      backgroundColor: colors.background,
    },
    content: {
      // flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'space-between',
      backgroundColor: colors.card,
      // marginRight: 24,
    },
    chatInfo: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingVertical: 16,
      // backgroundColor: colors.card,
      borderBottomColor: colors.border,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    avatar: {
      borderRadius: 22,
      width: 44,
      height: 44,
    },
    details: {
      justifyContent: 'center',
      // alignItems: 'center',
      // flex: 1,
      marginLeft: 20,
    },
    title: {
      color: colors.text,
      fontWeight: 'bold',
      fontSize: 16,
      // justifyContent: 'center',
    },
    subtitle: {
      color: colors.text2,
      fontSize: 15,
      marginTop: 4,
    },
  };

  const [expanded, setExpanded] = useState(false);

  const [messages, setMessages] = useState([
    createImageMessage('https://unsplash.it/300/300'),
    createTextMessage('World'),
    createTextMessage('Hello'),
    createLocationMessage({
      latitude: 37.78825,
      longitude: -122.4324
    })
  ]);
  configureTransition();

  // React.useEffect(() => {

  //   configureTransition();
  // }, []);


  return (
    <TouchableHighlight
      underlayColor={colors.grey}
      style={styles.container}
      onPress={() => setExpanded(!expanded)}
    >
      <View>
        <View style={styles.content} >
          <View style={styles.chatInfo}>
            <Image
              style={styles.avatar}
              source={{
                uri: icon,
              }}
            />

            <View style={styles.details}>
              <Text style={{ ...styles.title }}>{name}</Text>
              <Text style={styles.subtitle}>{members && members.length || 5} members</Text>
            </View>
          </View>

          {/* <TouchableOpacity onPress={() => {}}>
            <MaterialCommunityIcons 
              name='close-thick' 
              size={26} 
              color={colors.text4} 
              style={{ marginRight: 24 }} 
            />
          </TouchableOpacity> */}
        </View>
        {expanded && (
          <View style={{ alignItems: 'center' }}>
            <MessageList messages={messages} />
            <Button>Join</Button>
          </View>
        )}
      </View>
    </TouchableHighlight>
  );
}

export default ContactItem;
