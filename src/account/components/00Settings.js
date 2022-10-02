import React from 'react'
import { StyleSheet, View, ScrollView, Switch } from 'react-native'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import colors from '../../colors';

// import { setTheme } from '../actions';
// import { connect } from 'react-redux';
import { useTheme } from '@react-navigation/native';
// import { logout } from '../../auth/actions';
import { ListHeader, ListItem } from '../../Components';



const Settings = ({ user, setTheme, logout }) => {
  const { colors, dark } = useTheme();
  const styles = {
    container: {
      // backgroundColor: 'white'
      flex: 1,
      backgroundColor: colors.background
    }
  }

  // const [dark, setDark] = React.useState(false);

  // const toggleTheme = () => setDark(!dark);

  const darkMode = (
    <Switch
      trackColor={{ false: colors.border, true: colors.primary }}
      thumbColor={dark ? colors.text : colors.background}
      // ios_backgroundColor="#3e3e3e"
      onValueChange={() => setTheme(dark ? 'light' : 'dark')}
      value={dark}
    />
  )

  return (
    <ScrollView style={styles.container}>
      <View style={styles.group}>
        <ListHeader title='ACCOUNT' />
        <ListItem title='Name' icon='account-box-outline' right={user && user.name} />
        <ListItem title='Email'  icon='at' right={user.email} />
        <ListItem title='Password' icon='lock-outline' right={'Password'} />
        <ListItem title='Birthday' icon='cake' right={'14/01/1998'} />
        {/* <ListItem title='Gender' icon='lock-outline' right={'Male'} /> */}
        <ListItem title='Phone' icon='cellphone' right={'+393318181071'} />              
      </View>

      <View style={styles.group}>
        <ListHeader title='PREFERENCES' />
        <ListItem title='Language' icon='web' right={'English'} />
        <ListItem title='Push Notifications' icon='bell-outline' right={darkMode} />
        <ListItem title='Email Notifications' icon='email-outline' right={darkMode} />
        {/* <ListItem title='Light Mode' onPress={() => setTheme('light')} /> */}
        <ListItem title='Dark Mode' icon='brightness-6' right={darkMode} />
        {/* <ListItem title='Sign Out' onPress={logout} icon='logout' /> */}

      </View>

      <View style={styles.group}>
        <ListHeader title='HELP & FEEDBACK' />
        <ListItem title='Help Center' icon='help-circle-outline' />
        <ListItem title='Report a Bug' icon='exclamation-thick' />
        <ListItem title='Send Feedback' icon='email' />
        
      </View>

      <View style={styles.group}>
        <ListHeader title='LEGAL' />
        <ListItem title='Privacy Policy' icon='shield-half-full' />
        <ListItem title='Terms of Service' icon='file-document-outline' />
        {/* <ListItem title='Send Feedback' icon='email-outline' /> */}
        {/* <ListItem title='Sign Out' onPress={logout} icon='logout' /> */}
      </View>

      <View style={styles.group}>
        <ListHeader title='ACTIONS' />
        <ListItem title='Sign Out' onPress={logout} icon='logout' />
      </View>
    </ScrollView>
  );
}



export default Settings;