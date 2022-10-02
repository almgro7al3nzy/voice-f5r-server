import React, { useState } from 'react'
import { View, FlatList, TouchableOpacity, TextInput, Animated, Vibration } from 'react-native'
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@react-navigation/native';
import { HeaderButton, HeaderTitle, Text } from '../../Components';
import Modal from 'react-native-modal';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

// import { SET_BOARD_ID } from './types';
import ReplyPinModal from '../components/ReplyPinModal';
import PinCard from '../components/PinCard';

const Pins = ({ route, navigation, boards, pins, socket, user, error, activeBoardId, setBoardId }) => {

  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.card,
      // backgroundColor: 'red+',
      // backgroundColor: colors.background,
    },
    replyText: {
      color: colors.lightText,
      color: colors.text,
      // fontSize: 16,
      fontWeight: 'bold',
    },
    replyIcon: {
      color: colors.lightText,
      color: colors.text,
      fontSize: 30,
      // marginHorizontal: 30,

      // backgroundColor: colors.darkTranslucent3,
      // borderRadius: 15,
      // padding: 5,
    },
    replyAction: {
      flex: 1,
      justifyContent: 'center',
      // alignItems: 'center',
      alignItems: 'flex-start',

      paddingHorizontal: 20,
      // backgroundColor: 'green',
      backgroundColor: colors.background,
    },
    leftAction: {
      // flex: 0.1,
      flex: 1,
      // flex: 0.15,
      // flex: 0.2,
      // backgroundColor: 'green',
      backgroundColor: colors.background,
    },
    leftAction2: {
      flex: 0.3,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
    },
    deleteAction: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
      // alignItems: 'center',
      backgroundColor: colors.danger,
    },
    deleteIcon: {
      // backgroundColor: 'yellow',
      fontSize: 30,
      color: colors.lightText,
    }
  };
  
  React.useEffect(() => {
    if (boards) setBoard(boards[0])

    const newActiveBoard = boards && boards.find(board => board.id === activeBoardId) || boards && boards[0] || {};
    setBoard(newActiveBoard)
    // activeBoardId && setBoard(boards.find(board => board.id === activeBoardId))

    

    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: () => <HeaderTitle title={newActiveBoard.name} onPress={() => setBoardListVisible(true)} dropdownShowing={boardListVisible} />,
      headerStyle: { borderBottomColor: colors.border2, borderBottomWidth: 0.5, },
      // headerTitle: () => {
      //   // const activeBoard = boards.find(board => board.id === activeBoardId)
      //   // return <HeaderTitle title={activeBoard.name || boards[0]} onPress={() => setBoardListVisible(true)} />
      //   return <HeaderTitle title={activeBoard.name} onPress={() => setBoardListVisible(true)} />
      // },
      headerLeft: () => (
        <HeaderButton 
          name='compass-outline' 
          position='left' 
          onPress={() => navigation.navigate('Pins', { screen: 'ExploreBoards' })}
        />
      ),
      headerRight: () => (
        <HeaderButton 
          name='plus' 
          position='right' 
          onPress={() => navigation.navigate('Pins', { screen: 'CreatePin' } )} 
        />
      ),
    });

    
  }, [navigation, activeBoardId, boards, boardListVisible]);

  // React.useEffect(() => {
  //   // const activeBoard = boards.find(board => board.id === activeBoardId)
  //   setBoard(boards.find(board => board.id === activeBoardId))
  // }, [activeBoardId]);

  // React.useEffect(() => {
  //   if (boards) setBoard(boards[0])
    
  //   
  // }, [boards]);

  // React.useEffect(() => {
    
  //   
  // }, [activeBoard]);

  // 

  const [boardListVisible, setBoardListVisible] = useState(false);
  // move to redux
  const [activeBoard, setBoard] = useState(null);
  const [replyPinId, setReplyPinId] = useState(null);
  // const [replyText, setReplyText] = useState('');
  const [refsArray, setRefsArray] = React.useState([]);

  const hideReplyModal = () => {
    setReplyPinId(null);

    refsArray[replyPinId].close();
  }

  const handleSubmitReply = (text) => {

    
    // socket.emit('send_message', { text, chatId, senderId: user.id });

    const replyPin = activeBoard && activeBoard.pins && activeBoard.pins.find(pin => pin.id === replyPinId);

    socket.emit('send_message', { text, senderId: user.id, pinId: replyPinId, userId: replyPin.authorId });

    
  }

  

  let row = [];
  let prevOpenedRow;

  const closeRow = (index) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) prevOpenedRow.close();

    prevOpenedRow = row[index];
  }

  const renderLeftActions = (progress, dragX) => {
    const translateX = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [20, 0, 0, 1],
    });

    return (
      // <RectButton style={styles.leftAction} onPress={() => {}}>
      <View style={styles.leftAction}>
        <Animated.View
          style={[
            styles.replyAction,
            { transform: [{ translateX }] }
          ]}
          >
            <MaterialCommunityIcons name='reply' style={styles.replyIcon} />
            <Text style={styles.replyText}>Reply</Text>
          </Animated.View>
      {/* // </RectButton> */}
      </View>
    );
  }

  const renderLeftAction = () => {
    return (
      <View style={styles.leftAction2}>
        <MaterialCommunityIcons name='reply-outline' size={26} color={colors.text3} />
      </View>
    );
  }

  const renderRightActions = (progress, dragX) => {
    const translateX = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });

    return (
      <Animated.View
        style={[
          styles.deleteAction,
          // { transform: [{ translateX }] }
        ]}
      >
        <MaterialCommunityIcons name='delete' style={styles.deleteIcon} />
        <Text>Hide</Text>
      </Animated.View>
    );
  }

  const renderPinItem = ({ item, item: { id, text, author, authorId }, index }) => {
    const deletePin = () => {
      socket.emit('delete_pin', { pinId: id, userId: user.id });
    }

    // 

    const replyPin = () => {
      if (authorId === user.id) {
        Vibration.vibrate([0, 50, 50, 50]);
        refsArray[id].close();
        return;
      }
      Vibration.vibrate([0, 50]);

      setReplyPinId(id);

      // Vibration.vibrate();
    }

    // return <PinCard {...item} onReplying={() => setReplyPinId(id)} />

    return (
      <Swipeable
        key={id}
        // ref={ref => row[index] = ref}
        ref={ref => refsArray[id] = ref}
        friction={2}
        leftThreshold={100}
        rightThreshold={100}
        overshootFriction={4}
        // leftThreshold={100}
        // rightThreshold={40}
        // renderRightActions={renderRightActions}
        renderLeftActions={renderLeftActions}
        // renderLeftActions={renderLeftAction}
        containerStyle={styles.swipeRowStyle}
        // onSwipeableOpen={closeRow(index)}

        // onSwipeableRightOpen={deletePin}
        
        // onSwipeableLeftOpen={replyPin}
        onSwipeableLeftWillOpen={replyPin}

        // onBegan={() => 
        // onActivated={() => 
        // onFailed={() => 
        // onCancelled={() => 
        // onEnded={() => 
        // onActivated={() => Vibration.vibrate([0, 50])}

        // shouldCancelWhenOutside
      >
        <PinCard {...item} onReplying={() => setReplyPinId(id)} />
      </Swipeable>
    );
  }

  // const renderBoardItem = ({ item: { id, name, icon } }) => {
  //   return (
  //     <BoardItem id={id} name={name} icon={icon} onPress={() => setBoard(id)} />
  //   );
  // }

  // const board = boards && boards.find(board => board.id === activeBoardId);
  // const replyPin = board && board.pins && board.pins.find(pin => pin.id === replyPinId);
  const replyPin = activeBoard && activeBoard.pins && activeBoard.pins.find(pin => pin.id === replyPinId);
  

  

  return (
    <View style={styles.container}>
      <FlatList
        // data={board && board.pins}
        data={activeBoard && activeBoard.pins}
        renderItem={renderPinItem}
        keyExtractor={({id}) => id.toString()}
      />

      <ReplyPinModal
        isVisible={Boolean(replyPin)}
        hideModal={hideReplyModal}
        replyPin={replyPin}
        onSubmitReply={handleSubmitReply}
      />      
    </View>
  );
}

const mapStateToProps = state => ({
  activeBoardId: state.games.rooms.activeBoardId,
  boards: state.games.rooms.boards,
  error: state.games.rooms.error,
  socket: state.games.rooms.socket,
  // chatSocket: state.chats.socket,
  user: state.auth.user,
});

// const mapDispatchToProps = dispatch => ({
//   setBoardId: (id) => dispatch({ type: SET_BOARD_ID, id }),
// })

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Pins);