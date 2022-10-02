import React from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const TextField = ({ ...rest }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // flex: 1,
      marginTop: 150,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      // backgroundColor: 'green',
      position: 'absolute',
      bottom: 0,
    },
    input: {
      // backgroundColor: 'translucent',
      paddingHorizontal: 20,
      height: 50,
      color: colors.textInverse,
      fontSize: 18,
      borderRightWidth: 25,
      borderRightColor: colors.translucent,
      borderRightColor: 'transparent',
      borderTopWidth: 50,
      borderTopColor: colors.card,
      borderTopColor: 'transparent',
      width: '75%',
    },
    button: {
      width: 100,
      width: '25%',
      height: 0,
      borderBottomWidth: 50,
      borderBottomColor: !text ? colors.translucent : colors.translucent,
      borderBottomColor: 'transparent',
      borderLeftWidth: 25,
      borderLeftColor: colors.translucent,    
      borderLeftColor: 'transparent',      
      justifyContent: 'center',
    },
    chevron: {
      position: 'absolute',
      right: 10,
    }
  };

  const [text, setText] = React.useState('');

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.input}
        value={text}
        onChangeText={setText}
        // onSubmitEditing={onSubmit}
        placeholderTextColor={colors.textInverse2}
        {...rest}
      />
      <TouchableOpacity activeOpacity={0.9} style={styles.button}>
        <MaterialCommunityIcons
          name='send'
          size={25}
          color={colors.textInverse2}
          style={styles.chevron}
        />
      </TouchableOpacity>
    </View>
  );
}

export default TextField;