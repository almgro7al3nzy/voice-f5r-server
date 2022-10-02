import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Modal from 'react-native-modal';
import VoiceChatItem from '../../chats/components/VoiceChatItem';
import { SafeAreaView } from 'react-native-safe-area-context';
// import changeNavigationBarColor from 'react-native-navigation-bar-color';


const VoiceChatModal = ({ isVisible, hideModal, room }) => {
  const { colors } = useTheme();

  const styles = {
    container: {

    },    
  };

  // changeNavigationBarColor('#ffffff', true, true);

  return (
    <Modal 
        isVisible={isVisible}        
        onBackdropPress={hideModal}
        onBackButtonPress={hideModal}
        // backdropOpacity={0.5}
        
        // backdropColor='#ee535d'
        // transparent={false}

        statusBarTranslucent        

        // coverScreen={false}
        // deviceHeight={Dimensions.get('screen').height}

        // avoidKeyboard={false}        
        style={{
          justifyContent: 'flex-end',
          margin: 0, 
          borderRadius: 10,

          // backgroundColor: 'red'   ,
          // backgroundColor: colors.darkBackground,
          // flex: 1,

          // height: Dimensions.get('window').height + StatusBar.currentHeight,
          // position: 'absolute',
        }}
        useNativeDriverForBackdrop={true}
        useNativeDriver={true}
        animationInTiming={500}
      >
        <SafeAreaView>
          <VoiceChatItem {...room} />
        </SafeAreaView>
      </Modal>
  );
}

export default VoiceChatModal;