import React from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Text } from '../../../Components';
import { useNavigation } from '@react-navigation/native';


const QuitModal = ({ isVisible, hideModal, navigate, onMinimize }) => {
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

  // 

  const navigation = useNavigation();

  const content = 'Quit?'
  const actions = [
    { text: 'Return To Game',onPress: () => navigate('People', { screen: 'Contacts' } ) }, 
    { text: 'Minimize Game', onPress: onMinimize },
    { text: 'Leave Game', onPress: () => navigation.navigate('Home') },
  ]

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
      {/* <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
      </View> */}

      <View style={styles.content}>
        <Text style={styles.contentText}>{content}</Text>
      </View>

      <View style={styles.actions}>
        {actions.map((action, index) => {
          return (
            <TouchableOpacity key={index} style={styles.btn} onPress={action.onPress}>
              <Text style={styles.btnText}>{action.text}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
    </Modal>
  )
}

export default QuitModal;