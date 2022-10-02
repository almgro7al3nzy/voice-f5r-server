import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Header, ImageGridMultiple } from '../../Components';

const ImagesModal = ({ isVisible, hideModal, onPressImage, selectedImages, onSubmit }) => {
  const { colors } = useTheme();

  const styles = {
    container: {

    }
  };

  // const onPressImage = (uri) => { handlePressImage(uri); hideModal(); }

  return (
    <Modal 
        isVisible={isVisible}
        onBackButtonPress={hideModal}
        onBackdropPress={hideModal}
        backdropOpacity={1}
        backdropColor={colors.card}
        statusBarTranslucent
        style={{
          justifyContent: 'flex-end',
          margin: 0,         
          backgroundColor: colors.card, 
        }}

        // useNativeDriver={true}
        swipeDirection='down'
        onSwipeComplete={hideModal}
        animationInTiming={500}
          // swipeThreshold={400}

  
        avoidKeyboard={false}        
        useNativeDriverForBackdrop={true}
        useNativeDriver={true}
        // animationIn='fadeIn'
        // animationOut='slideOutRight'
        // swipeDirection='right'
        // onSwipeComplete={hideModal}
        
      >
        <Header leftButton={{ icon: 'close', onPress: hideModal }} middleButton={{ text: 'Add Photo' }} />
      <ImageGridMultiple 
        first={50} 
        onPressImage={onPressImage} 
        selectedImages={selectedImages} 
        // submitButton={{ title: 'Add', onPress: onSubmit }} 
        onSubmit={onSubmit}
        submitText='Upload'
      />
    </Modal>
  )
}

export default ImagesModal;