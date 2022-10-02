import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TextInput, Text as DefaultText } from 'react-native'
// import LoginForm from '../forms/LoginForm';
// import { SafeAreaView, StatusBar, Platform } from 'react-native';
import { login, clearError } from '../actions';
import { Text, StatusBar, Button } from '../../Components';
import { connect } from 'react-redux';
import FacebookLogin from './/FacebookLogin';
import { useTheme } from '@react-navigation/native';
import GoogleLogin from './GoogleLogin';
import PushNotification from "react-native-push-notification";


const LoginScreen = ({ navigation, login, error, clearError }) => {
    const { colors } = useTheme();

    const styles = {
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        content: {
            // flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        heading: {
            fontSize: 52,
            fontFamily: 'BungeeInline',
            color: colors.primary,
        },
        error: {
            color: 'red',
            fontSize: 16,
            marginTop: 10
        },
        input: {
          height: 50,
          width: 300,
          // alignSelf: 'stretch',
          backgroundColor: '#eee',
          marginTop: 10,
          borderRadius: 15,
          padding: 10,
          backgroundColor: '#ebf0fc'
      },
    };

    const [email, setEmail] = useState('s3@gmail.com');
    const [password, setPassword] = useState('executive');
    // const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    
    useEffect(() => {        
        const unsubscribe = navigation.addListener('blur', () => {
            clearError();
        });

        return unsubscribe;
    }, [navigation]);

    const localNotification = () => {
        PushNotification.localNotification({
          autoCancel: true,
          bigText:
            'This is local notification demo in React Native app. Only shown, when expanded.',
          subText: 'Local Notification Demo',
          title: 'Local Notification Title',
          message: 'Expand me to see more',
          vibrate: true,
          vibration: 300,
          playSound: true,
          soundName: 'default',
          actions: '["Yes", "No"]'
        })
      }
    

    const onSubmit = async () => {
        setSubmitting(true);
        

        try {

            const success = await login({ email, password });
            

            // if (success) await getUser();
        }
        catch (err) {
            // setError(err.message);
            
            
        }

        // setSubmitting(false);
    }

    const disabled = !(email && password);
    
    
    return (
        <View style={styles.container}>
            <StatusBar />
            <DefaultText style={styles.heading}>K2</DefaultText>
            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    keyboardType='email-address'
                    placeholder='E-mail'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry
                    placeholder='Password'
                />
                <Text style={styles.error}>{error}</Text>
                <Button disabled={disabled} type={1} onPress={onSubmit}>
                    Log In
                </Button>
                
                
            </View>
            <Button type={3} onPress={localNotification}>
                Forgot Password?
            </Button>
            <Button type={2} onPress={() => navigation.navigate('Register')}>
                Create an Account
            </Button>

            <GoogleLogin />

            <FacebookLogin />
        </View>
    );
};

const mapStateToProps = state => ({
    error: state.auth.error
  })
  
  export default connect(
    mapStateToProps,
    { login, clearError }
    // { logout, loadUser, setCurrentUser, updateLocation }
  )(LoginScreen);
  

  