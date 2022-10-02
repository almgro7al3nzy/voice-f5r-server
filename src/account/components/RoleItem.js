import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import { useTheme } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, Touchable } from '../../Components';



const RoleItem = ({ id, name, icon, onPress, ...rest }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flexDirection: 'row',
      // justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 15,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.border,
      backgroundColor: colors.card,
    },
    icon: {
      // width: 50,
      // height: 50,
      // borderRadius: 10,

      fontSize: 25,
      color: colors.text3
    },
    item: {
      marginHorizontal: 10,
    },
    notification: {

    },
    name: {
      color: colors.text,
      fontSize: 14,
    },
  };

  return (
    <Touchable onPress={() => onPress(id)} background={colors.background4} style={styles.container} {...rest}>
        {icon && <MaterialCommunityIcons name={icon} style={styles.icon} />}
        <View style={styles.item}>
          <Text style={styles.name}>{name}</Text>
          {/* <Text style={styles.notification}></Text> */}
        </View>
    </Touchable>
  )

  return (
    <TouchableHighlight underlayColor={colors.border} {...rest}>
      <View style={styles.container}>
        {icon && (
          <MaterialCommunityIcons
            // name={`${icon}-outline`}
            name={icon}
            size={30}
            color={colors.text}
          />
        )}
        <View style={styles.item}>
          <Text style={styles.name}>{name}</Text>
          {/* <Text style={styles.notification}></Text> */}
        </View>
      </View>
    </TouchableHighlight>
  );
}

export default RoleItem;