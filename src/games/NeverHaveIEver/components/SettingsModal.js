// import React from 'react';
// import { View, TouchableOpacity, Dimensions, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
// import { useTheme, useNavigation, StackActions } from '@react-navigation/native';
// import Modal from 'react-native-modal';
// import { Text, Touchable } from '../../../Components';





// const SettingsModal = ({ isVisible, hideModal, navigate,
//   onQuit,
//   onMinimize,
//   onBackToLobby,
//  }) => {
//   const { colors } = useTheme();

//   const styles = {
//     container: {
//       // width: 
//       // alignSelf: 'center',
//       backgroundColor: colors.background,
//       backgroundColor: colors.darkBackground,
//       borderRadius: 10,
//       // flex: 1,
//       // padding: 10,
//     },
//     title: {
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderBottomWidth: 1,
//       borderBottomColor: colors.border,
//       paddingVertical: 5,
//     },
//     titleText: {
//       color: colors.primary,
//     },
//     content: {
//       padding: 20,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     contentText: {
//       fontSize: 24,
//       color: colors.text2
//     },
//     actions: {
//       flexDirection: 'row',
//       backgroundColor: colors.primary,
//       borderBottomLeftRadius: 20,
//       borderBottomRightRadius: 20,
//       paddingVertical: 10,
//     },
//     btn: {
//       flex: 0.5,
//       justifyContent: 'center',
//       alignItems: 'center',
//       // backgroundColor: colors.primary,
//     },
//     btnText: {
//       color: colors.textInverse,
//     },
//     heading: {
//       paddingVertical: 10,
//       paddingHorizontal: 10,
//       color: colors.text2,
//       color: colors.lightText3,
//       textTransform: 'uppercase',
//     }
//   };

//   // 

//   const navigation = useNavigation();

//   const content = 'Quit?'
//   const actions = [
//     { text: 'Return To Game',onPress: () => navigate('People', { screen: 'Contacts' } ) }, 
//     { text: 'Minimize Game', onPress: onMinimize },
//     { text: 'Leave Game', onPress: () => navigation.navigate('Home') },
//   ]

//   const [privacy, setPrivacy] = React.useState('private');

//   const onChangePrivacy = (privacy) => {
//     setPrivacy(privacy)

//     // emit to db
//   }



//   return (
//     <Modal 
//       isVisible={isVisible}
//       animationIn='zoomIn'
//       animationOut='zoomOut'
//       transi
//       onBackButtonPress={hideModal}
//       onBackdropPress={hideModal}
//       backdropOpacity={0.5}
//       statusBarTranslucent
//       deviceHeight={Dimensions.get('screen').height}
//       style={{
//         // justifyContent: 'flex-end',
//         // margin: 0,          
//         padding: 0,
//       }}
//       useNativeDriverForBackdrop={true}
//       // useNativeDriver={true}
//       swipeDirection='down'
//       onSwipeComplete={hideModal}
//       animationInTiming={500}
//         // swipeThreshold={400}
//     >
//       <View style={styles.container}>
//         <View>
//           <Text style={styles.heading}>Party Privacy</Text>

//           <View>
//             <ListItem text='Private' onPress={() => onChangePrivacy('private')} noPadding />
//             <ListItem text='Public' onPress={() => onChangePrivacy('public')} noPadding />
//             <ListItem text='Friends only' onPress={() => onChangePrivacy('friends')} noPadding />
//           </View>
//         </View>

//         <ListItem text='Minimize Game' onPress={onMinimize} />
//         <ListItem text='Back To Lobby' onPress={onBackToLobby} />
//         <ListItem text='Leave Game' onPress={onQuit} />
//         {/* <ListItem text='Return To Game' onPress={() => onChangePrivacy('friends')} /> */}

//       </View>
//     </Modal>
//   );
// }

// export default SettingsModal;







// const ListItem = ({ text, onPress, noPadding, ...rest }) => {
//   const { colors } = useTheme();

//   const styles = {
//     item: {
//       paddingVertical: noPadding ? 3 : 10,
//       paddingHorizontal: noPadding ? 30 : 20,
//       fontSize: 16,
//       color: colors.text,
//     },
//     text: {
//       // padding: 10,
//       fontSize: 16,
//       color: colors.text,
//       color: colors.lightText2,

//       paddingVertical: noPadding ? 3 : 10,
//       paddingHorizontal: noPadding ? 30 : 20,
//     },
//   };

//   return (
//     <Touchable background={colors.darkBackground3} onPress={onPress} style={styles.item} {...rest}>
//       <Text style={styles.text}>{text}</Text>
//     </Touchable>
//   );
// }


















import React from 'react';
import { View, TouchableOpacity, Dimensions, TouchableHighlight } from 'react-native';
import { useTheme, useNavigation, StackActions } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { Text, Touchable } from '../../../Components';





const SettingsModal = ({ isVisible, hideModal, navigate,
  onQuit,
  onMinimize,
  onBackToLobby,
 }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // width: 
      // alignSelf: 'center',
      backgroundColor: colors.background,
      backgroundColor: colors.darkBackground,
      borderRadius: 10,
      // flex: 1,
      padding: 10,
    },
    title: {
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingVertical: 5,
    },
    titleText: {
      color: colors.primary,
    },
    content: {
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentText: {
      fontSize: 24,
      color: colors.text2
    },
    actions: {
      flexDirection: 'row',
      backgroundColor: colors.primary,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      paddingVertical: 10,
    },
    btn: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: colors.primary,
    },
    btnText: {
      color: colors.textInverse,
    },
    heading: {
      paddingVertical: 10,
      paddingHorizontal: 10,
      color: colors.text2,
      color: colors.lightText3,
      textTransform: 'uppercase',
    }
  };

  // 

  const navigation = useNavigation();

  const content = 'Quit?'
  const actions = [
    { text: 'Return To Game',onPress: () => navigate('People', { screen: 'Contacts' } ) }, 
    { text: 'Minimize Game', onPress: onMinimize },
    { text: 'Leave Game', onPress: () => navigation.navigate('Home') },
  ]

  const [privacy, setPrivacy] = React.useState('private');

  const onChangePrivacy = (privacy) => {
    setPrivacy(privacy)

    // emit to db
  }

  // const handleMinimize = () => {

  // }

  // const handleQuit = () => {
  //   onQuit();
  //   // navigation.dispatch(backAction);

  //   // navigation.goBack();
  //   
  //   // navigation.navigate('Home', { screen: 'GamesIndex' });
  //   // navigation.navigate('Home', { screen: 'PeopleIndex' });
  //   // navigation.navigate('Home');

  //   // navigation.navigate('People', { screen: 'Contacts' });
  //   // navigation.navigate('People', { screen: 'Contacts' });
  //   // navigation.dispatch(StackActions.pop(1));
    
  //   // navigation.reset({
  //   //   index: 0,
  //   //   routes: [{ name: 'Home' }],
  //   // });
  //   // navigation.pop();
  // }



  return (
    <Modal 
      isVisible={isVisible}
      animationIn='zoomIn'
      animationOut='zoomOut'
      // transi
      onBackButtonPress={hideModal}
      onBackdropPress={hideModal}
      backdropOpacity={0.5}
      statusBarTranslucent
      deviceHeight={Dimensions.get('screen').height}
      style={{
        // justifyContent: 'flex-end',
        // margin: 0,          
        padding: 0,
      }}
      useNativeDriverForBackdrop={true}
      // useNativeDriver={true}
      swipeDirection='down'
      onSwipeComplete={hideModal}
      animationInTiming={500}
        // swipeThreshold={400}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>Party Privacy</Text>

          <View>
            <ListItem text='Private' onPress={() => onChangePrivacy('private')} noPadding />
            <ListItem text='Public' onPress={() => onChangePrivacy('public')} noPadding />
            <ListItem text='Friends only' onPress={() => onChangePrivacy('friends')} noPadding />
          </View>
        </View>

        <ListItem text='Minimize Game' onPress={onMinimize} />
        {/* <ListItem text='Back To Lobby' onPress={onBackToLobby} /> */}
        <ListItem text='Leave Game' onPress={onQuit} />
        {/* <ListItem text='Return To Game' onPress={() => onChangePrivacy('friends')} /> */}

      </View>
    </Modal>
  );
}

export default SettingsModal;







const ListItem = ({ text, onPress, noPadding, ...rest }) => {
  const { colors } = useTheme();

  const styles = {
    item: {
      paddingVertical: noPadding ? 3 : 10,
      paddingHorizontal: noPadding ? 20 : 10,
      fontSize: 16,
      color: colors.text,
    },
    text: {
      // padding: 10,
      fontSize: 16,
      color: colors.text,
      color: colors.lightText2,

      paddingVertical: noPadding ? 3 : 10,
      paddingHorizontal: noPadding ? 30 : 20,
    },
  };

  return (
    <Touchable background={colors.darkBackground3} onPress={onPress} {...rest}>
      <Text style={styles.text}>{text}</Text>
    </Touchable>
  );
}
