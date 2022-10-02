import React from 'react';
import { View, TouchableHighlight, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '../../Components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import googleIcon from '../images/googleIcon.png';

const Welcome = ({ route, navigation, user, token }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.card,
      // justifyContent: 'center',
      justifyContent: 'space-between',
      // justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 30,
    },
    header: {
      alignItems: 'center',
      marginTop: 120,
      marginTop: 0,
    },
    logo: {
      fontSize: 54,
      fontFamily: 'Rowdies-Bold',
      color: colors.primary,

      // borderWidth: 5,
      // // borderWidth: 1,
      // textAlign: 'center',
      // borderColor: colors.primary,
      // borderRadius: 10,
      // paddingHorizontal: 10,
      // paddingTop: 5,
      // paddingVertical: 0,
      // marginVertical: 0,
    },
    headline: {
      color: colors.text2,
      fontSize: 18,
      // width: '50%',
      paddingHorizontal: 30,
      textAlign: 'center',
    },
    link: {
      // fontWeight: 'bold',
      color: colors.primary,
    },
    legal: {
      flexWrap: 'wrap', 
      flexDirection: 'row', 
      justifyContent: 'center', 
      alignItems: 'center',

      // backgroundColor: 'blue',
    },
    footer: {
      // backgroundColor: 'green',
      backgroundColor: colors.background,
      // borderTopWidth: 1,
      width: '100%',
      // height: 60,
      paddingVertical: 20,
    },
    text: {
      // fontSize: 1,
      color: colors.text,
    }
    // socialRow: {
    //   flexDirection: 'row',
    // },
    // socialIcon: {
    //   fontSize: 28,
    //   borderWidth: 1,
    //   borderColor: colors.text,
    //   borderRadius: 10,
    //   padding: 10,
    // },
    // button: {
    //   borderWidth: 1,
    //   borderColor: colors.text,
    //   borderRadius: 10,
    //   padding: 10,
    //   padding: 10,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   // width: '100%',
    // }
  };

  // 


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Outland</Text>
        <Text style={styles.headline}>
          Discover and connect with the world
        </Text>
      </View>

      <View>        
        <Button 
          icon='account-circle-outline' 
          text="No account"
          onPress={() => navigation.navigate('LoginTemp')}
        />
        <Button 
          icon='account-circle-outline' 
          text='Continue with phone or email'
          onPress={() => navigation.navigate('Login2')}
        />
        {/* <Button 
          icon='account-circle-outline' 
          text='Sign up with phone or email'
          onPress={() => navigation.navigate('Register')}
        />
        <Button 
          icon='email-outline' 
          text='Log in with phone or email'
          onPress={() => navigation.navigate('Login')}
        /> */}
        <Button 
          style={{ color: '#1778F2' }}
          icon='facebook' 
          text='Continue with Facebook'
          onPress={() => navigation.navigate('Register')}
        />
        <Button 
          // style={{ backgroundColor: 'conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg) 73% 55%/150% 150% no-repeat',   color: 'transparent' }}
          style={{ 
            // color: '#EA4335', 
            color: '#FFFFFF',
          backgroundColor: '#EA4335' ,
          borderRadius: 20,
          padding: 3,
          marginLeft: 3,
          fontSize: 16,
        }}
          icon='google' 
          text='Continue with Google'
          onPress={() => navigation.navigate('Register')}
        />
      </View>

      <View style={styles.legal}>
        <Text style={styles.text}>By continuing, you accept our </Text>
        <TouchableOpacity>
          <Text style={styles.link}>Terms of Service</Text>
        </TouchableOpacity>
        <Text style={styles.text}> and </Text>
        <TouchableOpacity>
          <Text style={styles.link}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.footer}>
        <View style={styles.legal}>
          <Text style={styles.text}>Have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  )
}



const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token,
})

export default connect(
  mapStateToProps,
  null
)(Welcome);





const Button = ({ text, icon, onPress, style, ...rest }) => {
  const { colors } = useTheme();

  const styles = {
    button: {
      // flex: 1,
      // width: '100%',
      // width: 300,
      flexDirection: 'row',
      alignItems: 'center',

      // backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border2,

      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginVertical: 5,
      // flexGrow: 1,
      // justifyContent: 'space-between',
      // alignSelf: 'center',
    },
    icon: {
      fontSize: 28,
      marginRight: 10,
      // backgroundColor: 'green',
      color: colors.text,
      // borderRadius: 20,
      // padding: 5,
      // padding: 0,
    },
    text: {
      fontSize: 16,
      color: colors.text,
      textAlign: 'center',
    },
    googleIcon: {
      borderWidth: 0,
      elevation: 0,
      width: 20,
      height: 20,
      // padding: 0,
      // padding: 50,
      marginHorizontal: 5,
      
      // backgroundColor: 'transparent',
    },
    gIcon: {
      width: 24,
      height: 24,
    },
  };

  

  return (
    <TouchableHighlight 
    // style={{ alignItems: 'center' }} 
    // style={{ borderRadius: 10 }} 
    underlayColor={colors.background} onPress={onPress} {...rest}>
      <View style={styles.button}>
        {icon !== 'google' && <MaterialCommunityIcons name={icon} style={[styles.icon, style]} />}
        {icon === 'google' && (
          <GoogleSigninButton 
            style={styles.googleIcon} 
            size={GoogleSigninButton.Size.Icon} 
            color={GoogleSigninButton.Color.Light}
            onPress={() => {}} 
          />
        )}
        {/* {icon === 'google' && <Image source={googleIcon} style={styles.gIcon} />} */}
        <View 
        style={{ flexGrow: 1,  }}
        >
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}




