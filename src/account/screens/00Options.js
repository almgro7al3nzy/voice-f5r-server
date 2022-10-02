import React from 'react'
import { StyleSheet, Text, View, ScrollView, Switch } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../colors';
import { ListItem } from '../../Components';

import { setTheme } from '../actions';
import { connect } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { logout } from '../../auth/actions';
import ListHeader from '../../Components/ListHeader';

const Options = ({ theme, setTheme, logout }) => {
  const { colors } = useTheme();
  const styles = {
    container: {
      // backgroundColor: 'white'
      backgroundColor: colors.background
    }
  }

  const [dark, setDark] = React.useState(false);

  const toggleTheme = () => setDark(!dark);

  const darkMode = (
    <Switch
      trackColor={{ false: colors.border, true: colors.primary }}
      thumbColor={dark ? colors.background : colors.background}
      // ios_backgroundColor="#3e3e3e"
      onValueChange={toggleTheme}
      value={dark}
    />
  )

  return (
    <ScrollView style={styles.container}>
      <View style={styles.group}>
        <ListHeader title='ACCOUNT' />
        <ListItem title='Display Name' icon='account-box-outline' right={'David Enam'} />
        <ListItem title='Email'  icon='at' right={'no-reply@k2.com'} />
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
        <ListItem title='Light Mode' onPress={() => setTheme('light')} />
        <ListItem title='Dark Mode' onPress={() => setTheme('dark')} icon='brightness-6' right={darkMode} />
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

Options.navigationOptions = ({ navigation: { goBack } }) => ({
  title: 'Options',
  headerLeft: (
      <MaterialCommunityIcons
          name='close'
          size={24}
          style={{ color: colors.black, marginLeft: 10 }}
          onPress={goBack}
      />
  )
});

// const map

export default connect(
  state => ({ theme: state.account.theme }),
  { setTheme, logout }
)(Options);