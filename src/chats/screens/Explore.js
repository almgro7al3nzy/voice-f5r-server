import { useTheme } from '@react-navigation/native'
import React, { useState, useLayoutEffect, useEffect } from 'react'
import { View, Text, TextInput, ActivityIndicator } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import Tags from '../components/Tags';
import { connect } from 'react-redux';
import { Button, SearchBar } from '../../Components';
import ExploreItem from '../components/ExploreItem';
import { getChats, getTags } from '../actions';
import { configureTransition } from '../../utils';


const Explore = ({ route, navigation, chats, tags, error, getChats, getTags }) => {
  const { colors } = useTheme();

  const styles = {

  };

  useLayoutEffect(() => {
    navigation.setOptions({
      // header: () => <TextInput />
      headerTitle: () => <SearchBar onSearch={handleSearch} />      
    })
  });

  useEffect(() => {

    if (!tags) getTags();

    if (!chats) getChats();

    // configureTransition();
  }, []);
  // const [query, setQuery] = useState('');

  const handleSearch = (query) => {
    
  }


  const renderChat = ({ item: { id, name, icon } }) => {
    return (
      <ExploreItem
        name={name}
        icon={icon}
        // onPress={() => navigation.navigate('Chats', { screen: 'Chat', params: { chatId: id }})}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Tags tags={tags} />
      {chats && (
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={chats}
          renderItem={renderChat}
        />
      )}
      {error && (
        <View>
          <Text>{error.message}</Text>
          <Button>
            Reload
          </Button>
        </View>
      )}
      {!chats && !error && (
        <ActivityIndicator size='large' color={colors.brand} style={{ justifyContent: 'center', alignItems: 'center' }} />
      )}
    </View>
  )
}

const mapStateToProps = state => ({
  chats: state.chats.chats,
  tags: state.chats.tags,
  error: state.chats.error,
})

export default connect(
  mapStateToProps,
  { getTags, getChats }
)(Explore);
