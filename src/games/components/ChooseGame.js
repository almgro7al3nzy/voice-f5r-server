import React from 'react';
import { View, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '@react-navigation/native';

import TruthOrDareLogo from '../TruthOrDare/components/Logo';
import NeverHaveIEverLogo from '../NeverHaveIEver/components/Logo';
import WouldYouRatherLogo from '../WouldYouRather/components/Logo';
import { Touchable, Text } from '../../Components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const ChooseGame = ({ setGameIndex, gameIndex, onChooseGame, index, activeTab, navigation }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // flex: 1,
      backgroundColor: colors.card,
    },    
    pagination: {
      // position: "absolute",
      // bottom: 8,
      bottom: 15,
      width: "100%",
      justifyContent: "center",
      flexDirection: "row",
    },
    paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 2,
    },
    roleChatItem: {
      justifyContent: 'center',
      alignItems: 'center',

      width: Dimensions.get('window').width,
      height: 150,
    },
    roleChatIcon: {
      fontSize: 40,
      color: colors.text3,

      borderRadius: 10,
      backgroundColor: colors.background,
      marginHorizontal: 20,
      marginVertical: 5,
      padding: 20,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',

      // width: 150,
      // height: 150,
    },
    roleChatTitle: {
      fontSize: 16,
      color: colors.text,
      fontWeight: 'bold',
    },
  };

  const onScroll = e => {
    const slideSize = e.nativeEvent.layoutMeasurement.width;
    const index = e.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== gameIndex && !isNoMansLand) setGameIndex(roundIndex);

    
  }

  

  return (
    <View>
      <ScrollView 
        contentContainerStyle={styles.container}      
        decelerationRate='fast'
        snapToInterval={Dimensions.get('window').width}
        snapToAlignment='start'
        showsHorizontalScrollIndicator={false}
        horizontal
        onScroll={onChooseGame}
        bounces={false}
        pagingEnabled
      >
        {activeTab === 'Party Games' && (
          <>
            <TruthOrDareLogo />
            <NeverHaveIEverLogo />
            <WouldYouRatherLogo />
          </>
        )}
        {/* {activeTab === 'Voice Chats' && (
          <>
            <Touchable
              background={colors.background4}
              style={styles.roleChatItem}
              onPress={() => navigation.navigate('Chats', { screen: 'Pins', params: { chatId: 2 }})} 
            >
              <MaterialCommunityIcons name={'bed'} style={styles.roleChatIcon} />
              <Text style={styles.roleChatTitle}>{'Roommate'}</Text>
            </Touchable>

            <Touchable 
              background={colors.background4}
              style={styles.roleChatItem}
              onPress={() => navigation.navigate('Chats', { screen: 'Chat', params: { chatId: 2 }})} 
            >
              <MaterialCommunityIcons name={'translate'} style={styles.roleChatIcon} />
              <Text style={styles.roleChatTitle}>{'Language Exchange'}</Text>
            </Touchable>
          </>
        )} */}
      </ScrollView>
      <View style={styles.pagination} pointerEvents='none'>
          {Array.from(Array(3).keys()).map((_, i) => {
            const backgroundColor = 
            index === i 
            // || !gameIndex && i === 0 
            ? colors.background2 : colors.background;

            

            return <View key={i} style={[ styles.paginationDot, {backgroundColor}]} />            
          })}
        </View>
    </View>
  );
};

export default ChooseGame;