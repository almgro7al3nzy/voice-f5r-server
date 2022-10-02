import React, { useState } from 'react';
import { View, TextInput, Dimensions, StatusBar, TouchableHighlight, FlatList, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Modal from 'react-native-modal';
// import ModalContainer from './ModalContainer';
// import PinCard from './PinCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { useHeaderHeight } from "@react-navigation/stack";

import { Button2, ListHeader, Text, Touchable } from '../../Components';
import { SafeAreaView } from 'react-native-safe-area-context';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const SpacePromptsModal = ({ navigation, isVisible, hideModal, user, prompts, activePrompt, setActivePrompt, addUserPrompt }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      borderRadius: 5,
      backgroundColor: colors.card,
      paddingVertical: 30,
      // flex: 1,
      // padding: 10,
      // marginTop: StatusBar.currentHeight,
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
    promptItem: {
      // borderRadius: 10,
      // backgroundColor: colors.background,
      // marginHorizontal: 5,
      // padding: 5,
      // alignSelf: 'center',

      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      // paddingHorizontal: 20,
      paddingVertical: 5,
      // borderLeftWidth: 0.5,
    },
    promptIcon: {
      fontSize: 24,
      color: colors.text3,
      padding: 5,
      paddingLeft: 20,

      // marginHorizontal: 20,
      // marginVertical: 5,
      // // padding: 20,

      // borderRadius: 10,
      // backgroundColor: colors.background,
      // marginHorizontal: 5,
      // marginVertical: 5,
      // alignSelf: 'center',
      // justifyContent: 'center',
      // alignItems: 'center',

      // width: 150,
      // height: 150,
    },
    promptTitle: {
      fontSize: 16,
      color: colors.text,
      // fontWeight: 'bold',
      // borderLeftWidth: 0.5,
      borderRightWidth: 0.5,
      paddingRight: 20,
    },
    prompts: {
      flexGrow: 0,
      alignItems: 'center',
      // borderBottomWidth: 1,
      // borderBottomColor: colors.border2,
      // paddingHorizontal: 10,

      // backgroundColor: 'blue',
      // position: 'absolute',
      // top: 0,
      // left: 0,
      // right: 0,
      // bottom: 0,
    },




    promptText: {
      paddingVertical: 30,
      paddingHorizontal: 20,
      borderTopWidth: 0.5,
      borderTopColor: colors.border2,
      fontSize: 20,
      fontWeight: 'bold',
    },
    promptOption: {
      borderRadius: 5,
      borderColor: colors.border2,
      borderWidth: 0.5,
      paddingVertical: 5,
      paddingHorizontal: 15,
      marginHorizontal: 5,
      marginVertical: 5,
    },
    promptOptions: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 15,
    },
    space: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
      paddingHorizontal: 20,
      paddingVertical: 10,

      borderBottomWidth: 1,
      borderBottomColor: colors.border2,
    }
  };

  // const [activePrompt, setActivePrompt] = React.useState(prompts[0]);
  const [value, setValue] = React.useState('');


  const renderPromptItem = ({ item: { id, title, icon, color, onPress } }) => {
    
    return (
      <Touchable 
        background={colors.background4}
        style={styles.promptItem}
        onPress={() => setActivePrompt(prompts.find(prompt => prompt.id === id))} 
      >
        <MaterialCommunityIcons name={icon} style={[styles.promptIcon, id === activePrompt.id && {color:colors.text}]} />
        <Text style={[styles.promptTitle, id === activePrompt.id && {fontWeight:'bold'}]}>{title}</Text>
      </Touchable>
    )
  };

  const handlePressPromptOption = option => {
    addUserPrompt({ userId: user.id, promptId: activePrompt.id, value, choice: option });
    hideModal();
  }

  const getItemLayout = (data, index) => (
    {length: WIDTH, offset: WIDTH * index, index}
  );

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
        // justifyContent: 'flex-start',
        // marginTop: useHeaderHeight() + StatusBar.currentHeight,
        // paddingBottom: 20,
        margin: 0,
        borderRadius: 5,
        justifyContent: 'flex-end',

        // justifyContent: 'center',
        // backgroundColor: colors.card,
        // backgroundColor: 'red',
        // flex: 0,

        // flexGrow: 1,

        // position: 'relative',
        // position: 'absolute',
      }}

      // useNativeDriver
      useNativeDriverForBackdrop
      swipeDirection='down'
      onSwipeComplete={hideModal}
      animationInTiming={100}
      animationOutTiming={100}

      // animationIn='zoomIn'
      // animationOut='zoomOut'

      // animationIn='slideInLeft'
      // animationOut='slideOutLeft'

      // animationIn='slideInRight'
      // animationOut='slideOutRight'

      // animationIn='fadeIn'
      // animationOut='fadeOut'
        // swipeThreshold={400}
    >
      <SafeAreaView style={styles.container}>
        {/* <Text style={styles.space}>Roommate</Text> */}
        <FlatList
          data={prompts}
          keyExtractor={({id}) => id.toString()}
          renderItem={renderPromptItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.prompts}
          style={{ flexGrow: 0, }}
          getItemLayout={(data, index) => ({length: WIDTH, offset: WIDTH * index, index})}
          initialScrollIndex={activePrompt.id-1}
        />
        <Text style={styles.promptText}>{activePrompt.text}</Text>
        {/* <Text style={styles.promptText}>Whats's your budget?</Text> */}
        <View style={styles.promptOptions}>
          {activePrompt.options.map((option, index) => {
            const prompt = user.prompts.find(userPrompt => userPrompt.id === activePrompt.id);
            const choice = prompt && prompt.UserPrompts && prompt.UserPrompts.choice;
            
            return (
              <TouchableHighlight 
                key={index} 
                style={[styles.promptOption, 
                  // prompt.choice === option && {backgroundColor:colors.background4}
                  choice === option && {borderColor:colors.primary}
                ]} 
                underlayColor={colors.background4} 
                onPress={() => handlePressPromptOption(option)}
              >
                <Text style={[styles.promptOptionText, choice === option && {color:colors.primary}]}>{option}</Text>
              </TouchableHighlight>
            )
          })}
        </View>

        <Button2 title='Skip' type='outline' style={{ marginVertical: 20, }} />
        <Button2 title='Done' />
      </SafeAreaView>
    </Modal>
  );
}


export default SpacePromptsModal;