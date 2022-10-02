import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
// import RoleItem from './RoleItem';
import { BottomModal, ListItem } from '../../Components';
import Modal from 'react-native-modal';


const AvatarOptionsModal = ({ isVisible, hideModal, onPressCamera, onPressGallery }) => {
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
          // marginBottom: 50,
          // paddingBottom: 50,
          // backgroundColor: 'red',
          // padding: 10,
        }}

        useNativeDriver={true}
        swipeDirection='down'
        onSwipeComplete={hideModal}
        animationInTiming={500}
          // swipeThreshold={400}
      >
        <BottomModal>
          <ListItem title='Use Camera' icon='camera-outline' onPress={() => { onPressCamera(); hideModal(); }} />
          <ListItem title='Choose From Gallery' icon='image-multiple-outline' onPress={() => { onPressGallery(); hideModal() }} />
          <ListItem title='Remove Photo' icon='delete-outline' />
        </BottomModal>
      </Modal>
  );  
}

export default AvatarOptionsModal;