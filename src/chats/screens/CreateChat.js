import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react'
import { View, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { Text } from '../../Components';
import ContactItem from '../components/ContactItem';
import { connect } from 'react-redux';
import { getFriends } from '../actions';

const CreateChat = ({ navigation, friends, error, getFriends, chats, socket, ownerId }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.card
    },
    btn: {
      marginRight: 15,
      borderRadius: 20,
      // borderWidth: 0.5,
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: colors.background,
      backgroundColor: colors.card,
      
    },
    btnText: {
      color: colors.primary,
    },
    name: {
      backgroundColor: 'yellow',
      backgroundColor: colors.background,
      color: colors.text,
      paddingVertical: 20,
      paddingHorizontal: 20,
    },
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // title: 'Create Chat',
      // headerTitleAlign: 'center',
      headerRight: () => (
        <TouchableOpacity style={styles.btn} >
          <Text style={styles.btnText}>Create Chat</Text>
        </TouchableOpacity>
      )
    })
  }, [navigation]);

  React.useEffect(() => {

    getFriends();
  }, []);

  const [name, setName] = useState('');
  const [privacy, setPrivacy] = useState('');

  const handleFriendItemPress = (userId) => {
    // const chatId = chats.find(chat => chat.)
    // if (chatId) return navigation.navigate('Chats', { screen: 'Chat', params: { chatId }});

    
    socket.emit('create_chat', 
      {ownerId, userId}, 
      (chatId) => navigation.navigate('Chats', { screen: 'Chat', params: { chatId }})
    );
    
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.name}
        value={name}
        onChangeText={setName}
        placeholder='Chat Name'
      />

      <FlatList
        data={friends}
        keyExtractor={({id}) => id.toString()}
        renderItem={({item}) => <ContactItem {...item} onPress={() => handleFriendItemPress(item.id)} />}
      />
    </View>
  )
}



const mapStateToProps = state => ({
  ownerId: state.auth.user.id,
  socket: state.chats.socket,
  chats: state.chats.chats,
  friends: state.chats.friends,
  error: state.chats.error
})

export default connect(
  mapStateToProps,
  // { getChats, getContacts }
  { getFriends }
)(CreateChat);

