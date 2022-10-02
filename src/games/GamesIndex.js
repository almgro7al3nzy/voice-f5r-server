import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { connect } from 'react-redux';

import TruthOrDareLogo from './TruthOrDare/components/Logo';
import NeverHaveIEverLogo from './NeverHaveIEver/components/Logo';
import { HeaderButton, HeaderTitle, HeaderTitle2 } from '../Components';
import ChooseGame from './components/ChooseGame';
import Lobby from './components/Lobby';
import { SET_ROOM, SET_PROFILE, SET_LANGUAGE, QUIT_GAME, SET_GAME_INDEX, SET_GAME, SET_ROOM_ID, SET_ACTIVE_ROOM_ID } from './types';
import TabbedHeaderTitle from '../Components/TabbedHeaderTitle';


const GamesIndex2 = ({ route, navigation, room, rooms, setRoom, setRoomId,  
  chatSocket, chats, quitGame, people, gameIndex, setGameIndex,
  rooms2, gamesSocket, truthOrDareRooms, neverHaveIEverRooms,
  truthOrDareSocket, neverHaveIEverSocket, profiles,
  user, profile, setProfile, setLanguage, language, stopGaming, startGaming }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
    },    
  };

  const [activeTab, setActiveTab] = React.useState('Party Games');

  const [index, setIndex] = React.useState(0);
  const indexRef = React.useRef(index);
  indexRef.current = index;

  // React.useEffect(() => {
  //   
  //   navigation.setOptions({
  //     headerTitleAlign: 'center',
  //     headerTitle: <HeaderTitle title={activeTab} onPress={() => {}} nodropdown/>, 
  //     headerStyle: { borderBottomColor: colors.border2, borderBottomWidth: 0.5, },
  //     headerLeft: () => (
  //       <HeaderButton 
  //         // name='compass-outline' 
  //         name='arrow-left-thick'
  //         position='left' 
  //         onPress={() => setActiveTab('Voice Chats')}
  //       />
  //     ),
  //     headerRight: () => (
  //       <HeaderButton 
  //         // name='cog-outline' 
  //         name='arrow-right-thick'
  //         position='right' 
  //         onPress={() => setActiveTab('Party Games')}
  //       />
  //     ),
  //   });
  // }, [route, navigation, activeTab, setActiveTab]);



  React.useLayoutEffect(() => {
    
    navigation.setOptions({
      headerTitleAlign: 'center',
      // headerTitle: () => (
      //   <TabbedHeaderTitle 
      //     activeTab={activeTab}
      //     tabs={[
      //       {icon: 'help-network', onPress: () => setActiveTab('Party Games')},
      //       {icon: 'compass', onPress: () => setActiveTab('Discover')},
      //       {icon: 'lock', onPress: () => setActiveTab('Personal')},
      //     ]}
      //   />
      // ),
      title: <HeaderTitle title={activeTab} onPress={() => {}} nodropdown />, 
      // headerTitle: <HeaderTitle2 title={activeTab} onPress={() => setActiveTab(activeTab === 'Voice Chats' ? 'Party Games' :'Voice Chats')} nodropdown/>, 

      // headerStyle: { borderBottomColor: colors.border2, borderBottomWidth: 0.5, },
      // headerLeft: () => (
      //   <HeaderButton 
      //     // name='compass-outline' 
      //     name='arrow-left-thick'
      //     position='left' 
      //     onPress={() => setActiveTab('Voice Chats')}
      //   />
      // ),
      // headerRight: () => (
      //   <HeaderButton 
      //     // name='cog-outline' 
      //     name='arrow-right-thick'
      //     position='right' 
      //     onPress={() => setActiveTab('Party Games')}
      //   />
      // ),
    });
  }, [navigation, activeTab, setActiveTab]);


  


  const handleChooseGame = e => {
    const slideSize = e.nativeEvent.layoutMeasurement.width;
    const index = e.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) setIndex(roundIndex);
  }

  const lobbyRooms = index === 0 ? truthOrDareRooms : index === 1 ? neverHaveIEverRooms : index === 2 ? [] : [];
  const activeGame = index === 0 ? 'TruthOrDare' : index === 1 ? 'NeverHaveIEver' : index === 2 ? 'WouldYouRather' : null
  const socket = index === 0 ? truthOrDareSocket : index === 1 ? neverHaveIEverSocket : index === 2 ? null : null

  // console.log('lobbyRooms', index, lobbyRooms);

  return (
    <View style={styles.container}>
      {/* <ScrollView 
        contentContainerStyle={styles.container}      
        decelerationRate='fast'
        snapToInterval={Dimensions.get('window').width}
        horizontal
      >
        <TruthOrDareLogo />
        <NeverHaveIEverLogo />
      </ScrollView> */}
      <ChooseGame 
        setGameIndex={setGameIndex} 
        gameIndex={gameIndex} 
        onChooseGame={handleChooseGame}
        index={index}
        activeTab={activeTab}
        navigation={navigation}
      />

      <Lobby
          route={route} 
          setRoom={setRoom} 
          setRoomId={setRoomId} 
          room={room}
          rooms={lobbyRooms} 
          game={activeGame}
          people={people}
          socket={socket} 
          gamesSocket={gamesSocket}
          neverHaveIEverSocket={neverHaveIEverSocket}
          truthOrDareSocket={truthOrDareSocket}
          user={user}
          language={language}
          setLanguage={setLanguage}
          navigation={navigation}
          startGaming={startGaming}
          activeTab={activeTab}
          profiles={profiles}
        />
      
    </View>
  );
}

// const mapStateToProps = state => ({
//   user: state.auth.user,
//   games: state.games.truthOrDare.games,
//   error: state.games.truthOrDare.error,
//   socket: state.games.truthOrDare.socket,
// })



const mapStateToProps = state => {
  
  return {
      user: state.auth.user,
      people: state.games.truthOrDare.people,
      truthOrDareRooms: state.games.truthOrDare.rooms,
      neverHaveIEverRooms: state.games.neverHaveIEver.rooms,
      // room: state.games.truthOrDare.room,  
      room: state.games.games.room,  
      rooms: state.games.games.rooms,  
      language: state.games.truthOrDare.language,  
      profile: state.games.truthOrDare.profile,  
      error: state.games.truthOrDare.error,
      // socket: state.games.truthOrDare.socket,
      truthOrDareSocket: state.games.truthOrDare.socket,
      neverHaveIEverSocket: state.games.neverHaveIEver.socket,
      gamesSocket: state.games.games.socket,
    
      gameIndex: state.games.gameIndex,
    
      chatSocket: state.chats.socket,
      chats: state.chats.chats,
      profiles: state.chats.profiles,
    }
}

// const mapStateToProps = state => ({
//   user: state.auth.user,
//   people: state.games.truthOrDare.people,
//   rooms: state.games.truthOrDare.rooms,
//   room: state.games.truthOrDare.room,  
//   language: state.games.truthOrDare.language,  
//   profile: state.games.truthOrDare.profile,  
//   error: state.games.truthOrDare.error,
//   socket: state.games.truthOrDare.socket,

//   gameIndex: state.games.gameIndex,

//   chatSocket: state.chats.socket,
//   chats: state.chats.chats,
// });

const mapDispatchToProps = dispatch => ({
  setRoom: (room) => dispatch({ type: SET_ROOM, room }),
  setRoomId: (roomId) => dispatch({ type: SET_ACTIVE_ROOM_ID, roomId }),
  setProfile: (profile) => dispatch({ type: SET_PROFILE, profile }),
  setLanguage: (language) => dispatch({ type: SET_LANGUAGE, language }),
  stopGaming: () => dispatch({ type: SET_GAME, game: null }),
  quitGame: () => dispatch({ type: QUIT_GAME }),
  startGaming: (game) => dispatch({ type: SET_GAME, game }),
  setGameIndex: (gameIndex) => dispatch({ type: SET_GAME_INDEX, gameIndex }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamesIndex2);

