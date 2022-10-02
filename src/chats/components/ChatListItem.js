import React from 'react';
import { Image, TouchableOpacity, TouchableHighlight, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text, Touchable } from '../../Components';
import { pluralize } from '../../utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const BoardItem = ({ id, name, icon, onPress, pins, watchers, space, owner }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flexDirection: 'row',
      // justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.border2,

      background: colors.card,
      background: 'green',
    },
    icon: {
      width: 50,
      height: 50,
      borderRadius: 10,
    },
    item: {
      marginHorizontal: 10,
    },
    notification: {

    },
    row: {
      flexDirection: 'row',
      // justifyContent: 'center',
      alignItems: 'center',
    },
    boardName: {
      color: colors.text,
      // color: colors.primary,
      fontWeight: 'bold',
    },
    spaceName: {
      color: colors.text3,
      marginHorizontal: 10,
    },
    pinsCount: {
      color: colors.text3,
      color: colors.text,
      // color: colors.primary,

      // fontWeight: 'bold',
    },
    watchersCount: {
      color: colors.text3,
      marginHorizontal: 10,
      // fontWeight: 'bold',
    },
    separatorIcon: {
      color: colors.text3,
      fontSize: 25,
      marginHorizontal: 5,
    }
  };

  // 
  

  return (
    <Touchable style={styles.container} onPress={onPress}>      
        <MaterialCommunityIcons name={icon} style={styles.separatorIcon} />
        <View style={styles.item}>
          <View style={styles.row}>
            <Text style={styles.boardName}>{name}</Text>
            {/* <Text style={styles.spaceName}>{space.name}</Text> */}
          </View>

          <View style={styles.row}>
            {/* <Text style={styles.pinsCount}>{pluralize(pins.length, 'pin')}</Text> */}
            
            {/* <Text style={styles.watchersCount}>{pluralize(watchers.length, 'watcher')}</Text> */}
          </View>
          {/* <Text style={styles.spaceName}>{space && space.name}</Text> */}
        </View>      
      </Touchable>
  );
}

export default BoardItem;