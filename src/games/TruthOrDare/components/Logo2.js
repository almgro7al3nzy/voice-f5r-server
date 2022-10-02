import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

const Logo = () => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: 'transparent',
      width: '100%',
      width: 200,
      height: 200,
      // borderRadius: 200 / 2,
      borderRadius: 100,
    },
    topText: {
      color: 'white',
      color: colors.lightTranslucent,
      // color: colors.text,
      fontSize: 52,
      fontWeight: 'bold',
    },
    top: {
      // backgroundColor: 'red',
      // backgroundColor: colors.background,
      // backgroundColor: 'lightgrey',
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      display: 'flex',
      width: '100%',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      // backgroundColor: 'rgba(255,255,255,0.05)',
      // backgroundColor: colors.lightTranslucent,
      // justifyContent: 'flex-start',
      // alignItems: 'center',
      // width: '100%',
      // alignSelf: 'stretch',
      // flexGrow: 1,
    },
    middle: {

      position: 'absolute',
      zIndex: 1,
    },
    middleText: {
      fontSize: 18,
      color: 'white',
      color: colors.lightTranslucent,
      // color: colors.text2,
    },
    bottomText: {

      color: 'white',
      color: colors.lightText,
      color: colors.lightTranslucent,
      fontSize: 52,
      fontWeight: 'bold',
    },
    bottom: {
      // backgroundColor: 'blue',
      // backgroundColor: colors.background,
      // backgroundColor: 'darkgrey',
      // backgroundColor: 'rgba(0,0,0,0.05)',
      // backgroundColor: colors.darkTranslucent,
      flex: 1,
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    }
  };

  // return (
  //   <View style={styles.container}>
  //       <Text style={styles.topText}>Truth</Text>
  //       <Text style={styles.middleText}>Or</Text>
  //       <Text style={styles.bottomText}>Dare</Text>
  //       {/* <Text style={{ display: ''}} */}
  //   </View>
  // )
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.topText}>Truth</Text>
      </View>

      <View style={styles.middle}>
        <Text style={styles.middleText}>Or</Text>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.bottomText}>Dare</Text>
        {/* <Text style={{ borderBottomLeftRadius}} */}
      </View>
    </View>
  );
}

export default Logo;