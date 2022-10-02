import React from 'react';
import { View, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Text from './Text';
import { SafeAreaView } from 'react-native-safe-area-context';

const BottomModal = ({ title, children }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      backgroundColor: colors.card,
      // backgroundColor: colors.border,
      // backgroundColor: colors.background,

      // backgroundColor: 'blue',
      // padding: 3,
      paddingTop: 10,
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
      justifyContent: 'flex-end',
      margin: 0,

      // marginBottom: (Dimensions.get('screen').height - Dimensions.get('window').height) / 2

      // marginBottom:
      // Dimensions.get('screen').height

      // flex: 1,
    },
    handle: {
      width: 50,
      height: 5,
      backgroundColor: colors.border2,
      borderRadius: 20,
      alignSelf: 'center',
      marginVertical: 10,
    },
    title: {
      color: colors.text,
      fontSize: 18,
      fontWeight: 'bold',
      marginHorizontal: 10,
      marginVertical: 10,
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.handle}></View> */}
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </SafeAreaView>
  )
}

export default BottomModal;