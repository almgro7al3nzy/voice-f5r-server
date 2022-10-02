import React from 'react';
import { View, Switch, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ListHeader, ListItem } from '../../Components';
import { capitalize } from '../../utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { setTheme } from '../actions';
import { logout } from '../../auth/actions';
import { connect } from 'react-redux';


const Settings = ({ navigation, user, setTheme, logout }) => {
  const { colors, dark } = useTheme();

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.card,
    }
  };

  



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
      {/* {Array.apply(null, Array(8)).map((_, index) =>  */}
      {Array.from(Array(8).keys()).map((_, index) =>
        <MaterialCommunityIcons key={index} name='circle' style={{ fontSize: 10, color: colors.text3, marginHorizontal: 1 }} /> 
      )}      
    </View>
  );

  return (
        <ScrollView style={styles.container}>
          <View style={styles.group}>
            <ListHeader title='ACCOUNT' />
            <ListItem title='Name' icon='account-box-outline' right={user && user.name} onPress={() => setChangeNameVisible(true)} />
            <ListItem title='Email'  icon='at' right={user.email} onPress={() => setChangeEmailVisible(true)} />
            <ListItem title='Password' icon='lock-outline' right={password} onPress={() => setChangePasswordVisible(true)} />
            <ListItem title='Phone' icon='cellphone' right={'+393318181071'} />              
            <ListItem title='Birthday' icon='cake' right={'14/01/1998'} />
            {user.gender && <ListItem title='Gender' icon={`gender-${user.gender}`} right={capitalize(user.gender)} />}
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
            <ListItem title='Direct messages' icon='chatbox-outline' ionicons right={'Friends'} ionicons onPress={() => setPushNotificationsVisible(true)} />
            <ListItem title='Game invites' icon='gamepad-variant-outline' right={'Friends'} onPress={() => setPushNotificationsVisible(true)} />
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

  )
}


const mapStateToProps = state => ({
  user: state.auth.user,
  error: state.auth.error
})

export default connect(
  mapStateToProps,
  { setTheme, logout }
)(Settings);