import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text, Touchable } from '../../Components';
import { connect } from 'react-redux';


const Poll = ({ questions }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      justifyContent: 'space-around',
      backgroundColor: colors.card,
    },  
    question: {
      paddingHorizontal: 20,
      paddingVertical: 10,

      fontSize: 16,
    },
    options: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    answers: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      // paddingHorizontal: 10,
      // width: '100%',
    },
    optionText: {
      paddingHorizontal: 10,
      paddingVertical: 10,

      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 5,
    },
    rank: {
      paddingHorizontal: 20,
      paddingVertical: 10,

      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 5,
    }
  };

  const [question, setQuestion] = React.useState(questions[0]);
  const [answerIndexes, setAnswerIndexes] = React.useState([]);


  const handleChooseOption = order => {
    if (answerIndexes.includes(order)) return;

    setAnswerIndexes(answerIndexes.concat(order))
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.text}</Text>

      <View style={styles.answers}>
        {answerIndexes.map((order, index) => {
          return (
            <Touchable 
              key={order}
              style={styles.option} 
              // disabled={answerIndexes.includes(option.order)}
              onPress={() => setAnswerIndexes(answerIndexes.filter(answerIndex => answerIndex !== order))} 
            >
              <Text style={styles.rank}>{index + 1}</Text>
              <Text style={styles.optionText}>
                {question.options.find(option => option.order === order).text}
              </Text>
            </Touchable>
          );
        })}
      </View>

      <View style={styles.options}>
        {question.options.map(option => {
          
          return (
            <Touchable 
              key={option.id}
              style={styles.option} 
              disabled={answerIndexes.includes(option.order)}
              // onPress={() => setAnswerIndexes(answerIndexes.concat(option.order))} 
              onPress={() => handleChooseOption(option.order)}
            >
              <Text style={styles.optionText}>{option.text}</Text>
            </Touchable>
          );
        })}
      </View>
    </View>
  );
}


const mapStateToProps = state => ({
  user: state.auth.user,
  questions: state.games.poll.questions,
  rooms: state.games.truthOrDare.rooms,
  room: state.games.truthOrDare.room,  
  // roomId: state.games.truthOrDare.roomId,  
  roomId: state.games.games.roomId,  
  language: state.games.truthOrDare.language,  
  profile: state.games.truthOrDare.profile,  
  error: state.games.truthOrDare.error,
  socket: state.games.truthOrDare.socket,
  gamesSocket: state.games.games.socket,
  game: state.games.games.game,

  chatSocket: state.chats.socket,
  chats: state.chats.chats,
});

// const mapDispatchToProps = dispatch => ({
//   setRoom: (room) => dispatch({ type: SET_ROOM, room }),
//   setProfile: (profile) => dispatch({ type: SET_PROFILE, profile }),
//   setLanguage: (language) => dispatch({ type: SET_LANGUAGE, language }),
//   stopGaming: () => dispatch({ type: SET_GAME, game: null }),
//   quitGame: () => dispatch({ type: QUIT_GAME }),
//   startGaming: () => dispatch({ type: SET_GAME, game: 'truthOrDare' }),
// })

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Poll);

