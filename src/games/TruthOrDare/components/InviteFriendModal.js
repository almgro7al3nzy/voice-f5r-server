import React from 'react';
import { View, FlatList, TouchableOpacity, Text, Dimensions, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Modal from 'react-native-modal';
import InviteFriendItem from './InviteFriendItem';
import ListHeader from './ListHeader';

const InviteModal = ({ isVisible, hideModal, friends, onInviteFriend }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // flex: 1,
      backgroundColor: colors.card,
      backgroundColor: colors.darkTranslucent2,
      backgroundColor: colors.darkBackground,
      borderRadius: 5,
      // padding: 50,
      // justifyContent: 'center',
      // alignItems: 'center',
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

  // 

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
        <ListHeader count={friends && friends.length}>FRIENDS</ListHeader>
        <FlatList
            data={friends}
            keyExtractor={({id}) => id.toString()}
            renderItem={({item}) => <InviteFriendItem {...item} onInviteFriend={onInviteFriend} />}
          />   
      </View>
    </Modal>
  );
}

export default InviteModal;