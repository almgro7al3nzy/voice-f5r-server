import React from 'react'
import {
  StyleSheet,
  View,
  StatusBar as DefaultStatusBar,
  Platform,
  SafeAreaView
} from 'react-native';

import {useNetInfo} from "@react-native-community/netinfo";
import { useTheme } from '@react-navigation/native';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Touchable from './Touchable';
import Text from './Text';



const StatusBar = ({ game, room, navigation, ...rest }) => {
  const { colors, dark } = useTheme();

  const styles = {
    room: {
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primaryLight,

      // paddingHorizontal: 15,
      paddingVertical: 15,
    },
    roomIcon: {
      fontSize: 18,
      color: colors.text,
      marginRight: 10,
    },
    roomTitle: {
      fontSize: 14,
      color: colors.text,
      fontWeight: 'bold',
    },
  }

  const { isConnected } = useNetInfo();
  // const isConnected = false;

  // const netInfo = useNetInfo();
  // 

  // switch
  

  const backgroundColor = 
  // colors.card

  game ? colors.primaryLight : colors.card

  // game === 'TruthOrDare' ? 
  // 'rgba(255,0,0,0.5)' 
  // 'darkred' : 

  // isConnected ? colors.card : 'red';

  

  const barStyle = 
  // game ? 'light-content' : 
  !dark ? 'dark-content' : 'light-content';

  

  return (
      <SafeAreaView 
        // style={styles.messageContainer} pointerEvents={'none'}
      >
        <DefaultStatusBar 
          // translucent={Boolean(game)}
          animated
          // networkActivityIndicatorVisible
          // hidden
          backgroundColor={backgroundColor} 
          barStyle={barStyle}
          {...rest} 
        />
        {game && (
          <Touchable onPress={() => navigation.navigate('Games', { screen: game })} style={styles.room}>
            <MaterialCommunityIcons name='volume-high' style={styles.roomIcon} />
            <Text style={styles.roomTitle}>Truth Or Dare</Text>
            {/* <Text style={styles.roomTitle}>In room - Truth or Dare</Text> */}
          </Touchable>
        )}
        {!isConnected && (
          <View style={styles.bubble}>
            <Text style={styles.text}>No network connection</Text>
          </View>
        )}
      </SafeAreaView>
  )
}


const mapStateToProps = state => ({
  game: state.games.games.game,
  room: state.games.truthOrDare.room,
})

export default connect(
  mapStateToProps,
  // { getUser, clearToken, setTheme }
)(StatusBar);

const statusHeight = DefaultStatusBar.currentHeight;
const STATUSBAR_HEIGHT = DefaultStatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    // zIndex: 1
  },
  appBar: {
    backgroundColor:'#79B45D',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
  status: {
    zIndex: 1,
    height: statusHeight
  },
  messageContainer: {
      zIndex: 1,
      position: "absolute",
      top: statusHeight + 20,
      right: 0,
      left: 0,
      height: 80,
      alignItems: 'center',
      backgroundColor: 'green'
  },
  bubble: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: 'red',
  },
  text: {
      color: 'white',
      color: 'black',
  },
});
