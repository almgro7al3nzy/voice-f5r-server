import React from 'react';
import { View, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '../../Components';
import PinItem from './PinItem';

const IntroList = ({ intros }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // flex: 1,
      marginVertical: 50,
    },
    title: {
      fontWeight: 'bold',
      paddingHorizontal: 20,
    },
    count: {
      fontWeight: 'normal',
      color: colors.text3,
    },
  };

  const intros2 = [
    { id: 1, text: 'Looking for Professional Dentist', photo: 'https://randomuser.me/portraits/men/75.jpg', },
    { id: 2, text: 'Looking for Gaming, Movies', photo: 'https://randomuser.me/portraits/women/75.jpg', },
    { id: 3, text: 'Looking for Professional Dentist', photo: 'https://randomuser.me/portraits/men/75.jpg', },
    { id: 4, text: 'Looking for Gaming, Movies', photo: 'https://randomuser.me/portraits/women/75.jpg', },
    { id: 5, text: 'Looking for Professional Dentist', photo: 'https://randomuser.me/portraits/men/75.jpg', },
    { id: 6, text: 'Looking for Gaming, Movies', photo: 'https://randomuser.me/portraits/women/75.jpg', },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Pins <Text style={styles.count}>{intros2.length}</Text>
      </Text>

      <FlatList
        data={intros2}
        renderItem={({item, index}) => <PinItem {...item} index={index} />}
        keyExtractor={item => item.id.toString()}
        horizontal
      />
    </View>
  )
}

export default IntroList;