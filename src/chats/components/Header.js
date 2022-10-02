import { useTheme } from '@react-navigation/native';
import React from 'react'
import {
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

const Header = ({ name, icon, onPress }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // paddingLeft: 24,
      // backgroundColor: 'white',
      // width: '100%',
    },
    title: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    avatar: {
      width: 50, 
      height: 50, 
      borderRadius: 25,    
    },
    name: {    
      marginLeft: 10,
      color: colors.text2,
      fontWeight: 'bold',
      fontSize: 20,
    }
  };

  return (
    <TouchableOpacity
      underlayColor={colors.grey}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.title}>
        <Image style={styles.avatar} source={{ uri: icon }} />
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Header;

