import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '../../Components';
import { createStackNavigator, CardStyleInterpolators, } from '@react-navigation/stack'


const AddIntro = ({ route, navigation }) => {
  const { colors } = useTheme();

  const styles = {
    container: {

    },    
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({      
      headerTintColor: colors.text,
      headerStyle: {
          // backgroundColor: colors.blue
      },
      headerTitleAlign: 'center',
      // headerTitle: <HeaderTitle title={'Chats'} onPress={() => setChatListVisible(true)} />, 
      // headerTitle: false,
      headerStyle: { borderBottomColor: colors.border2, borderBottomWidth: 0.5, },

      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      // headerLeft: () => (
      //   <HeaderButton 
      //     name='magnify' 
      //     position='left' 
      //     onPress={() => navigation.navigate('Chats', { screen: 'Explore' })}
      //   />
      // ),
      // headerRight: () => (
      //   <HeaderButton 
      //     name='plus' 
      //     position='right' 
      //     onPress={() => navigation.navigate('Chats', { screen: 'CreateChat' })}
      //   />
      // )
    });
  }, [route, navigation]);

  return (
    <View>
      <Text>AddIntro</Text>
    </View>
  );
}

export default AddIntro;