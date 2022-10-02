import React, { useState, useEffect } from 'react'
import { Text, ScrollView, View, StyleSheet, FlatList, ActivityIndicator, Linking, RefreshControl } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import colors from '../../colors';
import { Button, HeaderTitle, HeaderButton, ListHeader, Touchable, ListHeaderLink } from '../Components';
import { getContacts, getChats } from './actions';
import ChatItem from './components/ChatItem';
import ChatListModal from './components/ChatListModal';


import { connect } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators, } from '@react-navigation/stack'
import SpaceListModal from '../account/components/SpaceListModal';


const Chats = ({ route, navigation, chats, error, spaces, getChats, getContacts, user, boards, publicChats }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.card,
    },

    roleChatItem: {
      // borderRadius: 10,
      // backgroundColor: colors.background,
      // marginHorizontal: 5,
      // padding: 5,
      // alignSelf: 'center',

      justifyContent: 'center',
      alignItems: 'center',
    },
    roleChatIcon: {
      fontSize: 40,
      color: colors.text3,

      marginHorizontal: 20,
      marginVertical: 5,
      // padding: 20,

      borderRadius: 10,
      backgroundColor: colors.background,
      marginHorizontal: 10,
      marginVertical: 5,
      padding: 5,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',

      // width: 150,
      // height: 150,
    },
    roleChatTitle: {
      fontSize: 13,
      color: colors.text,
      // fontWeight: 'bold',
    },
    spaces: {
      flexGrow: 0,
      alignItems: 'center',
      paddingHorizontal: 10,

      // backgroundColor: 'blue',
    },
    publicChats: {
      // flex: 1,
      // flex: 0,
      // height: 0,
      // backgroundColor: 'red',
      // padding: 0,
      // padding: 50,
      // margin: 0,
      // height: '100%',

      // height: 50,
  // backgroundColor: 'red',
  flexGrow: 0
    },
    publicChats2: {
      flex: 1,
      backgroundColor: 'green',
      padding: 0,

      // height: 50,
      // backgroundColor: 'red',
      // flexGrow: 0
    },
    row: {
      flexGrow: 0,
      // flexShrink: 0,
      // flexBasis: 1,
      // flexDirection: 'row',
      // justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 10,

      paddingHorizontal: 10,
      paddingVertical: 0,
      backgroundColor: 'red',
    }
  };

  useEffect(() => {
    
    // getChats();
    // getContacts();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({      
      headerTintColor: colors.text,
      headerStyle: {
          // backgroundColor: colors.blue
      },
      headerTitleAlign: 'center',
      headerTitle: <HeaderTitle title={'Chats'} onPress={() => {}} nodropdown />, 
      // headerTitle: <HeaderTitle title={'Chats'} onPress={() => setChatListVisible(true)} nodropdown />, 
      // headerTitle: false,
      headerStyle: { borderBottomColor: colors.border2, borderBottomWidth: 0.5, },

      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      headerLeft: () => (
        <HeaderButton 
          name='magnify' 
          position='left' 
          onPress={() => navigation.navigate('Chats', { screen: 'Explore' })}
        />
      ),
      headerRight: () => (
        <HeaderButton 
          name='plus' 
          position='right' 
          onPress={() => navigation.navigate('Chats', { screen: 'CreateChat' })}
        />
      )
    });
  }, [route, navigation]);

  const [refreshing, setRefreshing] = useState(false);
  const [listData, setListData] = useState(chats);
  const [chatListVisible, setChatListVisible] = React.useState(false);
  const [activeChat, setActiveChat] = React.useState(null);
  const [chooseRoleShowing, setChooseRoleShowing] = React.useState(false);
  const [spaceListVisible, setSpaceListVisible] = React.useState(false);



  const handleRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
        getChats();
        
    }
    catch (err) {
      
    }
    setRefreshing(false);
  }, [refreshing]);



  // const renderChatItem

  const chatLists = [
    { id: 1, name: 'Messages', icon: 'email' },
    { id: 1, name: 'Pins', icon: 'pin' },
    { id: 1, name: 'Archived', icon: 'archive' },

  ]
  const chats2 = [
    { id: 1, name: 'Messages', icon: 'email' },
    { id: 1, name: 'Pins', icon: 'pin' },
    { id: 1, name: 'Archived', icon: 'archive' },

  ]



  // const pins = boards.map(board => board.pins)

  // 

  const renderSpaceItem = ({ item, item: { id, name, icon, color, onPress } }) => {
    
    return (
      <Touchable 
        background={colors.background4}
        style={[styles.roleChatItem, id === 0 && chooseRoleShowing && {backgroundColor:colors.background}]}
        onPress={() => onPress ? onPress() : navigation.navigate('Games', { screen: 'Board', params: { spaceId: id }})} 
      >
        <MaterialCommunityIcons name={icon} style={[styles.roleChatIcon, {color}]} />
        <Text style={styles.roleChatTitle}>{name}</Text>
      </Touchable>
    )
  }

  // const spaces = [
  //   { id: 0, icon: 'plus', title: 'New', color: colors.text3, onPress: () => setChooseRoleShowing(!chooseRoleShowing) },
  //   { id: 1, icon: 'heart-circle-outline', color: "#" + ((1<<24)*Math.random() | 0).toString(16), title: 'Memories', onPress: '' },
  //   { id: 2, icon: 'poll-box-outline', color: "#" + ((1<<24)*Math.random() | 0).toString(16), title: 'Opinions', onPress: '' },
  //   { id: 3, icon: 'bed-outline', title: 'Roommate', color: "#" + ((1<<24)*Math.random() | 0).toString(16), onPress: '' },
  //   { id: 4, icon: 'translate', title: 'Language Exchange', color: "#" + ((1<<24)*Math.random() | 0).toString(16), onPress: '' },
  // ]
  // const spaces2 = [
  //   { id: 0, icon: 'plus', title: 'New', color: colors.primary, onPress: () => setChooseRoleShowing(!chooseRoleShowing) },
  //   { id: 1, icon: 'heart-circle-outline', color: colors.text3, title: 'Memories', onPress: '' },
  //   { id: 2, icon: 'poll-box-outline', color: colors.text3, title: 'Opinions', onPress: '' },
  //   { id: 3, icon: 'bed-outline', title: 'Roommate', color: colors.text3, onPress: '' },
  //   { id: 4, icon: 'translate', title: 'Language Exchange', color: colors.text3, onPress: '' },
  // ]
  
  // 
  

  return (
    <View style={styles.container}>
      {/* <ListHeaderLink title={chooseRoleShowing ? 'Choose Space' : 'Spaces'} onPress={() => navigation.navigate('Chats', { screen: 'CreateChat' })} /> */}
      {/*  */}

      {/* {publicChats || chats && (
        <FlatList
          data={chats}
          keyExtractor={({id}) => id.toString()}
          renderItem={renderRoleChatItem}
          horizontal
          // contentInset={{ right: 20, top: 0, left: 0, bottom: 0 }}
          // ListFooterComponent={<View style={{width:15}}></View>}

          style={styles.publicChats}
          // contentContainerStyle={styles.publicChats2}

          // contentContainerStyle={{ paddingBottom: 0 }}
          // contentContainerStyle={{ padding: 0, margin: 0, }}
        /> 
      )} */}

      {/* <FlatList
        // data={chooseRoleShowing ? spaces2 : spaces}
        data={spaces}
        keyExtractor={({id}) => id.toString()}
        renderItem={renderSpaceItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.spaces}
        style={{ flexGrow: 0, }}
      />

      <ListHeader title={'CHATS'} /> */}
      {chats && (
        <FlatList
          data={chats}
          keyExtractor={({id}) => id.toString()}
          renderItem={({item}) => (
            <ChatItem 
              {...item} 
              name={item.name || item.participants.find(p => p.id !== user.id).name} 
              icon={item.icon || item.participants.find(p => p.id !== user.id).profile.avatarSource} 
              onPress={() => navigation.navigate('Chats', { screen: 'Chat', params: { chatId: item.id }})} 
            />
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        /> 
      )}
      {/* {!chats && error (
        <View>
          <Text>{error.message}</Text>
          <Button type={3} text='Reload' />
        </View>
      )}
      {!chats && !error (
        <ActivityIndicator size='large' color={colors.brand} style={{ justifyContent: 'center', alignItems: 'center' }} />
      )} */}


      {/* CHATSPACE */}
      <ChatListModal
        isVisible={chatListVisible} 
        hideModal={() => setChatListVisible(false)} 
        chats={chatLists}
        setActiveChat={setActiveChat}
      />
      <SpaceListModal
        // isVisible={spaceListVisible}
        // hideModal={() => setSpaceListVisible(false)}

        isVisible={chooseRoleShowing}
        hideModal={() => setChooseRoleShowing(false)}
        navigation={navigation}
        spaces={spaces}
      />
    </View>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,    
  chats: state.chats.chats,
  spaces: state.chats.spaces,
  error: state.chats.error
})

export default connect(
  mapStateToProps,
  { getChats, getContacts }
)(Chats);
