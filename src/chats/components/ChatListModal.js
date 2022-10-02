import React from 'react';
import { FlatList, View, StatusBar, Dimensions, TouchableWithoutFeedback  } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import ChatListItem from './ChatListItem';
import Modal from 'react-native-modal';
// import { BottomModal } from '../../Components';

const ChatListModal = ({ chats, isVisible, hideModal, setActiveChat }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // flex: 1,
      backgroundColor: colors.card,
      // backgroundColor: 'blue',
    },
    // content: {
    //   flex: 0,
    //   backgroundColor: 'red',
    // }
  };



  return (
    
      <Modal 
        isVisible={isVisible}
        onBackButtonPress={hideModal}
        onBackdropPress={hideModal}
        
        backdropOpacity={0.5}

        // hasBackdrop={false}

        // animationIn='slideInDown'
        // animationOut='slideOutUp'

        animationIn='fadeIn'
        animationOut='fadeOut'

        animationInTiming={100}
        animationOutTiming={100}

        // backdropTransitionInTiming={0}
        backdropTransitionOutTiming={0}

        hideModalContentWhileAnimating={true}

        // deviceHeight={Dimensions.get('screen').height}
        // deviceHeight={0.1}
        // statusBarTranslucent
        style={{
          // justifyContent: 'flex-end',
          justifyContent: 'flex-start',
          margin: 0,          
          marginTop: useHeaderHeight() - StatusBar.currentHeight,

          // backgroundColor: 'rgba(0,0,0,0.5)',
        }}

        useNativeDriver={true}
        useNativeDriverForBackdrop={true}
        swipeDirection='down'
        onSwipeComplete={hideModal}
        animationInTiming={500}
          // swipeThreshold={400}

        customBackdrop={
          <TouchableWithoutFeedback onPress={hideModal}>
            <View style={{
              marginTop: useHeaderHeight() - StatusBar.currentHeight,
              flex: 1, 
              // height: Dimensions.get('window').height,
              // height: 100,
              // backgroundColor: 'red'
              backgroundColor: 'rgba(0,0,0,0.8)',
            }} />
          </TouchableWithoutFeedback>
        }
      >
        <View style={styles.container}>
          <FlatList
            data={chats}
            renderItem={({item}) => <ChatListItem {...item} onPress={() => { setActiveChat(item); hideModal(); }} />}
            keyExtractor={({id}) => id.toString()}
          />
        </View>
      </Modal>
  );
}

export default ChatListModal;