import React from 'react';
import { View, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '../../Components';
import FriendItem from './FriendItem';
import RoundedButton from './RoundedButton';

const FriendList = () => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
      // flexDirection: 'column',
      // backgroundColor: 'red',
      marginVertical: 20,
    },
    title: {
      fontWeight: 'bold',
      color: colors.text,
      
    },
    count: {
      fontWeight: 'normal',
      color: colors.text3,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      // backgroundColor: 'red',
      paddingHorizontal: 20,
    },
  };

  const intros2 = [
    { id: 1, name: 'David Enam', avatar: 'https://randomuser.me/portraits/men/75.jpg', },
    { id: 2, name: 'Sofia Manco', avatar: 'https://randomuser.me/portraits/women/75.jpg', },
    { id: 3, name: 'Claudio Loonghi', avatar: 'https://randomuser.me/portraits/men/75.jpg', },
    { id: 4, name: 'Uche Holmes', avatar: 'https://randomuser.me/portraits/women/75.jpg', },
    { id: 5, name: 'Professional Dentist', avatar: 'https://randomuser.me/portraits/men/75.jpg', },
    { id: 6, name: 'Gaming Movies', avatar: 'https://randomuser.me/portraits/women/75.jpg', },
  ]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Friends <Text style={styles.count}>{intros2.length}</Text>
        </Text>
        
        <RoundedButton title='Add Friend' icon='plus' />
      </View>

      <FlatList
        data={intros2}
        renderItem={({item, index}) => <FriendItem {...item} index={index} />}
        keyExtractor={item => item.id.toString()}
        horizontal
        // snapToAlignment='center'
        // decelerationRate='fast'
        // snapToInterval={Dimensions.get('screen').width}
      />
    </View>
  );
}

export default FriendList;