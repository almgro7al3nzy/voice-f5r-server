import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Game from '../components/Game';
import Chat from '../components/Chat';

const Room = ({ room, socket, user, myChoice, setMyChoice, profile, setProfile, showQuitModal }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
    }
  };

  // const [myChoice, setMyChoice] = React.useState(null);
  const [playing, setPlaying] = React.useState(false);

  console.log('ROOMCOMPLETE', room.users.length, Object.keys(room.choices).length, room.choices);

  return (
    <View style={styles.container}>
      <Game 
        socket={socket} 
        userIds={room && room.users && room.users.map(user => user.id)}
        room={room}
        question={room && room.question}
        user={user}
        myChoice={myChoice}
        setMyChoice={setMyChoice}
        playing={playing}
        setPlaying={setPlaying}
        choicesComplete={room && room.choices && room.users.length === Object.keys(room.choices).length}
      />
      <Chat 
        room={room}  
        profile={profile}
        setProfile={setProfile}
        // choices={choices}
        myChoice={myChoice}
        showQuitModal={showQuitModal}
      />
    </View>
  )
}

export default Room;