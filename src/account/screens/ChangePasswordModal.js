
import React from 'react';
import { View, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Button2, Header, Text } from '../../Components';


const ChangePasswordModal = ({ isVisible, hideModal }) => {
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
      // paddingVertical: 5,
      paddingBottom: 5,
      // marginVertical: 10,
      marginBottom: 10,
    }
  };

  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [newPassword2, setNewPassword2] = React.useState('');  

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
        <Header leftButton={{ icon: 'close', onPress: hideModal }} middleButton={{ text: 'Change Password' }} />
        <View style={styles.container}>
          <Text>Current Password</Text>
          <TextInput
            style={styles.input}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholderTextColor={colors.text3}
            placeholder='Current Password'
            maxLength={255}
            secureTextEntry={true}
          />
          <Text>New Password</Text>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholderTextColor={colors.text3}
            placeholder='New Password'
            maxLength={255}
            secureTextEntry={true}
          />
          <Text>Confirm New Password</Text>
          <TextInput
            style={styles.input}
            value={newPassword2}
            onChangeText={setNewPassword2}
            placeholderTextColor={colors.text3}
            placeholder='Confirm New Password'
            maxLength={255}
            secureTextEntry={true}
          />
          {/* <Text>We'll send you a code to verify your email address</Text> */}
          <Button2 style={{ marginVertical: 30 }} title='Change Password' disabled={!currentPassword || !newPassword || !newPassword2} />
        </View>
      </Modal>
  )
}

export default ChangePasswordModal;