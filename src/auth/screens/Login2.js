import React, { useState } from 'react'
import { TouchableOpacity, View, TextInput, Animated, ScrollView } from 'react-native'
import { setPhoneOrEmail, login } from '../actions';
import { Button, Text, Button2 } from '../../Components'
import { connect } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { configureTransition } from '../../utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SET_PHONE_OR_EMAIL } from '../types';


const RegisterScreen = ({ navigation, register, error, setPhoneOrEmail, login }) => {
    const { colors } = useTheme();

    const styles = {
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            padding: 30,
            // justifyContent: 'center',
            // justifyContent: 'space-between',
        },
        content: {
          // flex: 1,
            // justifyContent: 'flex-start',
            // justifyContent: 'space-between',
            // alignItems: 'center',
            // backgroundColor: 'blue',
            width: '100%',
        },
        heading: {
            fontSize: 30,
            // fontWeight: 'bold'
        },
        error: {
            // backgroundColor: 'blue',
            color: 'red',
            fontSize: 16,
            // marginTop: 10
        },
        input: {
            width: '100%',
        //   height: 50,
        //   width: 350,
          // alignSelf: 'stretch',
        //   backgroundColor: '#eee',
        //   marginTop: 30,
        marginVertical: 10,
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#ebf0fc',
        backgroundColor: colors.background,
      },
      phoneInput: {
        width: '100%',
        // marginVertical: 10,
        borderRadius: 5,
        // padding: 10,
        backgroundColor: '#ebf0fc',
        backgroundColor: colors.background,

      },
      link: {
        // fontWeight: 'bold',
        color: colors.primary,
      },
      legal: {
        flexWrap: 'wrap', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center' 
      },
      tabs: {
          flexDirection: 'row',
          marginVertical: 20,
      },
      tab: {
        //   paddingHorizontal: 40,
          paddingVertical: 10,
          borderBottomWidth: 1,
          width: '50%',
          textAlign: 'center',
        //   borderBottomColor: activeTab === 'email' ? colors.text : colors.border2,
      },
      phoneView: {
        //   flex: 1,
          width: '100%',
        //   justifyContent: 'flex-start',
        //   alignItems: 'center',
        // backgroundColor: 'red',
      },
      phoneRow: {
          flexDirection: 'row',
        //   alignItems: 'center',
        // //   justifyContent: 'stretch',
        //   borderBottomWidth: 1,
        //   borderColor: colors.text3,
        //   paddingVertical: 10,
        //   width: '100%',



          width: '100%',
        //   height: 50,
        //   width: 350,
          // alignSelf: 'stretch',
        //   backgroundColor: '#eee',
        //   marginTop: 30,
        // marginVertical: 10,
        borderRadius: 5,
        // padding: 10,
        backgroundColor: '#ebf0fc',
        backgroundColor: colors.background,
        marginVertical: 10,
        marginBottom: 30,

      },
      countryInput: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingLeft: 20,
      },
      phonePrivacy: {
        color: colors.text,
      },
      forgotPasswordText: {
        color: colors.text2,
        // color: colors.primary,
        fontWeight: 'bold',
        marginVertical: 20,
        // backgroundColor: 'red',
        textAlign: 'center',
      },
      or: {
        textAlign: 'center',
        marginVertical: 20,
      }
    };

    // const [name, setName] = useState('David Enam');
    const [email, setEmail] = useState('s1@gmail.com');
    const [password, setPassword] = useState('executive');

    // const [name, setName] = useState('');


    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const [activeTab, setActiveTab] = useState('email');
    const [submitting, setSubmitting] = useState(false);
    const [translateValue, setTranslateValue] = useState(new Animated.Value(0));
    const [phone, setPhone] = useState('');

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerTitleAlign: 'center',
          title: 'Log in to K2',         
        });
    });

    // const onSubmit = async () => {
    //     setSubmitting(true);

    //     try {
    //         const success = await register({ name, email, password });
            
    //     }
    //     catch (err) {
    //         // setError(err.message);
            
    //     }

    //     setSubmitting(false);
    // }

    const onSubmitPhone = async () => {
      setPhoneOrEmail(phone);
      navigation.navigate('OtpVerification');
    }

    const onSubmitEmail = async () => {
        setSubmitting(true);
        
        try {

            const success = await login({ email, password });
            
            // console.log('loginsucess', success);
            // if (success) await getUser();
        }
        catch (err) {
            // setError(err.message);
            
            
        }

        setSubmitting(false);
    }

    // const animateSlider = () => {
    //     Animated.spring(translateValue, {
    //         toValue: 200,
    //         velocity: 10,
    //         useNativeDriver: true,
    //     }).start();
    // }

    const handlePressPhoneTab = () => {
        // animateSlider();
        setActiveTab('phone');
    }

    const phoneTab = activeTab === 'phone' ? {borderColor:colors.text} : {borderColor:colors.border2};
    const emailTab = activeTab === 'email' ? {borderColor:colors.text} : {borderColor:colors.border2};
    // const emailTab = true ? {borderColor:colors.text} : {borderColor:colors.border2};

    
    
    return (
        <View style={styles.container}>
            {/* <Text style={styles.heading}>Create an account</Text> */}
            <View style={styles.tabs}>
                <Text style={[styles.tab, phoneTab]} onPress={handlePressPhoneTab}>Phone</Text>
                <Text style={[styles.tab, emailTab]} onPress={() => setActiveTab('email')}>Email</Text>
            </View>

            {activeTab === 'phone' && (
                <View style={styles.phoneView}>
                    <View style={styles.phoneRow}>
                        <TouchableOpacity style={styles.countryInput}>
                            <Text>IT +39 </Text>
                            {/* <MaterialCommunityIcons name='menu-down' size={25} color={colors.text} /> */}
                        </TouchableOpacity>
                        <TextInput
                            style={styles.phoneInput}
                            value={phone}
                            onChangeText={setPhone}
                            placeholder='Phone number'
                            placeholderTextColor={colors.text3}
                            // autoFocus={true}
                            keyboardType='numeric'                            
                        />
                    </View>
                    <Text style={styles.phonePrivacy}>Your phone number is never shown publicly</Text>
                    <Button2 title='Send code' onPress={onSubmitPhone} disabled={!phone} />
                </View>
            )}
            
            {activeTab === 'email' && (
                <View style={styles.content}>
                    {/* <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        value={name}
                        placeholder='Full name'
                        placeholderTextColor={colors.text3}
                        // autoFocus={true}
                    /> */}
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        keyboardType='email-address'
                        placeholder='Email'
                        placeholderTextColor={colors.text3}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry
                        placeholder='Password'
                        placeholderTextColor={colors.text3}
                    />


                    <Text style={styles.error}>{error}</Text>

                    <Button2 title='Log in' onPress={onSubmitEmail} disabled={!email && !password} 
                    // loading={submitting} 
                    />
                    {/* <Button2 type='clear' title='Forgot password?' onPress={() => {}} /> */}
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                      <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>
            )}

            
                  <Text style={styles.or}>OR</Text>
                    {/* <Button2 type='outline' title='Create an account' onPress={() => navigation.navigate('Birthday')} /> */}
                    <Button2 type='outline' title='Create an account' onPress={() => navigation.navigate('Register')} />
                    

            

            {/* <View style={styles.footer}>
              <View style={styles.legal}>
                  <Text>Don't have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.link}>Sign up</Text>
                  </TouchableOpacity>
              </View>
            </View> */}

        </View>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error
  })
  
export default connect(
  mapStateToProps,
  { login, setPhoneOrEmail }
)(RegisterScreen);

