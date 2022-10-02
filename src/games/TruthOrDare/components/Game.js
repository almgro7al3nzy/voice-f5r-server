import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, Dimensions } from 'react-native'
import { configureTransitionFast, randomIntFromInterval } from '../utils';
import Button from './Button';
import Option from './Option';
import cards from '../cards.json';
import { TRUTH, DARE, CHOICES } from '../types';
import { useTheme } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Countdown from './Countdown';
import Countdown2 from './Countdown2';
import CountdownTimer from './CountdownTimer';
import SVG from './00SVG';
import Countdown3 from './Countdown3';
import { Touchable } from '../../../Components';
import { SafeAreaView } from 'react-native-safe-area-context';




const Game = ({ startDisabled, roomId, timer, userChoiceId,
  onPressStart, currentPlayerId, answer2, question, truthOrDareChoice, user, room,
  setTimer, currentPlayerIndex, setCurrentPlayerIndex, isCurrentPlayer, socket }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      // backgroundColor: colors.darkBackground,
      // backgroundColor: colors.lightBackground,
      // paddingBottom: 50,
      // flex: 1,
      // zIndex: 1,
      // position: 'absolute',
      // left: 0,
      // right: 0,
      // top: 0,
      // bottom: 0,
      // justifyContent: 'center',
      // alignItems: 'center',
      
    },
    players: {
      // flex: 1,
      zIndex: 1,
      position: 'absolute',
      // left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    truth: {
      flex: 1,
      backgroundColor: 'lightcoral',
      backgroundColor: 'rgba(255,0,0,0.5)',    
      justifyContent: 'center',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row',
    },
    dare: {
      flex: 1,
      backgroundColor: 'rgba(100,149,237,0.6)',
      backgroundColor: 'rgba(0,0,255,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    text: {
      color: colors.darkText,
      fontSize: 48,
      fontWeight: 'bold',
      // alignSelf: 'flex-end'
    },
    truthText: {
      color: colors.darkText,
      fontSize: 48,
      fontWeight: 'bold',
      // alignSelf: 'flex-end'
    },
    dareText: {
      color: colors.darkText,
      fontSize: 48,
      fontWeight: 'bold',
      // alignSelf: 'flex-start'
    },
    start: {
      position: 'absolute',
      // bottom: 150,
      bottom: Dimensions.get('screen').height / 4,
      // top: 0,
      left: 70,
      right: 70,
      justifyContent: 'center',
      alignItems: 'center',
    },
    // random: {
    //   zIndex: 1,
    //   position: 'absolute',
    //   bottom: 0,
    //   top: 0,
    //   left: 0,
    //   right: 0,

    //   justifyContent: 'center',
    //   alignItems: 'center',
      
    //   // justifyContent: 'center',
    //   // justifyContent: 'flex-end',
    //   // backgroundColor: 'green',
    // },
    settings: {
      zIndex: 1,
      position: 'absolute',
      right: 20,
      top: 30,
    },
    reaction: {
      zIndex: 1,
      position: 'absolute',
      right: 20,
      bottom: 30,
    },
    rooms: {
      position: 'absolute',
      // zIndex: 2,
      bottom: 0,
      left: 0,
      right: 0,
      // backgroundColor: 'green',
      // height: 250,
    },
    challenge: {
      // position: 'absolute',
      // // zIndex: 1,
      // // width: '50%',
      // paddingHorizontal: 70,
      // // paddingTop: 150,

      // bottom: 0,
      // // top: 150,
      // top: 0,
      // left: 0,
      // // left: '25%',
      // right: 0,

      // justifyContent: 'center',
      // alignItems: 'center',

      // // backgroundColor: 'green',



      zIndex: 1000,
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,

      justifyContent: 'center',
      // justifyContent: 'space-around',
      alignItems: 'center',

      // backgroundColor: 'green',
    },
    challengeText: {
      color: colors.lightText,
      fontSize: 20,
      textAlign: 'center',

      position: 'absolute',
      top: 120,
      // // bottom: 0,
      // top: -100,
      // backgroundColor: 'red',
    },      
    answerInput: {
      color: colors.lightText,
      fontSize: 20,
      // fontWeight: 'bold',
      paddingHorizontal: 15,
      backgroundColor: colors.darkTranslucent3,
      // backgroundColor: colors.lightTranslucent,
      // backgroundColor: colors.darkBackground3,
      // backgroundColor: colors.primary,
      width: '60%',
      // marginVertical: 50,
      borderRadius: 5,
      textAlign: 'center',
      
      // borderWidth: 1,
      // borderColor: colors.lightText,
      // borderColor: colors.darkBackground,
    },
    thumbs: {
      color: colors.lightText,
      // color: colors.lightText3,
      // color: colors.lightTranslucent3,
      fontSize: 60,

      marginHorizontal: 40,
    },
    finalActions: {
      position: 'absolute',
      bottom: 120,
      // zIndex: 2000,
      // bottom: 80,
      // top: 20,
      // marginVertical: 40,
      // padding: 10,
      // backgroundColor: 'blue',
      flexDirection: 'row',
    },
    middleBtn: {

      // backgroundColor: 'yellow',

      justifyContent: 'center',
      alignItems: 'center',

      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,      
      right: 0,
    },
    options: {
      // backgroundColor: 'blue',
      width: '60%',
      marginVertical: 20,
    },
    option: {
      backgroundColor: colors.darkTranslucent3,
      marginVertical: 5,
      // paddingHorizontal: 5,
      paddingVertical: 5,
      width: '100%',
      borderRadius: 5,
    },
    optionText: {
      color: colors.lightText,
      fontSize: 16,
      textAlign: 'center',
    }
  };

  // const [choice2, setChoice] = useState(null);
  const [answer, setAnswer] = React.useState('');
  // const [currentPlayerId, setPlaying] = useState(false);
  // const [challenge, setChallenge] = useState(null);
  // const [choosing, setChoosing] = useState(null);


  // React.useEffect(() => {
    
  //   if (truthOrDareChoice) {
  //     setTimer(-1);
  //     const options = cards.filter(card => card.type === truthOrDareChoice);
  //     const challenge = options[randomIntFromInterval(0, options.length)];
  //     setChallenge(challenge);
  //   }

  //   else {
  //     setChallenge(null);
  //     if (currentPlayerIndex) {
        
  //       setTimer(10);
  //       setCurrentPlayerIndex(currentPlayerIndex + 1);
        
  //     }
  //   }
  // }, [truthOrDareChoice]);

  // React.useEffect(() => {
  //   if (timer === 0) setChoice(CHOICES[Math.floor(Math.random())])
  // }, [timer])

  // let truthOrDareChoice = null;

  // React.useEffect(() => {
  //   
  // }, [truthOrDareChoice]);

  configureTransitionFast();

  const handleTypeAnswer = (answer) => {
    if (currentPlayerId !== user.id) return;

    socket.emit('type_answer', { roomId, answer });
    if (!room.finalAnswer) setAnswer(answer);
  }

  const handleChooseTruthOrDare = (choice) => {
    // socket.emit('choose_option', { roomId, truthOrDareChoice });
    // console.log('handleChooseTruthOrDare', truthOrDareChoice, currentPlayerId, user.id, socket);
    console.log('handleChooseTruthOrDarechoice', choice);
    if (currentPlayerId != user.id) return;
    

    socket.emit('choose_truth_or_dare', { roomId, truthOrDareChoice: choice });
    
    // setAnswer(answer);
  }

  const handleChooseOption = (optionId) => {
    // if (currentPlayerId !== user.id) return;
    

    socket.emit('choose_option', { userId: user.id, optionId, roomId });
    console.log('handleChooseOptionEMITTED');
  }

  const handleSubmitAnswer = () => {
    // 
    if (currentPlayerId !== user.id) return;
    // 

    setAnswer('');
    socket.emit('submit_answer', { answer, roomId: room.id, userId: user.id, questionId: question.id });
    // setAnswer(answer);
  }

  const handleVoteAnswer = (vote) => {
    if (currentPlayerId === user.id) return;

    socket.emit('vote_answer', { answerId: room.finalAnswer.id, roomId: room.id, userId: user.id, questionId: question.id, vote });
  }

  const handleSetNextPlayer = () => {
    if (currentPlayerId !== user.id || !truthOrDareChoice) return;

    console.log('handleSetNextPlayer');

    socket.emit('set_next_player', { roomId: room.id });
  }

  // const handlePressMiddleButton = () => {

  //   // CLEAR CHOICE OR SET RANDOM CHOICE ***
  //   truthOrDareChoice ? handleChooseTruthOrDare(null) : handleChooseTruthOrDare(CHOICES[Math.floor(Math.random())])}
  // }

  // const middleButtonText = truthOrDareChoice ? 'Continue' : currentPlayerId ? 'Random' : 'Or'

  const showVoteButtons = 
    currentPlayerId !== user.id && truthOrDareChoice === DARE ||
    currentPlayerId !== user.id && 
    room.finalAnswer &&
    !Boolean(room.voters.find(voter => voter.id === user.id))

  
  // console.log('question', question);
  return (
    <View style={styles.container}>

      {/* <Countdown timer={timer} setTimer={setTimer} /> */}

      {/* <Countdown 
        seconds={5}
        size={100}
        // strokeBackground={colors.darkTranslucent}
        strokeBackground={'white'}
        // strokeColor={colors.primary}
        strokeColor={'yellow'}
        strokeWidth={2}
      /> */}
      
      {/* <CountdownTimer 
        seconds={15}
        size={60}
        strokeBackground='black'
        strokeColor='yellow'
        strokeWidth={2}
      /> */}

      {/* <SVG /> */}

      {/* <Countdown2 
        seconds={15} 
        size={60}
        strokeBgColor="black"
        strokeColor="lemonchiffon"
        strokeWidth={2}
      /> */}

      {truthOrDareChoice !== DARE && (
      // <TouchableOpacity 
      //   style={[styles.truth, { flex: truthOrDareChoice && truthOrDareChoice !== TRUTH ? 0 : 1 }]} 
      //   onPress={() => setChoice(TRUTH)}
      // >
      //   <Text style={[styles.text, { alignSelf: truthOrDareChoice === TRUTH ? 'flex-start' : !currentPlayerId ? 'flex-end' : 'center' }]}>
      //     TRUTH
      //   </Text>
      // </TouchableOpacity>

      <Option
        option={TRUTH}
        onPress={() => handleChooseTruthOrDare(TRUTH)}
        // onPress={currentPlayerId ? () => setChoice(TRUTH) : null}
        truthOrDareChoice={truthOrDareChoice}
        currentPlayerId={currentPlayerId}
        isCurrentPlayer={isCurrentPlayer}
      />
      )}

        <View style={styles.challenge} pointerEvents='box-none'>
          <Text style={styles.challengeText}>
            {question && question.text}
          </Text>

          <View style={styles.options}>
            {question && question.options.map(({id, text}) => {
              const selectedOptionStyle = userChoiceId === id && {backgroundColor:colors.darkBackground}

              return (
                <Touchable key={id} onPress={() => handleChooseOption(id)} style={[styles.option, selectedOptionStyle]} background={colors.darkBackground}>
                  <Text style={styles.optionText}>{text}</Text>
                </Touchable>
              )
            })}
          </View>

          {/* {truthOrDareChoice === TRUTH && (
            <TextInput
              style={styles.answerInput}
              value={room.finalAnswer && room.finalAnswer.text || answer || answer2}
              onChangeText={handleTypeAnswer}
              editable={currentPlayerId === user.id}
              placeholder='Type answer'
              placeholderTextColor={colors.lightText3}
            />
          )} */}

          <View style={styles.middleBtn}>
            <Button 
              style={[ !currentPlayerId && {borderWidth: 0} ]} 
              onPress={
                // currentPlayerId === user.id && truthOrDareChoice === DARE &
                currentPlayerId === user.id && truthOrDareChoice && answer ? handleSubmitAnswer : truthOrDareChoice ? () => handleChooseTruthOrDare(null) : () => handleChooseTruthOrDare(CHOICES[Math.floor(Math.random())])}
              // disabled={currentPlayerId === user.id && truthOrDareChoice && !answer || room.finalAnswer}
              disabled={truthOrDareChoice === TRUTH}
            >
              {
              // currentPlayerId === user.id && truthOrDareChoice === DARE ? 'Done' : 
              // room.finalAnswer && truthOrDareChoice ? 'Continue' : 
              currentPlayerId && !truthOrDareChoice ? 'Random' : !currentPlayerId ? 'Or' : '' }
            </Button>
          </View>

            <View style={styles.finalActions}>
          {showVoteButtons && (
            <>
              <TouchableOpacity onPress={() => handleVoteAnswer('up')}>
                <MaterialCommunityIcons name='thumb-up' style={styles.thumbs} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleVoteAnswer('down')}>
                <MaterialCommunityIcons name='thumb-down' style={styles.thumbs} />
              </TouchableOpacity>
              </>
            )}
              {currentPlayerId === user.id && truthOrDareChoice && (
              <Button onPress={handleSetNextPlayer}>
                Done
              </Button>
              )}
            </View>
          
        </View>

        {/* <View 
          pointerEvents='box-none'
          style={styles.random}
        >
          <Button 
            style={!currentPlayerId && {borderWidth: 0}} 
            onPress={currentPlayerId === user.id && truthOrDareChoice && answer ? handleSubmitAnswer : truthOrDareChoice ? () => handleChooseTruthOrDare(null) : () => handleChooseTruthOrDare(CHOICES[Math.floor(Math.random())])}
            disabled={currentPlayerId === user.id && truthOrDareChoice && !answer || room.finalAnswer}
          >
            {currentPlayerId === user.id && truthOrDareChoice ? 'Send' : 
            // room.finalAnswer && truthOrDareChoice ? 'Continue' : 
            currentPlayerId && !truthOrDareChoice ? 'Random' : !currentPlayerId ? 'Or' : '' }
          </Button>

          {showVoteButtons && (
            <View style={styles.finalActions}>
              <TouchableOpacity onPress={() => handleVoteAnswer('up')}>
                <MaterialCommunityIcons name='thumb-up' style={styles.thumbs} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleVoteAnswer('down')}>
                <MaterialCommunityIcons name='thumb-down' style={styles.thumbs} />
              </TouchableOpacity>
            </View>
          )}
        </View> */}

      {/* <View style={styles.finalActions}>
        <TouchableOpacity>
          <MaterialCommunityIcons name='thumb-up-outline' style={styles.thumbs} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name='thumb-down-outline' style={styles.thumbs} />
        </TouchableOpacity>
      </View> */}

      {truthOrDareChoice !== TRUTH && (
        <Option
          option={DARE}
          // onPress={currentPlayerId ? () => setChoice(DARE) : null}
          onPress={() => handleChooseTruthOrDare(DARE)}
          truthOrDareChoice={truthOrDareChoice}
          currentPlayerId={currentPlayerId}
          isCurrentPlayer={isCurrentPlayer}
        />

      // <TouchableOpacity 
      //   style={[styles.dare, { flex: truthOrDareChoice && truthOrDareChoice !== DARE ? 0 : 1 }]}
      //   onPress={() => setChoice('Dare')}
      // >
      // <Text style={[styles.text, { alignSelf: truthOrDareChoice === DARE ? 'flex-start' : !currentPlayerId ? 'flex-start' : 'center' }]}>
      //     DARE
      //   </Text>
      // </TouchableOpacity>
      )}

      {!currentPlayerId && (
        <Button style={styles.start} disabled={startDisabled} 
        onPress={onPressStart}
        // onPress={()=> {
        //   setPlaying(true)
        //   setTimer(15)
        //   setCurrentPlayerIndex(0)
        //  } }
         >
          Start
        </Button>
      )}
    </View>
  )
}

export default Game


const styles = StyleSheet.create();