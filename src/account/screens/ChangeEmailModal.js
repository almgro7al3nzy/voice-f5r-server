
import React from 'react';
import { View, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { validateEmail } from '../../utils';
import { Button2, Header, Text } from '../../Components';


const ChangeEmailModal = ({ isVisible, hideModal, email }) => {
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

  const [displayEmail, setDisplayEmail] = React.useState(email);

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
        <Header leftButton={{ icon: 'close', onPress: hideModal }} middleButton={{ text: 'Email address' }} rightButton={{ icon: 'check' }} />
        <View style={styles.container}>
          {/* <Text>Email</Text> */}
          <TextInput
            style={styles.input}
            value={displayEmail}
            onChangeText={setDisplayEmail}
            placeholderTextColor={colors.text3}
            placeholder='Email address'
            maxLength={255}
            autoCompleteType='email'
            keyboardType='email-address'
            textContentType='emailAddress'
          />
          {/* <Text>We'll send you a code to verify your email address</Text> */}
          <Button2 style={{ marginVertical: 30 }} title='Send code' disabled={!validateEmail(displayEmail)} />
        </View>
      </Modal>
  )
}

export default ChangeEmailModal;