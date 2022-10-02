import React from 'react';
import { View, Text, TouchableHighlight, Dimensions, StatusBar, TouchableNativeFeedback } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Touchable } from '../../../../Components';



export const NEVER = 'NEVER';
export const DONE_THAT = 'DONE THAT';

export const CHOICES = { NEVER, DONE_THAT };

const Game = ({ room, socket, userIds, question, user, myChoice, setMyChoice, playing, setPlaying, choicesComplete }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',

      backgroundColor: colors.darkBackground,
      // backgroundColor: 'green',

      
      // paddingVertical: 100,
      // paddingHorizontal: 50,

      // paddingHorizontal: 10,
    },
    content: {
      justifyContent: 'space-between',
      backgroundColor: colors.darkBackground2,
      borderRadius: 10,
      // height: Dimensions.get('screen').height - Dimensions.get('window').height - StatusBar.currentHeight,
      height: Dimensions.get('window').height + StatusBar.currentHeight,
      // height: Dimensions.get('window').height,
      // paddingHorizontal: 10,
      // padding: 20,
      // paddingBottom: 0,
    },
    heading: {
      color: colors.lightText,
      fontSize: 40,
      fontWeight: 'bold',
      margin: 20,
      // marginRight: 60,
      // backgroundColor: 'red',
      width: 300,
      // marginVertical: 50,
      // padding: 40,
    },
    question: {
      color: colors.lightText,
      fontSize: 22,
      marginVertical: 40,
      marginHorizontal: 20,
      marginRight: 60,
      // marginB
      // marginVertical: 30,
      // padding: 40,
      // paddingTop: 0,
    },
    row: {
      flexDirection: 'row',
      // marginTop: 100,
      // backgroundColor: 'green',
      // wid
      // position: 'absolute',
      // bottom: 50,
      // bottom: 0,
    },
    btn: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'transparent',
    },
    btnText: {
      textTransform: 'uppercase',
      color: colors.lightText,
      fontSize: 16,
      width: '100%',
      textAlign: 'center',
      paddingVertical: 70,
      paddingVertical: 40,
      // flex: 1,
      // backgroundColor: 'red',
      // borderRightWidth: 1,
    },
    card: {
      flex: 1,
      justifyContent: 'center',
      // alignItems: 'center',
      // backgroundColor: 'green',
      backgroundColor: '#333',

    },
    startBtn: {
      // color: colors.lightText,
      // fontSize: 22,
      margin: 20,

      borderWidth: 1,
      borderColor: colors.lightText,
      paddingHorizontal: 90,
      // paddingVertical: 5,
      paddingBottom: 3,
      alignSelf: 'flex-start',
      borderRadius: 5,
    },
    startBtnText: {
      color: colors.lightText,
      fontSize: 22,
      // margin: 40,

      // borderWidth: 1,
      // borderColor: colors.lightText,
      // paddingHorizontal: 90,
      // // paddingVertical: 10,
      // alignSelf: 'flex-start',
      // borderRadius: 5,
    },
    continueBtnText: {
      color: colors.lightText,
      borderWidth: 1,
      borderColor: colors.lightText,

      alignSelf: 'flex-start',
      paddingHorizontal: 40,
    }
  };

  // const [playing, setPlaying] = React.useState(false);
  // const [myChoice, setMyChoice] = React.useState(null);
  // const [question, setQuestion] = React.useState(null);

  const handleStartGame = () => {
    socket.emit('start_game', {roomId: room.id, currentPlayerId: user.id});
    
    setPlaying(true);
    console.log('handleStartGameNHIE');
  };

  const handleSelectOption = (option) => {
    // socket.emit('select_option', { questionId: question.id, userId: user.id, optionId });
    console.log('handleSelectOption', option);
    if (!option) return;
    socket.emit('choose_option', { roomId: room.id, userId: user.id, optionId: option.id });
    
    setMyChoice(option.text);
  }

  const handleContinueGame = () => {
    socket.emit('next_question', { roomId: room.id, userId: user.id });
  }

  

  console.log('choicescomplote', choicesComplete);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.heading}>Never Have I Ever</Text>            
            {question && (
              <Text style={styles.question}>{question.text}</Text>
            )}
            {(!question || choicesComplete) && (
              <Touchable 
                onPress={!question ? handleStartGame : handleContinueGame} 
                background={colors.darkBackground}
                style={styles.startBtn}
              >
                <Text style={styles.startBtnText}>{!question ? 'Start' : choicesComplete ? 'Continue': ''}</Text>
              </Touchable>
            )}
        </View>

        {/* {choicesComplete && (
          <TouchableNativeFeedback>
            <Text style={styles.continueBtnText}>Continue</Text>
          </TouchableNativeFeedback>
        )} */}

        <View style={styles.row}>
          <TouchableHighlight style={styles.btn} onPress={() => handleSelectOption(question && question.options[0])}>
            <Text style={[styles.btnText, {backgroundColor: myChoice === NEVER ? colors.primary7 : colors.lightTranslucent, borderBottomLeftRadius: 10, borderRightWidth: 1,}]}>{NEVER}</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.btn} onPress={() => handleSelectOption(question && question.options[1])}>
            <Text style={[styles.btnText, {backgroundColor: myChoice === DONE_THAT ? colors.primary6 : colors.lightTranslucent, borderBottomRightRadius:10,}]}>{DONE_THAT}</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  )
}

export default Game;



// const OptionButton = ({ option, onPress }) => {
//   const { colors } = useTheme();

//   const styles = {
//     btn: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       // backgroundColor: 'transparent',
//     },
//     btnText: {
//       textTransform: 'uppercase',
//       color: colors.lightText,
//       fontSize: 16,
//       width: '100%',
//       textAlign: 'center',
//       paddingVertical: 70,
//       paddingVertical: 40,
//       // flex: 1,
//       // backgroundColor: 
//     },
//   };

//   return (    
//     <TouchableHighlight disabled={!Boolean(question)} style={styles.btn} onPress={() => handleSelectOption(question.option[1])}>
//       <Text style={[styles.btnText, {backgroundColor:colors.basic2Translucent, borderBottomRightRadius:10,}]}>{question && question.option[1].text}</Text>
//     </TouchableHighlight>
//   );
// }