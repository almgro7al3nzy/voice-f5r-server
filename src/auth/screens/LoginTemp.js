import React, { useState } from 'react'
import { TouchableOpacity, View, TextInput, Animated, ScrollView } from 'react-native'
import { register } from '../actions';
import { Button, Text, Button2 } from '../../Components'
import { connect } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { configureTransition } from '../../utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RegisterScreen = ({ navigation, register, error }) => {
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
            // justifyContent: 'flex-start',
            // justifyContent: 'space-between',
            // alignItems: 'center',
            flex: 1,
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
            marginTop: 10
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
        marginVertical: 10,
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
      passwordGuide: {
        color: colors.text,
      },
      infoIcon: {
        color: colors.text,
        fontSize: 18,
        marginRight: 3,
      },
      row: {
        flexDirection: 'row'
      },
    };

    // const [name, setName] = useState('David Enam');
    // const [email, setEmail] = useState('s3@gmail.com');
    // const [password, setPassword] = useState('executive');

    const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    // const [activeTab, setActiveTab] = useState('email');
    // const [submitting, setSubmitting] = useState(false);
    // const [translateValue, setTranslateValue] = useState(new Animated.Value(0));
    // const [phone, setPhone] = useState('');

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerTitleAlign: 'center',
          title: 'New user',         
        });
    });

    const handleSubmit = async () => {
        // setSubmitting(true);

        try {
            const success = await register({ name });
            
        }
        catch (err) {
            // setError(err.message);
            console.log(err);
        }

        // setSubmitting(false);
    }

    // const animateSlider = () => {
    //     Animated.spring(translateValue, {
    //         toValue: 200,
    //         velocity: 10,
    //         useNativeDriver: true,
    //     }).start();
    // }

    // const handlePressPhoneTab = () => {
    //     // animateSlider();
    //     setActiveTab('phone');
    // }

    // const phoneTab = activeTab === 'phone' ? {borderColor:colors.text} : {borderColor:colors.border2};
    // const emailTab = activeTab === 'email' ? {borderColor:colors.text} : {borderColor:colors.border2};
    // const emailTab = true ? {borderColor:colors.text} : {borderColor:colors.border2};

    
    
    return (
        <View style={styles.container}>
            {/* <Text style={styles.heading}>Create an account</Text> */}
            {/* <View style={styles.tabs}>
                <Text style={[styles.tab, phoneTab]} onPress={handlePressPhoneTab}>Phone</Text>
                <Text style={[styles.tab, emailTab]} onPress={() => setActiveTab('email')}>Email</Text>
            </View> */}

           
            
            {/* {activeTab === 'email' && ( */}
                <View style={styles.content}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        value={name}
                        placeholder='Name'
                        placeholderTextColor={colors.text3}
                        // autoFocus={true}
                    />
                    {/* <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        keyboardType='email-address'
                        placeholder='Email address'
                        placeholderTextColor={colors.text3}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry
                        placeholder='New password'
                        placeholderTextColor={colors.text3}
                    />
                    <View style={styles.row}>
                      <Ionicons name='information-circle-outline' style={styles.infoIcon} />
                      <Text style={styles.passwordGuide}>Your password must have at least 8 characters</Text>
                    </View>
                    <Text style={styles.error}>{error}</Text> */}
                    {/* <Button type={1} onPress={onSubmit}>
                        Sign Up
                    </Button> */}
                    <Button2 style={{ marginVertical: 20, }} title='Continue' onPress={handleSubmit} disabled={!name} />
                </View>
            {/* )} */}

            {/* <View style={styles.legal}>
                <Text>Have an account? </Text>
                <TouchableOpacity>
                <Text style={styles.link}>Log in</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error
  })
  
  export default connect(
    mapStateToProps,
    { register }
  )(RegisterScreen);

