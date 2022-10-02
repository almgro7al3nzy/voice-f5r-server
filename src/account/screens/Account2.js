import React from 'react';
import { View, ImageBackground, TouchableHighlight } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Grid, Text } from '../../Components';
import IntroItem from '../components/IntroItem';




const Tab = ({ title, active, ...rest }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      // borderRadius: 10,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    background: {
      // flex: 0.5,
      borderWidth: 2,
      borderColor: colors.primary,
      // borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 5,
      paddingHorizontal: 15,
      backgroundColor: colors.card,
      ...(active && { backgroundColor: colors.primary })
    },
    title: {
      color: colors.text,
      ...(active && { color: colors.textInverse })
    }
  };

  return (
    <TouchableHighlight {...rest} style={styles.container}>
      <View style={styles.background}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
}

// const Account2 = ({ name, avatar }) => {
const Account2 = () => {
  const { colors } = useTheme();

  const styles = {
    container: {
      width: '100%',
    },
    image: {
      // flex: 0.5,
      justifyContent: 'center',
      // width: '100%',
      // height: '100%',
      // width: 100,
      height: 300,
      // height: '50%',
      resizeMode: 'cover',
      // position: 'absolute',
    },
    header: {
      // width: '100%',
      position: 'relative',
    },
    body: {
      paddingHorizontal: 10,
    },
    tabs: {
      flexDirection: 'row',
      // justifyContent: 'space-between',
      // justifyContent: 'stretch',
      width: '100%',
    },
    content: {
      // justifyContent: 'center',
      alignItems: 'center',
      // width: '100%',
      // backgroundColor: 'red',
    }
  };

  const [activeTab, setActiveTab] = React.useState('intros');


  const intros2 = [
    { id: 1, title: 'Professional Dentist', photo: 'https://randomuser.me/portraits/men/75.jpg', },
    { id: 2, title: 'Gaming, Movies', photo: 'https://randomuser.me/portraits/women/75.jpg', },
    { id: 3, title: 'Professional Dentist', photo: 'https://randomuser.me/portraits/men/75.jpg', },
    { id: 4, title: 'Gaming, Movies', photo: 'https://randomuser.me/portraits/women/75.jpg', },
    { id: 5, title: 'Professional Dentist', photo: 'https://randomuser.me/portraits/men/75.jpg', },
    { id: 6, title: 'Gaming, Movies', photo: 'https://randomuser.me/portraits/women/75.jpg', },
  ];

  const name = 'David Enam'
  const avatar = 'https://randomuser.me/portraits/thumb/men/75.jpg'

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ImageBackground source={{ uri: avatar }} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.tabs}>
          <Tab title='Intros' active={activeTab === 'intros'} onPress={() => setActiveTab('intros')} />
          <Tab title='Pins' active={activeTab === 'pins'} onPress={() => setActiveTab('pins')} />
        </View>

        <View style={styles.content}>
          <Grid
            data={intros2}
            renderItem={data => <IntroItem {...data.item} />}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            itemMargin={0}
          />
        </View>
      </View>
    </View>
  );
}

export default Account2;