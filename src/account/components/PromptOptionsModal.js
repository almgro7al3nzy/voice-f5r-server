import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import RoleItem from './RoleItem';
import { BottomModal, Touchable } from '../../Components';
import Modal from 'react-native-modal';


const PromptOptionsModal = ({ isVisible, hideModal, options, setOption, selectedOption }) => {
  const { colors } = useTheme();

  const styles = {
    container: {

    },
    promptItem: {
      flexDirection: 'row',
      // justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 15,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.border,
      backgroundColor: colors.card,
    },
    promptKey: {
      color: colors.text,
      fontSize: 14,
    },
  };

  const roles2 = [
    { id: 1, name: 'Tutor', icon: 'school', subName: 'Subject', subOptions: ['English Language', 'Italian Language', 'Physics', 'Chemistry'],   },
    { id: 2, name: 'Flatmate', icon: 'bed', subName: 'Location', subOptions: ['Torino', 'Milano', 'California', 'Lagos'],     },
    { id: 3, name: 'Language Exchange', icon: 'account-voice', subName: 'Location', subOptions: ['Torino', 'Milano', 'California', 'Lagos'],     },
    { id: 4, name: 'Doctor', icon: 'doctor', subName: 'Location', subOptions: ['Torino', 'Milano', 'California', 'Lagos'],     },
  ];

  const renderPromptItem = ({ item }) => {
    const selectedStyle = item === selectedOption && { backgroundColor: colors.background };

    // ...(position === 'right' && { marginRight: 15 }),
    return (
      <Touchable onPress={() => { setOption(item); hideModal(); }} background={colors.background4} style={{...styles.promptItem, ...selectedStyle}}>
        <Text style={styles.promptKey}>{item}</Text>
      </Touchable>
    );
  }

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

        useNativeDriver={true}
        swipeDirection='down'
        onSwipeComplete={hideModal}
        animationInTiming={500}
          // swipeThreshold={400}
      >
        <BottomModal title='Choose subject'>
          <FlatList
            data={options}
            // renderItem={({item}) => <RoleItem {...item} onPress={() => { setRole(item); hideModal(); }} /> }
            renderItem={renderPromptItem}
            keyExtractor={item => item}
          />
        </BottomModal>
      </Modal>
  );  
}

export default PromptOptionsModal;