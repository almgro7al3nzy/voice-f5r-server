import React, { useState } from 'react';
import { View, TextInput, Dimensions, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Modal from 'react-native-modal';
// import ModalContainer from './ModalContainer';
// import PinCard from './PinCard';
import { Text, Button2 } from '../../Components';
import { SafeAreaView } from 'react-native-safe-area-context';


const ReplyPinModal = ({ isVisible, hideModal, replyPin, onSubmitReply }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // flex: 1,
      backgroundColor: colors.card,
      // padding: 10,
      borderRadius: 5,
      marginTop: StatusBar.currentHeight,
    },
    pinText: {
      fontSize: 16,
      color: colors.text,
      backgroundColor: colors.background,
      paddingHorizontal: 15,
      paddingVertical: 15,

      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    },
    suggestions: {
      padding: 15,
      borderTopWidth: 1,
      borderColor: colors.border,
    },
    replyText: {
      padding: 15,
    }
  };

  const [text, setText] = useState('');

  return (
    <Modal 
      isVisible={isVisible}
      onBackButtonPress={hideModal}
      onBackdropPress={hideModal}
      backdropOpacity={0.5}
      statusBarTranslucent

      deviceHeight={Dimensions.get('screen').height}

      style={{
        justifyContent: 'flex-start',
        // justifyContent: 'flex-end',
        // justifyContent: 'center',
        // margin: 0,
        // backgroundColor: 'blue',
        // flex: 1,

        // position: 'relative',
        // position: 'absolute',
      }}

      useNativeDriver={true}
      useNativeDriverForBackdrop
      swipeDirection='down'
      onSwipeComplete={hideModal}
      animationInTiming={500}
        // swipeThreshold={400}
    >
      {/* <ModalContainer> */}
        <View style={styles.container}>
          {/* <View> */}
            {/* <PinCard text={replyPin && replyPin.text} /> */}
            <Text style={styles.pinText}>{replyPin && replyPin.text}</Text>
          {/* </View> */}

          <TextInput
            style={styles.replyText}
            placeholder={`Message ${replyPin && replyPin.author.name}`}
            placeholderTextColor={colors.text3}
            value={text}
            onChangeText={setText}
            multiline
            // autoFocus
          />

          <View style={styles.suggestions}>
            {/* suggestions/past messages */}
            <Text>Add my epic 02reborn</Text>
            <Text>Im available on Thursday</Text>
            <Text>Can we meet tomorrow?</Text>
          </View>

          <Button2 title='Send' onPress={() => onSubmitReply(text)} disabled={!text} />
        </View>
        {/* </ModalContainer> */}
    </Modal>
  );
}

export default ReplyPinModal;