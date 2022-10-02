import React from 'react';
import { View, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ListHeader } from '../../Components';
import InviteItem from '../components/InviteItem';

const FindRoom = () => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.card,
    },
    listView: {
      flex: 1,
    }
  };

  
var people = [{
  id: '123456',
  users: [
    { id: 1, name: 'Sofia Manco', username: 'Dave', gender: 'M', avatar: 'https://randomuser.me/portraits/thumb/men/75.jpg' },
    { id: 2, name: 'Claudio Longhitano', username: 'Enam', gender: 'F', avatar: 'https://randomuser.me/portraits/thumb/women/75.jpg' },
  ],  
  activePlayer: null,
  messages: []
},
{
  id: '123457',
  users: [
    { id: 3, name: 'David Enam', username: 'Dave', gender: 'M', avatar: 'https://randomuser.me/portraits/thumb/men/75.jpg' },
    { id: 4, name: 'David Enam', username: 'Enam', gender: 'F', avatar: 'https://randomuser.me/portraits/thumb/women/75.jpg' },
    { id: 5, name: 'David Enam', username: 'Sofia', gender: 'M', avatar: 'https://randomuser.me/portraits/thumb/men/75.jpg' },
    { id: 6, name: 'David Enam', username: 'Manco', gender: 'F', avatar: 'https://randomuser.me/portraits/thumb/women/75.jpg' },
  ],
  activePlayer: null,
  messages: []
},
]


  return (
    <View style={styles.container}>
      <View style={styles.listView}>
        <ListHeader count={people.length}>INVITES</ListHeader>
        <FlatList
          data={people}
          keyExtractor={({id}) => id.toString()}
          renderItem={({item}) => <InviteItem {...item} onPress={()=> {}} onJoinRoom={() => {}} />}
        />   
      </View>

      <View style={styles.listView}>
        <ListHeader count={people.length}>NEARBY</ListHeader>
        <FlatList
          data={people}
          keyExtractor={({id}) => id.toString()}
          renderItem={({item}) => <InviteItem {...item} onPress={()=> {}} onJoinRoom={() => {}} />}
        />   
      </View>

      <View style={styles.listView}>
        <ListHeader count={people.length}>FOR YOU (based on personality)</ListHeader>
        <FlatList
          data={people}
          keyExtractor={({id}) => id.toString()}
          renderItem={({item}) => <InviteItem {...item} onPress={()=> {}} onJoinRoom={() => {}} />}
        />   
      </View>
    </View>  
  );
}

export default FindRoom;