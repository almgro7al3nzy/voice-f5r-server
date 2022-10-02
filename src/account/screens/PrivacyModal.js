import React from 'react';
import { View, Switch, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Modal from 'react-native-modal';
// import Options from './00Options';
import { useHeaderHeight } from "@react-navigation/stack";
import { Header } from '../../Components';
// import Settings from '../components/00Settings';
import ChangeNameModal from './ChangeNameModal';
import { ListHeader, ListItem } from '../../Components';
import ChangeEmailModal from './ChangeEmailModal';
import { capitalize } from '../../utils';
import ChangePasswordModal from './ChangePasswordModal';


const PrivacyModal = ({ isVisible, hideModal }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.card,
    }
  };

  

  const [changeNameVisible, setChangeNameVisible] = React.useState(false);
  const [changeEmailVisible, setChangeEmailVisible] = React.useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = React.useState(false);  

  const dark = true;

  const darkMode = (
    <Switch
      trackColor={{ false: colors.border, true: colors.primary }}
      thumbColor={dark ? colors.text : colors.background}
      // ios_backgroundColor="#3e3e3e"
      // onValueChange={() => setTheme(dark ? 'light' : 'dark')}
      value={dark}
    />
  )

  return (
    <Modal 
        isVisible={isVisible}
        onBackButtonPress={hideModal}
        // onBackdropPress={hideModal}
        backdropOpacity={0.5}
        statusBarTranslucent
        style={{
          justifyContent: 'flex-end',
          margin: 0,          
        }}

        animationIn='slideInRight'
        animationOut='slideOutRight'
        // useNativeDriver={true}
        swipeDirection='right'
        onSwipeComplete={hideModal}
        animationInTiming={500}
          // swipeThreshold={400}
      >
        <Header leftButton={{ icon: 'close', onPress: hideModal }} middleButton={{ text: 'Privacy' }} />
        <ScrollView style={styles.container}>
          <View style={styles.group}>
            <ListHeader title='SAFETY' />
            <ListItem title='Direct messages' right={'Friends'} />
            <ListItem title='Game invites' right={darkMode} />
            <ListItem title='Mentions' right={darkMode} />
            <ListItem title='Friend requests' right={darkMode} />
            <ListItem title='New friends' right={darkMode} />
            <ListItem title='Room suggestions' right={darkMode} />
            <ListItem title='Likes' right={darkMode} />
          </View>

      
        </ScrollView>        
      </Modal>
  )
}

export default PrivacyModal;