import React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '../../Components';
import IntroItem from './IntroItem';
// import { Dimensions } from 'react-native';

const IntroList = ({ intros }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // flex: 1,
      marginVertical: 20,
      // flexDirection: 'column',
      // backgroundColor: 'red',
    },
    title: {
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 10,
      paddingHorizontal: 20,
    },
    count: {
      fontWeight: 'normal',
      color: colors.text3,
    },
  };

  const intros2 = [
    { id: 1, title: 'Professional Dentist', photo: 'https://randomuser.me/portraits/men/75.jpg', },
    { id: 2, title: 'Gaming, Movies', photo: 'https://randomuser.me/portraits/women/75.jpg', },
    { id: 3, title: 'Professional Dentist', photo: 'https://randomuser.me/portraits/men/75.jpg', },
    { id: 4, title: 'Gaming, Movies', photo: 'https://randomuser.me/portraits/women/75.jpg', },
    { id: 5, title: 'Professional Dentist', photo: 'https://randomuser.me/portraits/men/75.jpg', },
    { id: 6, title: 'Gaming, Movies', photo: 'https://randomuser.me/portraits/women/75.jpg', },
  ]

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Intros <Text style={styles.count}>{intros2.length}</Text>
      </Text>

      <FlatList
        data={intros2}
        renderItem={({item, index}) => <IntroItem {...item} index={index} />}
        keyExtractor={item => item.id.toString()}
        horizontal
        snapToAlignment='center'
        decelerationRate='fast'
        snapToInterval={Dimensions.get('screen').width}
      />
    </View>
  )
}

export default IntroList;