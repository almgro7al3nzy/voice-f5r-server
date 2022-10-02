import React, { useState } from 'react';
import { View, TextInput, Dimensions, StatusBar, FlatList, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Modal from 'react-native-modal';
// import ModalContainer from './ModalContainer';
// import PinCard from './PinCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { useHeaderHeight } from "@react-navigation/stack";

import { ListHeader, Text, Touchable } from '../../Components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getRoles } from '../actions';



const SpaceListModal = ({ navigation, isVisible, hideModal, replyPin, onSubmitReply, getRoles, roles }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // flex: 1,
      backgroundColor: colors.card,
      // padding: 10,
      borderRadius: 5,
      marginTop: StatusBar.currentHeight,
    },
    pinText: {
      fontSize: 16,
      color: colors.text,
      backgroundColor: colors.background,
      paddingHorizontal: 15,
      paddingVertical: 15,

      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    },
    suggestions: {
      padding: 15,
      borderTopWidth: 1,
      borderColor: colors.border,
    },
    replyText: {
      padding: 15,
    },
    roleChatItem: {
      // borderRadius: 10,
      // backgroundColor: colors.background,
      // marginHorizontal: 5,
      // padding: 5,
      // alignSelf: 'center',

      justifyContent: 'center',
      alignItems: 'center',
    },
    roleChatIcon: {
      fontSize: 40,
      color: colors.text3,

      marginHorizontal: 20,
      marginVertical: 5,
      // padding: 20,

      borderRadius: 10,
      backgroundColor: colors.background,
      marginHorizontal: 10,
      marginVertical: 5,
      padding: 5,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',

      // width: 150,
      // height: 150,
    },
    roleChatTitle: {
      fontSize: 13,
      color: colors.text,
      // fontWeight: 'bold',
    },
    spaces: {
      flexGrow: 0,
      alignItems: 'center',
      paddingHorizontal: 10,

      // backgroundColor: 'blue',
      // position: 'absolute',
      // top: 0,
      // left: 0,
      // right: 0,
      // bottom: 0,
    },
  };


  React.useEffect(() => {    
    getRoles();
  }, []);

  const renderSpaceItem = ({ item: { id, name, icon, color, onPress } }) => {
    
    return (
      <Touchable 
        background={colors.background4}
        style={[styles.roleChatItem, id === 0 && {backgroundColor:colors.background}]}
        onPress={() => onPress ? onPress() : navigation.navigate('Account', { screen: 'JoinSpace', params: { spaceId: id }})} 
      >
        <MaterialCommunityIcons name={icon} style={styles.roleChatIcon} />
        <Text style={styles.roleChatTitle}>{name}</Text>
      </Touchable>
    )
  }

  const spaces = [
    { id: 0, icon: 'plus', title: 'New', color: colors.primary, onPress: () => {} },
    { id: 1, icon: 'heart-circle-outline', color: colors.text3, title: 'Memories', onPress: '' },
    { id: 2, icon: 'poll-box-outline', color: colors.text3, title: 'Opinions', onPress: '' },
    { id: 3, icon: 'bed-outline', title: 'Roommate', color: colors.text3, onPress: '' },
    { id: 4, icon: 'translate', title: 'Language Exchange', color: colors.text3, onPress: '' },
  ]

  

  return (
    <Modal 
      isVisible={isVisible}
      onBackButtonPress={hideModal}
      onBackdropPress={hideModal}
      backdropOpacity={0.8}
      statusBarTranslucent

      deviceHeight={Dimensions.get('screen').height}

      style={{
        justifyContent: 'flex-start',
        margin: 0,
        marginTop: useHeaderHeight() + StatusBar.currentHeight,
        paddingBottom: 20,
        borderRadius: 5,
        // justifyContent: 'flex-end',
        // justifyContent: 'center',
        backgroundColor: colors.card,
        flex: 0,

        // position: 'relative',
        // position: 'absolute',
      }}

      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      swipeDirection='down'
      onSwipeComplete={hideModal}
      animationInTiming={100}
      animationOutTiming={100}

      // animationIn='zoomIn'
      // animationOut='zoomOut'

      animationIn='slideInLeft'
      animationOut='slideOutLeft'

      // animationIn='fadeIn'
      // animationOut='fadeOut'
        // swipeThreshold={400}
    >
      <ListHeader title='Choose Space' />
      <FlatList
        data={roles}
        // data={spaces}
        keyExtractor={({id}) => id.toString()}
        renderItem={renderSpaceItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.spaces}
        style={{ flexGrow: 0, }}
      />
    </Modal>
  );
}

const mapStateToProps = state => ({
  roles: state.account.roles,
});

export default connect(
  mapStateToProps,
  { getRoles }
)(SpaceListModal);