import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ListHeader, ListItem } from '../../../Components';
// import BottomModal from './BottomModalContainer';
import Modal from 'react-native-modal';

const ActionsModal = ({ isVisible, hideModal, pinText }) => {
  const { colors } = useTheme();

  const styles = {
    container: {

    }
  };

  return (
    
    <Modal 
      isVisible={isVisible}
      onBackButtonPress={hideModal}
      onBackdropPress={hideModal}
      backdropOpacity={0.5}
      statusBarTranslucent
      style={{
        justifyContent: 'flex-end',
        margin: 0,          
      }}

      // useNativeDriver={true}
      swipeDirection='down'
      onSwipeComplete={hideModal}
      animationInTiming={500}
        // swipeThreshold={400}
    >
      {/* <BottomModal title={pinText}> */}
        <View>
          {/* <ListHeader title='Actions' /> */}
          <ListItem icon='send' title='Send Pin to a friend' />
          <ListItem icon='content-save-alert-outline' title='Save Pin' />
          <ListItem icon='close-box-outline' title='Hide Pin' />
          <ListItem icon='close-box-multiple-outline' title='Hide all from this person' />
          <ListItem icon='alert' title='Report pin' />
        </View>

        {/* <View>
          <ListHeader title='Actions' />
          <ListItem icon='content-save-alert-outline' title='Save Pin' />
          <ListItem icon='close-box-outline' title='Hide Pin' />
          <ListItem icon='close-box-multiple-outline' title='Hide all from this person' />
        </View>         */}
      {/* </BottomModal> */}
    </Modal>
);
}

export default ActionsModal;