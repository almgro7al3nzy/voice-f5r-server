import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react'
import { View, Picker, TouchableOpacity, TextInput } from 'react-native'
import { Text } from '../../Components';


const CreateChat = ({ route, navigation }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.card
    },
    btn: {
      marginRight: 15,
      borderRadius: 20,
      // borderWidth: 0.5,
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: colors.background,
      backgroundColor: colors.card,
      
    },
    btnText: {
      color: colors.primary,
    },
    name: {
      backgroundColor: 'yellow',
      backgroundColor: colors.background,
      color: colors.text,
      paddingVertical: 20,
      paddingHorizontal: 20,
    },
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Create Chat',
      headerTitleAlign: 'center',
      headerRight: () => (
        <TouchableOpacity style={styles.btn} >
          <Text style={styles.btnText}>Create</Text>
        </TouchableOpacity>
      )
    })
  });

  const [name, setName] = useState('');
  const [privacy, setPrivacy] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.name}
        value={name}
        onChangeText={setName}
        placeholder='Chat Name'
      />
    </View>
  )
}

export default CreateChat
