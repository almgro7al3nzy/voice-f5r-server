import { useTheme } from "@react-navigation/native";
import React from "react";
import { TouchableHighlight, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from './Text';


const HeaderIcon = ({ name, text, position, disabled, ...rest }) => {
  const { colors } = useTheme();

  const style = {
    // borderRadius: 15, 
    // padding: 5,

    // paddingHorizontal: 15, 
    // paddingVertical: 5,
    // backgroundColor: colors.background, 
    ...(position === 'right' && { marginRight: 15 }),
    ...(position === 'left' && { marginLeft: 15 })
  }

  // const color = disabled ? colors.text3 : colors.primary;
  const color = disabled === false ? colors.primary : colors.text3;

  // 
  // 

  return (
    <TouchableHighlight disabled={disabled} underlayColor={colors.border} style={style} {...rest}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        {name && <MaterialCommunityIcons name={name} size={25} color={colors.text2} />}
        {text && <Text style={{ fontSize: 18, fontWeight: 'bold', color }}>{text}</Text>}
      </View>
    </TouchableHighlight>
  );
}

export default HeaderIcon;
