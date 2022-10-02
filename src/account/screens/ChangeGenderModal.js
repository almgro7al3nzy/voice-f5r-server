import React from 'react';
import { View, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Modal from 'react-native-modal';
// import Options from './00Options';
import { useHeaderHeight } from "@react-navigation/stack";
import { Header, Text } from '../../Components';
import Settings from '../components/00Settings';


const ChangeNameModal = ({ isVisible, hideModal, name }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.card,
      padding: 25,
    },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border2,
      // backgroundColor: colors.background,
      // paddingHorizontal: 0,
      paddingVertical: 5,
    }
  };

  const [displayName, setDisplayName] = React.useState(name);

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
        <Header leftButton={{ icon: 'close', onPress: hideModal }} middleButton={{ text: 'Name' }} rightButton={{ icon: 'check' }} />
        <View style={styles.container}>
          {/* <Text>Name</Text> */}
          <TextInput
            style={styles.input}
            value={displayName}
            onChangeText={setDisplayName}
            maxLength={50}
            placeholder='Name'
            placeholderTextColor={colors.text3}
          />
        </View>
      </Modal>
  )
}

export default ChangeNameModal;