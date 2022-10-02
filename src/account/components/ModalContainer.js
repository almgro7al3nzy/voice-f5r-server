import React from 'react';
import { View, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Header, Text } from '../../Components';


const ChangeNameModal = ({ isVisible, hideModal, title, children }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.card,
      padding: 25,
    },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border2,
      // backgroundColor: colors.background,
      // paddingHorizontal: 0,
      paddingVertical: 5,
    }
  };


  return (
    <Modal 
        isVisible={isVisible}
        onBackButtonPress={hideModal}
        // onBackdropPress={hideModal}
        backdropOpacity={0.5}
        statusBarTranslucent
        style={{
          justifyContent: 'flex-end',
          margin: 0,          
        }}

        animationIn='slideInRight'
        animationOut='slideOutRight'
        // useNativeDriver={true}
        swipeDirection='right'
        onSwipeComplete={hideModal}
        animationInTiming={500}
          // swipeThreshold={400}
      >
        <Header leftButton={{ icon: 'close', onPress: hideModal }} middleButton={{ text: title }} />
        <View style={styles.container}>
          {children}
        </View>
      </Modal>
  )
}

export default ChangeNameModal;