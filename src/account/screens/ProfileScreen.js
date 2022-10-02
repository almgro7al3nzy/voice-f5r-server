import React, { useLayoutEffect } from 'react'
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Linking } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../colors';
import { Button } from '../../Components';
import ContactThumbnail from '../components/ContactThumbnail';
import { connect } from 'react-redux';

const ProfileScreen = ({ navigation, user, error }) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Me',
      headerTintColor: 'white',
      headerStyle: {
          backgroundColor: colors.blue
      },
      headerRight: () => (
          <MaterialCommunityIcons
              name='cog'
              size={24}
              style={{ color: 'white', marginRight: 10 }}
              onPress={() => navigation.navigate('Options')}
          />
      )
    });
  }, [navigation])

  const renderUser = () => {
    const { avatar, name, phone } = user;

    return (
      <ContactThumbnail
        avatar={avatar}
        name={name}
        phone={phone}
      />
    );
  }

  const renderError = () => (
    <View>
      <Text>{error}</Text>
      <Button type={3} text='Reload' />
    </View>
  )

  return (
    <View style={styles.container}>
      {user ? renderUser() : error ? renderError() : (
        <ActivityIndicator size='large' color={colors.brand} />
      )}
    </View>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  error: state.auth.error
})

export default connect(
  mapStateToProps,
  // { getUser, clearToken, setTheme }
)(ProfileScreen);


// ProfileScreen.navigationOptions = ({ navigation: { navigate } }) => ({
//   title: 'Me',
//   headerTintColor: 'white',
//   headerStyle: {
//       backgroundColor: colors.blue
//   },
//   headerRight: () => (
//       <MaterialCommunityIcons
//           name='settings'
//           size={24}
//           style={{ color: 'white', marginRight: 10 }}
//           onPress={() => navigate('Options')}
//       />
//   )
// });

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.blue
  }
});