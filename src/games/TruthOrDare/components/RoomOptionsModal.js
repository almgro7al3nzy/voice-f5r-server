import React from 'react';
import { View, TouchableNativeFeedback, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Modal from 'react-native-modal';




const RoomOptionsModal = () => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // width: 
      // alignSelf: 'center',
      backgroundColor: colors.card,
      borderRadius: 20,
    },
    title: {
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingVertical: 5,
    },
    titleText: {
      color: colors.primary,
    },
    content: {
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentText: {
      fontSize: 24,
      color: colors.text2
    },
    actions: {
      flexDirection: 'row',
      backgroundColor: colors.primary,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      paddingVertical: 10,
    },
    btn: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: colors.primary,
    },
    btnText: {
      color: colors.textInverse,
    },
  };

  const inviteUser = () => {

  }

  return (
    <Modal 
      isVisible={isVisible}
      animationIn='zoomIn'
      animationOut='zoomOut'
      transi
      onBackButtonPress={hideModal}
      onBackdropPress={hideModal}
      backdropOpacity={0.5}
      statusBarTranslucent
      deviceHeight={Dimensions.get('screen').height}
      style={{
        // justifyContent: 'flex-end',
        // margin: 0,          
        padding: 0,
      }}
      useNativeDriverForBackdrop={true}
      // useNativeDriver={true}
      swipeDirection='down'
      onSwipeComplete={hideModal}
      animationInTiming={500}
        // swipeThreshold={400}
    >
      <View style={styles.container}>
        <TouchableNativeFeedback onPress={inviteUser}>
          <Text>Invite to party</Text>
        </TouchableNativeFeedback>
      </View>
    </Modal>
  )
}

export default RoomOptionsModal;