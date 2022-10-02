import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '../../Components';
import Modal from 'react-native-modal';


const ChooseGameModal = ({ isVisible, hideModal }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      backgroundColor: colors.card,
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={hideModal}
      onBackdropPress={hideModal}
      swipeDirection='down'
      onSwipeComplete={hideModal}
      statusBarTranslucent={true}
      style={{ margin: 0, justifyContent: 'flex-end' }}
    >
      <View style={styles.container}>
        <TouchableHighlight onPress={() => navigation.navigate('Games', { screen: 'TruthOrDare3', params: { users: chat.participants } })}>
          <Text>Truth or Dare</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => navigation.navigate('Games', { screen: 'TruthOrDare3', params: { users: chat.participants } })}>
          <Text>Party Trivia</Text>
        </TouchableHighlight>
      </View>
    </Modal>
  );
}

export default ChooseGameModal;