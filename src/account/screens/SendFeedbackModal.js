import React from 'react';
import { View, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import ModalContainer from '../components/ModalContainer';
import { Button2, Header, Text } from '../../Components';


const ChangeNameModal = ({ isVisible, hideModal, name }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // flex: 1,
      // backgroundColor: colors.card,
      // padding: 25,
    },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border2,
      paddingVertical: 15,
    }
  };

  const [text, setText] = React.useState('');

  return (
    <ModalContainer isVisible={isVisible} hideModal={hideModal} title='Send Feedback'>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        multiline={true}
        placeholder="Tell us what you think about our service, what you would like us to improve or what's not working"
        placeholderTextColor={colors.text3}
      />
      {/* <Text>Tell us what you think about our service, what you would like us to improve or what's not working</Text> */}

      <Button2 style={{ marginVertical: 30 }} title='Submit' disabled={!text} />
    </ModalContainer>
  )
}

export default ChangeNameModal;