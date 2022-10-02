import React from 'react';
import {
  FlatList,
  View,
  Dimensions,
  StyleSheet,
  Image,
  StatusBar, 
  TouchableOpacity,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from '@react-navigation/native';
import { useHeaderHeight } from "@react-navigation/stack";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import LinearGradient from 'react-native-linear-gradient';

import { useSafeAreaInsets, useSafeAreaFrame, SafeAreaView  } from 'react-native-safe-area-context';
import { Text, Touchable, Grid, Avatar, Button2 } from '../../Components';


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");



// const VoiceChatItem = ({ name, age, photosSources }) => {
const VoiceChatItem = ({ participants }) => {
  const { colors } = useTheme();

  const styles = {
    // container: {
    //   // flex: 1,

    //   height: windowHeight,
    //   height: Dimensions.get('window').height 
    //   - useHeaderHeight() 
    //   // - useBottomTabBarHeight() 
    //   - StatusBar.currentHeight
    //   ,
    //   width: windowWidth,

    //   backgroundColor: colors.card,
    //   // backgroundColor: 'red',

    //   paddingHorizontal: 10,
    // },
    container: {
      backgroundColor: colors.card,
      paddingLeft: 10,
      borderRadius: 5,
      paddingBottom: 10,
    },
    participants: {
      // flex: 1,
      // width: windowWidth,
    },
    // slide: {
    //   height: windowHeight,
    //   width: windowWidth,
    //   justifyContent: "center",
    //   alignItems: "center",
    // },
    // slideImage: { width: windowWidth * 0.9, height: windowHeight * 0.7 },
    // slideTitle: { fontSize: 24 },
    // slideSubtitle: { fontSize: 18 },
  
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
    // paginationDotActive: { backgroundColor: "lightblue" },
    // paginationDotInactive: { backgroundColor: "gray" },
  
    carousel: { flex: 1 },

    imageContainer: {
      // flex: 1,
      // padding: 10,
      // backgroundColor: 'purple',

    },
    image: {
      height: '100%',
      width: '100%',
      width: windowWidth,
      
      // height: windowHeight,
      height: windowWidth,
      // width: 100,

      // resizeMode: 'cover',
      // zIndex: -1,
      
      // backgroundColor: 'green',
      // padding: 10,
    },
    // slider: {
    //   backgroundColor: 'green',
    //   flex: 1,
    // },
    // pagination: {
    //   backgroundColor: 'yellow',
    //   flex: 1,
    // },
    slides: {
      // backgroundColor: 'red',
    },
    prompts: {
      // justifyContent: 'space-around',
      // alignItems: 'space-around',      
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      flex: 1,
      // paddingHorizontal: 15,
    },
    prompt: {
      // backgroundColor: colors.background,
      // backgroundColor: colors.darkTranslucent2,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',

      marginHorizontal: 5,
      marginVertical: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,

      borderRadius: 5,

      borderWidth: 0.5,
      borderColor: colors.border2,
    },
    promptTitle: {
      fontSize: 14,
      color: colors.text,
      // color: colors.textInverse,
    },
    promptIcon: {
      fontSize: 20,
      color: colors.text3,
      // color: colors.textInverse,
      marginRight: 5,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      width: '100%',
    },
    name: {
      color: colors.textInverse,
      color: colors.text,
      fontSize: 18,
      fontWeight: 'bold',
    },
    age: {
      color: colors.textInverse,
      color: colors.text,
      fontSize: 16,
      fontWeight: 'normal',
      // marginHorizontal: 10,
    },
    actionButton: {
      fontSize: 25,
      color: colors.primary,
      color: colors.text,
      paddingTop: 10,
    },

    photoSlider: {
      flex: 1,
    },
    prevPhoto: {
      // flex: 1,
      // backgroundColor: 'red',
      width: windowWidth / 2,
      // height: windowWidth,
      // zIndex: 3,

      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
    },
    nextPhoto: {
      // backgroundColor: 'blue',
      width: windowWidth / 2,
      // height: windowWidth,

      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
    },
    intro: {
      position: 'absolute',
      bottom: 30,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 15,

      // marginHorizontal: 5,
      // padding: 10,
      // backgroundColor: 'blue',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      // paddingHorizontal: 20,
      paddingVertical: 10,

      // backgroundColor: 'green',
    },
    prompts: {
      // flexGrow: 1,
      // backgroundColor: 'red',
      // backgroundColor: colors.background4,

      paddingLeft: 5,
    },
    personItem: {
      // paddingHorizontal: 20,
      // marginVertical: 20,
    },

  
    // content: {
    //   flex: 1,
    //   flexDirection: 'row',
    //   justifyContent: 'space-between',
    //   alignItems: 'flex-end',
    //   backgroundColor: 'blue',
    // },
  };

  const [index, setIndex] = React.useState(0);
  const indexRef = React.useRef(index);
  indexRef.current = index;

  const onScroll = e => {
    const slideSize = e.nativeEvent.layoutMeasurement.width;
    const index = e.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) setIndex(roundIndex);
  }

  const prompts =  [ 
    // { icon: 'map-marker', title: 'Milano' }, 
    // { icon: 'cash', title: '400 EUR/month' }, 
    // { icon: 'timetable', title: '2 years' }, 

    { icon: 'account-hard-hat', title: 'Student' }, 
    { icon: 'account-multiple', title: 'Overnight guests' }, 
    { icon: 'silverware-clean', title: 'Cleaning' }, 
    { icon: 'power-sleep', title: '12AM' }, 
    { icon: 'account-heart', title: 'Yes with visits' }, 
    { icon: 'gamepad-variant', title: 'Gaming' }, 
    // { icon: 'translate', title: ['English', 'Italian', 'Spanish'] },
    { icon: 'translate', title: 'English, Italian, Spanish' },
    { icon: 'smoking', title: 'No Smoking'},
    { icon: 'paw', title: 'No Pets'},
    { icon: 'music', title: 'Loud music'},

  ];

  const renderPhotoItem = ({ item }) => {
    return (
      <View style={styles.photoSlider}>
        <Image source={{ uri: item }} style={styles.image} />
        <TouchableWithoutFeedback onPress={() => setIndex(index - 1)}>
          <View style={styles.prevPhoto}/>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setIndex(index + 1)}>
          <View style={styles.nextPhoto}/>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  const renderPromptItem = ({ item: { icon, title } }) => {
    return (
      <View style={styles.prompt}>
        <MaterialCommunityIcons name={icon} style={styles.promptIcon} />
        <Text style={styles.promptTitle}>{title}</Text>
      </View>
    );
  }

  const promptsOnScreen = index === 0 ? prompts.slice(1,4) : prompts.slice(4);

  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.participants}>
        {participants.map(({ id, name, age, photosSources, avatar, avatarSource }) => {
          
          return (
            <View style={styles.personItem}>
              <View style={styles.row}>
              {/* <Image source={{ uri: avatarSource }} style={styles.avatar} /> */}
              <Avatar avatar={avatar} />
              <View >
                <TouchableOpacity style={styles.header}>
                <Text style={styles.name}>{name && name.split(' ')[0]} <Text style={styles.age}>{Math.round(age / 31556952000)}</Text></Text>
                </TouchableOpacity>

                  <FlatList
                    data={prompts}
                    // renderItem={({item}) => <VoiceChatItem {...item} onJoinVoice={() => {}} socket={socket} />}
                    renderItem={renderPromptItem}
                    keyExtractor={({icon}) => icon}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    style={styles.prompts}

                    // snapToAlignment={'start'}
                    // decelerationRate={'fast'}
                    // snapToInterval={Dimensions.get('screen').width}
                  />
                </View>
              </View>
              {/* <FlatList
                data={prompts}
                // renderItem={({item}) => <VoiceChatItem {...item} onJoinVoice={() => {}} socket={socket} />}
                renderItem={renderPromptItem}
                keyExtractor={({icon}) => icon}
                showsHorizontalScrollIndicator={false}
                horizontal
                style={styles.prompts}

                // snapToAlignment={'start'}
                // decelerationRate={'fast'}
                // snapToInterval={Dimensions.get('screen').width}
              /> */}
            {/* <View style={styles.prompts}>          
              {promptsOnScreen.map(({icon, title}) => {
                return (
                  <Touchable style={styles.prompt}>
                    <MaterialCommunityIcons name={icon} style={styles.promptIcon} />
                    <Text style={styles.promptTitle}>{title}</Text>
                  </Touchable>
                )
              })}
            </View> */}
            </View>
          )
        //   
        // return (
        // <View key={id}>
        // {/* <LinearGradient colors={['transparent', 'transparent', 'rgba(0,0,0,0.5)']} start={{ x: 0.5, y: 0.5}} style={styles.content}> */}
        //   <View style={styles.photoSlider}>
        //     <Image source={{ uri: avatarSource }} style={styles.image} />
        //     <TouchableWithoutFeedback onPress={() => setIndex(index - 1)}>
        //       <View style={styles.prevPhoto}/>
        //     </TouchableWithoutFeedback>
        //     <TouchableWithoutFeedback onPress={() => setIndex(index + 1)}>
        //       <View style={styles.nextPhoto}/>
        //     </TouchableWithoutFeedback>
        //   </View>
        // {/* <FlatList
        //   data={photosSources}
        //   // renderItem={({item}) => <Image source={{ uri: item }} style={styles.image} />}
        //   renderItem={renderPhotoItem}
        //   keyExtractor={(item) => item.toString()}
        //   listKey={id.toString()}
        //   style={styles.slides}
        //   pagingEnabled
        //   horizontal
        //   showsHorizontalScrollIndicator={false}
        //   bounces={false}
        //   onScroll={onScroll}
        // /> */}
        // <View style={styles.pagination} pointerEvents='none'>
        //   {photosSources.map((_, i) => {
        //     const backgroundColor = index === i ? colors.primary : colors.background3;
        //     return <View key={i} style={[ styles.paginationDot, {backgroundColor}]} />            
        //   })}
        // </View>

        // <View style={styles.intro}>
        // <View style={styles.header}>
        //   <TouchableOpacity>
        //     <Text style={styles.name}>{name && name.split(' ')[0]} <Text style={styles.age}>{Math.round(age / 31556952000)}</Text></Text>
        //   </TouchableOpacity>
        //   {/* <TouchableOpacity style={styles.actionButton2}>
        //     <Ionicons name='send-outline' color={colors.success} style={styles.actionButton} />
        //   </TouchableOpacity> */}
        // </View>
        // <View style={styles.prompts}>          
        //   {promptsOnScreen.map(({icon, title}) => {
        //     return (
        //       <Touchable style={styles.prompt}>
        //         <MaterialCommunityIcons name={icon} style={styles.promptIcon} />
        //         <Text style={styles.promptTitle}>{title}</Text>
        //       </Touchable>
        //     )
        //   })}
        // </View>
        // </View>

        // {/* </LinearGradient> */}
        // </View>
        // );
        })}

        <Button2 title='Join Room' />
      </ScrollView>
    </View>
  );
}

export default VoiceChatItem;