import { useTheme } from '@react-navigation/native';
import React from 'react'
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Image,
  TouchableNativeFeedback,
  Pressable
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const ContactItem = ({ name, icon, participants, onPress }) => {
  const { colors } = useTheme();
  const styles = {
    container: {
      // paddingLeft: 24,
      backgroundColor: colors.background,
    },
    contactInfo: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 16,
      backgroundColor: colors.card,
      borderBottomColor: colors.border,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    icon: {
      borderRadius: 22,
      width: 44,
      height: 44,
      fontSize: 44,
      color: colors.text3,
      // color: colors.primary,
    },
    image: {
      borderRadius: 22,
      width: 44,
      height: 44,
    },
    details: {
      justifyContent: 'center',
      // alignItems: 'center',
      // flex: 1,
      marginLeft: 10,
    },
    title: {
      color: colors.text,
      fontWeight: 'bold',
      fontSize: 16,
      // justifyContent: 'center',
    },
    subtitle: {
      color: colors.text2,
      fontSize: 15,
      marginTop: 4,
    },
  };

  
  
  return (
    <TouchableNativeFeedback
    
    // android_ripple={{ color: colors.background, borderless: false, radius: 10 }}
      underlayColor={colors.grey}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.contactInfo}>
        {icon && icon.startsWith('http') && (
          <Image style={styles.image} source={{ uri: icon }} />
        )}
        {icon && !icon.startsWith('http') && (
          <MaterialCommunityIcons name={icon} style={styles.icon} />
        )}
        <View style={styles.details}>
          <Text style={[styles.title]}>{name}</Text>
          {/* <Text style={styles.subtitle}>{phone}</Text> */}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

export default ContactItem;
