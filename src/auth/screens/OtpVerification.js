import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import RNOtpVerify from 'react-native-otp-verify';
import {Countdown, Text} from '../../Components';
import { connect } from 'react-redux';


const RESEND_OTP_TIME_LIMIT = 30;
const OTP_LENGTH = 4;
// const otpLength = Array.apply(null, Array(4));
const otpLength = Array.from(Array(4).keys());

const OtpVerification = ({ navigation, phoneOrEmail }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    digit: {
      // backgroundColor: colors.primary,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
      margin: 10,
      textAlign: 'center',
    },
    otpArray: {
      flexDirection: 'row',
      marginVertical: 30,
    },
    prompt: {
      textAlign: 'center',
    },
    resendBtn: {
      flexDirection: 'row',
      // backgroundColor: 'red',
      padding: 20,
    },
    resend: {
      // color: 'red',
      color: colors.text,
    }
  };



  const [attempts, setAttempts] = React.useState(3);
  const [otp, setOtp] = React.useState(['', '', '', '']);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [otpValue, setOtpValue] = React.useState('');
  const [otpArray, setOtpArray] = React.useState(otpLength.map(() => ''));

  const [resendTimer, setResendTimer] = React.useState(60);

  const inputRefs = {};

  
  otpLength.forEach((_, index) => inputRefs[`inputRef${index}`] = React.useRef(null));

  

  
  const onChangeOtp = (value, index) => {
    // if (!value || isNaN(Number(value))) return;

    setOtpArray([
      ...otpArray.slice(0, index),
      value,
      ...otpArray.slice(index + 1)
    ]);

    // const inputRef = `inputRef${index}`;
    // this[`inputRef${index + 1}`].current.focus();
    // 
    // 
    // 
    // 
    // 
    // if (value && index >= OTP_LENGTH - 1) return;
    // if (!value && index === 0) return;

    if (value && index < OTP_LENGTH - 1) {
      inputRefs[`inputRef${index + 1}`].current.focus();
    }
    // else if (!value && index > 0) {
    //   inputRefs[`inputRef${index - 1}`].current.focus();
    // }
    // if (index < OTP_LENGTH - 1) {
    //   inputRefs[`inputRef${index + 1}`].current.focus();
    // }
  }
   
  // this.nputRef = React.useRef(null);
  // this.inputRef1 = React.useRef(null);
  // this.inputRef2 = React.useRef(null);
  // this.inputRef3 = React.useRef(null);
  // this.inputRef4 = React.useRef(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      title: 'OTP verification',         
    });
});


  React.useEffect(() => {

    const listen = async () => {
      const p = await RNOtpVerify.getOtp();
      

      RNOtpVerify.addListener((message) => {
        try {
          const otp = /(\d{4})/g.exec(message)[1];
          setOtpValue(otp);
          
          
        }
        catch (err) {
          
        }
      })
    }

    return () => {
      RNOtpVerify.removeListener();
    }
  }, []);

  

  const getHash = async () => {
    try {
      const hash = await RNOtpVerify.getOtp();

      
      
                // 1091 is your OTP for verification. (Remaining Time: 10 minutes and 0 seconds)
                //   ${hash[0]}`);
    }
    catch (err) {
      
    }
  }


  return (
    <View style={styles.container}>
      {/* <Text>OTP Verification</Text> */}
      <Text style={styles.prompt}>Enter the 6-digit verification code that was just sent to {phoneOrEmail}</Text>
      <TouchableOpacity>
        <Text>Wrong number?</Text>
      </TouchableOpacity>
      
      <View style={styles.otpArray}>
        {otpArray.map((digit, index) => {
          return (
            <TextInput
              style={styles.digit}
              key={index}
              value={digit}
              onChangeText={(value) => onChangeOtp(value, index)}
              keyboardType='numeric'
              maxLength={1}
              autoFocus={index === 0}
              blurOnSubmit={false}
              ref={inputRefs[`inputRef${index}`]}
            />
          );
        })}
      </View>

      <TouchableOpacity style={styles.resendBtn}>
        <Text style={styles.resend}>Resend Code </Text>
        <Countdown seconds={20} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.resendBtn}>
        <Text style={styles.resend}>Call me</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resendBtn}>
        <Text style={styles.resend}>Log in with password</Text>
      </TouchableOpacity>

    </View>
  )
}

const mapStateToProps = state => ({
  phoneOrEmail: state.auth.phoneOrEmail,
})

export default connect(
  mapStateToProps,
  // { register }
)(OtpVerification);

