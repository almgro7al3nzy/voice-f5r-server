import React from 'react';
import { View, Switch, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Modal from 'react-native-modal';
// import Options from './00Options';
import { useHeaderHeight } from "@react-navigation/stack";
import { Header } from '../../Components';
// import Settings from '../components/00Settings';
import ChangeNameModal from './ChangeNameModal';
import { ListHeader, ListItem } from '../../Components';
import ChangeEmailModal from './ChangeEmailModal';
import { capitalize } from '../../utils';
import ChangePasswordModal from './ChangePasswordModal';
import PushNotificationsModal from './PushNotificationsModal';
import SendFeedbackModal from './SendFeedbackModal';
import PrivacyModal from './PrivacyModal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const SettingsModal = ({ isVisible, hideModal, user, setTheme, logout }) => {
  const { colors, dark } = useTheme();

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.card,
    }
  };

  

  const [changeNameVisible, setChangeNameVisible] = React.useState(false);
  const [changeEmailVisible, setChangeEmailVisible] = React.useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = React.useState(false);  

  const [pushNotificationsVisible, setPushNotificationsVisible] = React.useState(false);
  const [sendFeedbackVisible, setSendFeedbackVisible] = React.useState(false);

  const [privacyVisible, setPrivacyVisible] = React.useState(false);

  const darkMode = (
    <Switch
      trackColor={{ false: colors.border, true: colors.primary }}
      thumbColor={dark ? colors.text : colors.background}
      // ios_backgroundColor="#3e3e3e"
      onValueChange={() => setTheme(dark ? 'light' : 'dark')}
      value={dark}
    />
  );

  const password = (
    <View style={{ flexDirection: 'row' }}>
      {Array.apply(null, Array(8)).map((_, index) => 
        <MaterialCommunityIcons key={index} name='circle' style={{ fontSize: 10, color: colors.text3, marginHorizontal: 1 }} /> 
      )}      
    </View>
  );

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
        animationInTiming={500}

        // swipeDirection='right'
        // onSwipeComplete={hideModal}
          // swipeThreshold={400}
      >
        <Header leftButton={{ icon: 'close', onPress: hideModal }} middleButton={{ text: 'Settings' }} />
        <ScrollView style={styles.container}>
          <View style={styles.group}>
            <ListHeader title='ACCOUNT' />
            <ListItem title='Name' icon='account-box-outline' right={user && user.name} onPress={() => setChangeNameVisible(true)} />
            <ListItem title='Email'  icon='at' right={user.email} onPress={() => setChangeEmailVisible(true)} />
            <ListItem title='Password' icon='lock-outline' right={password} onPress={() => setChangePasswordVisible(true)} />
            <ListItem title='Phone' icon='cellphone' right={'+393318181071'} />              
            <ListItem title='Birthday' icon='cake' right={'14/01/1998'} />
            <ListItem title='Gender' icon={`gender-${user.gender}`} right={capitalize(user.gender)} />
          </View>

          <View style={styles.group}>
            <ListHeader title='PREFERENCES' />
            {/* <ListItem title='Language' icon='web' right={'English'} /> */}
            <ListItem title='Dark Mode' icon='brightness-6' right={darkMode} />
            <ListItem title='Notifications' icon='bell-outline' onPress={() => setPushNotificationsVisible(true)} />
            {/* <ListItem title='Privacy' icon='shield-outline' onPress={() => setPrivacyVisible(true)} /> */}
            {/* <ListItem title='Email Notifications' icon='email-outline' right={darkMode} /> */}
          </View>

          <View style={styles.group}>
            <ListHeader title='PRIVACY' />
            <ListItem title='Direct messages' icon='chatbox-outline' ionicons={true} right={'Friends'} ionicons onPress={() => setPushNotificationsVisible(true)} />
            <ListItem title='Blocked accounts' icon='block-helper' right={0} onPress={() => setPrivacyVisible(true)} />
            {/* <ListItem title='Email Notifications' icon='email-outline' right={darkMode} /> */}
          </View>

          <View style={styles.group}>
            <ListHeader title='HELP & FEEDBACK' />
            {/* <ListItem title='Help Center' icon='help-circle-outline' /> */}
            {/* <ListItem title='Report a Problem' icon='alert-box-outline' /> */}
            <ListItem title='Send Feedback' icon='email-outline' onPress={() => setSendFeedbackVisible(true)} />
            
          </View>

          <View style={styles.group}>
            <ListHeader title='LEGAL' />
            <ListItem title='Terms of Service' icon='file-document-outline' />
            <ListItem title='Privacy Policy' icon='shield-half-full' />
          </View>

          <View style={styles.group}>
            <ListHeader title='ACTIONS' />
            <ListItem title='Sign Out' onPress={logout} icon='logout' />
          </View>
        </ScrollView>


        <ChangeNameModal
          isVisible={changeNameVisible}
          hideModal={() => setChangeNameVisible(false)}
          name={user.name}
        />

        <ChangeEmailModal
          isVisible={changeEmailVisible}
          hideModal={() => setChangeEmailVisible(false)}
          email={user.email}
        />

        <ChangePasswordModal
          isVisible={changePasswordVisible}
          hideModal={() => setChangePasswordVisible(false)}
        />

        <PushNotificationsModal
          isVisible={pushNotificationsVisible}
          hideModal={() => setPushNotificationsVisible(false)}
        />

        <PrivacyModal
          isVisible={privacyVisible}
          hideModal={() => setPrivacyVisible(false)}
        />

        <SendFeedbackModal
          isVisible={sendFeedbackVisible}
          hideModal={() => setSendFeedbackVisible(false)}
        />
      </Modal>
  )
}

export default SettingsModal;