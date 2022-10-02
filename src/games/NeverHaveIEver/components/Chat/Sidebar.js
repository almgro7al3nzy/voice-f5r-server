import React from 'react';
import { View, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, Touchable } from '../../../../Components';


const Sidebar = ({ showQuitModal }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      // justifyContent: 'flex-end',
      alignItems: 'center',

      // zIndex: 1,
      // backgroundColor: 'green',

      position: 'absolute',
      // right: 10,
      right: 0,
      top: 0,
      bottom: 0,
      // bottom: 200,
      // top: 50,
    },
    icon: {
      fontSize: 25,
      color: colors.lightText2,

    },
    btn: {
      width: 38,
      height: 38,
      marginHorizontal: 10,
      // marginRight: 20,
      
      // backgroundColor: colors.darkTranslucent3,
      borderRadius: 10,
      // textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      // padding: 10,
    },
    buttons: {
      // // position: 'absolute',
      // zIndex: 11,
      // bottom: 0,
      // left: 0,
      marginHorizontal: 20,
      flexDirection: 'row',
      backgroundColor: colors.darkTranslucent3,
      // backgroundColor: 'red',
      borderRadius: 10,
    },
    reaction: {
      fontSize: 30,
      marginVertical: 5,
    },
    reactions: {
      height: Dimensions.get('screen').height / 2,
      // height: 10,
      // backgroundColor: 'yellow',
      marginVertical: 20,
    }
  };

  const [showMicSettings, setShowMicSettings] = React.useState(false);


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.settings} onPress={showQuitModal}>
          <MaterialCommunityIcons name='cog' style={styles.icon} />
        </TouchableOpacity>

        <View style={[styles.reactions,]}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity>
          <Text style={styles.reaction}>😀</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>🤣</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>😋</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>🧐</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>🤨</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>😢</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>🤭</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>😨</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>🙄</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>😲</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>🥱</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>👍</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>👎</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>💪</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.reaction}>👀</Text>
        </TouchableOpacity>
      </ScrollView>
      </View>
        {/* <SidebarButton icon='cog' onPress={() => {}} />
        <SidebarButton icon='microphone-settings' onPress={() => {}} />
        <SidebarButton icon='message' onPress={() => {}} />
        <SidebarButton icon='emoticon' onPress={() => {}} /> */}
        <View style={styles.buttons}>
            
            {showMicSettings && (
          <>
          <TouchableOpacity style={styles.btn}>
              <MaterialCommunityIcons name='phone-hangup' style={[styles.icon, {color:'red'}]} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.btn} onPress={() => {}}>
              <MaterialCommunityIcons name='headphones' style={styles.icon} />
            </TouchableOpacity>

           <TouchableOpacity style={styles.btn}>
              <MaterialCommunityIcons name='microphone' style={styles.icon} />
            </TouchableOpacity>
            </>
            )}
            <Touchable
              style={[styles.btn, {marginHorizontal:0}, showMicSettings && {backgroundColor:colors.darkTranslucent4,marginLeft:10}]} 
              background={colors.darkTranslucent2}
              onPress={() => setShowMicSettings(!showMicSettings)}
            >
              <MaterialCommunityIcons name='microphone-settings' style={styles.icon} />
            </Touchable>
        </View>
    </View>
  )
}

export default Sidebar;


const SidebarButton = ({ icon, onPress }) => {

  const { colors } = useTheme();

  const styles = {
    icon: {
      color: colors.lightText2,
    },
    settings: {
      marginVertical: 10,
    },
  };

  return (
    <TouchableOpacity style={styles.settings} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={30} style={styles.icon} />
    </TouchableOpacity>
  );  
}