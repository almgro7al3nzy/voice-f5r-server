import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Button2, Text } from '../../Components';
import DatePicker from 'react-native-date-picker'

const Birthday = ({ navigation }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.card,
      // alignItems: 'center',
      justifyContent: 'space-between',
    },
    content: {
      padding: 50,
      // alignItems: 'center',
    },
    picker: {
      width: '100%',
      backgroundColor: 'red',
      backgroundColor: colors.card,
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      color: colors.text,
      fontWeight: 'bold',
    },
    subtitle: {
      color: colors.text2,
    },
    nextBtn: { 
      width: '100%', 
      marginVertical: 20,
    },
    birthday: {
      color: colors.text,
      backgroundColor: colors.background,
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginVertical: 20,
    }
  };

  const [date, setDate] = React.useState(new Date())

  React.useLayoutEffect(() => {
      navigation.setOptions({
        headerTitleAlign: 'center',
        title: 'Create account',         
      });
  });


  const prettyDate = () => {
    return date.toDateString().slice(0, -5) + ',' + date.toDateString().slice(-5);
  }

  const handleSubmit = () => {
    navigation.navigate('Register');
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Your birthday</Text>
        <Text style={styles.subtitle}>This will not be shown publicly</Text>
        {/* <Text style={styles.birthday}>{date.toDateString().splice}</Text> */}
        <Text style={styles.birthday}>{prettyDate()}</Text>
        <Button2 title='Next' onPress={handleSubmit} style={styles.nextBtn} />
      </View>
      <View style={styles.picker}>
        <DatePicker
          mode='date'
          date={date}
          onDateChange={setDate}
          androidVariant='nativeAndroid'
        />
        </View>
    </View>
  )
}

export default Birthday;