import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import IntroList from '../components/IntroList';
import AccountHeader from '../components/AccountHeader';
import PinList from '../components/PinList';
import { Text } from '../../Components';

const Account = () => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: colors.card,
      paddingHorizontal: 20,
      paddingVertical: 20,
    }
  };

  return (
    <View style={styles.container}>
      <AccountHeader
        name={'David Enam'}
        avatar={'https://randomuser.me/portraits/thumb/men/75.jpg'}
        // phone={phone}
      />

      <IntroList intros={null} />

      <PinList pins={null} />
    </View>
  )
}

export default Account;