import React from 'react';
import { View, TouchableOpacity, Text, Dimensions, TouchableHighlight } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Modal from 'react-native-modal';


const LanguageModal = ({ isVisible, hideModal, language, setLanguage }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // flex: 1,
      backgroundColor: colors.card,
      borderRadius: 5,
      // padding: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    languageText: {
      // flex: 1,
      // backgroundColor: 'red',
      color: colors.text,
      fontSize: 24,
      paddingHorizontal: 30,
      paddingVertical: 10,
    }
  };

  const languages = [
    'English',
    'Italiano',
    'Deutsch',
  ]

  const handleSelectLanguage = (language) => {
    setLanguage(language);
    hideModal();
  }

  return (
    <Modal 
      isVisible={isVisible}
      animationIn='slideInDown'
      animationOut='slideOutUp'
      onBackButtonPress={hideModal}
      onBackdropPress={hideModal}
      backdropOpacity={0.5}
      statusBarTranslucent
      // style={{
      //   justifyContent: 'flex-end',
      //   margin: 0,          
      // }}
      deviceHeight={Dimensions.get('screen').height}
      useNativeDriverForBackdrop={true}
      useNativeDriver={true}
      swipeDirection='up'
      onSwipeComplete={hideModal}
      animationInTiming={100}
      animationOutTiming={100}
        // swipeThreshold={400}
    >
      <View style={styles.container}>
        {languages.map((lang, index) => {
          const style = lang === language && {backgroundColor:colors.border};

          return (
            <TouchableHighlight underlayColor={colors.border} key={index} onPress={() => handleSelectLanguage(lang)}>
              <Text style={[styles.languageText, style]}>{lang}</Text>
            </TouchableHighlight>
          );
        })}
      </View>
    </Modal>
  );
}

export default LanguageModal;