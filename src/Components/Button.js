import { useTheme } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../colors';


const Button = ({ children, type, icon, onPress, disabled, ...rest }) => {
    const { colors } = useTheme();

    const color = { color: 
        !type || type === 1 ? 'white' : 
        type === 2 ? 'blueviolet' : 'black' 
    };

    return (
        <TouchableOpacity 
            style={disabled ? disabledStyles[type] : type ? styles[type] : styles[1]} 
            onPress={onPress} 
            disabled={disabled} 
            // activeOpacity={0.5}
            {...rest} 
        >
            {icon && <MaterialCommunityIcons name={icon} size={24} color={colors.primary} />}
            <Text style={[ styles.text, !disabled ? color : { color: 'grey' } ]}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

export default Button

const disabledStyles = StyleSheet.create({
    1: {
        height: 50,
        width: 300,
        // alignSelf: 'stretch',
        backgroundColor: '#eee',
        marginTop: 10,
        borderRadius: 15,
        padding: 10,

        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    text: {
        // color: 'black',
        fontSize: 18,
        // fontWeight: 'bold'
    },
    2: {
        height: 50,
        width: 300,
        // alignSelf: 'stretch',
        // backgroundColor: '#eee',
        marginTop: 10,
        borderRadius: 15,
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    // 2Text: {
    //     color: 'black',
    //     color: 'blueviolet',
    //     fontSize: 18
    // },
    3: {
        height: 50,
        width: 300,
        // alignSelf: 'stretch',
        marginTop: 10,
        borderRadius: 15,
        padding: 10,

        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
});

const styles = StyleSheet.create({
    1: {
        height: 50,
        width: 300,
        // alignSelf: 'stretch',
        backgroundColor: '#eee',
        marginTop: 10,
        borderRadius: 15,
        padding: 10,

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blueviolet',
        padding: 10
    },
    text: {
        // color: 'black',
        fontSize: 18,
        // fontWeight: 'bold'
    },
    2: {
        height: 50,
        width: 300,
        // alignSelf: 'stretch',
        // backgroundColor: '#eee',
        marginTop: 10,
        borderRadius: 15,
        padding: 10,
        borderWidth: 0.5,
        borderColor: 'grey',
        borderColor: 'blueviolet',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    // 2Text: {
    //     color: 'black',
    //     color: 'blueviolet',
    //     fontSize: 18
    // },
    3: {
        height: 50,
        width: 300,
        // alignSelf: 'stretch',
        marginTop: 10,
        borderRadius: 15,
        padding: 10,

        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    // 3Text: {
    //     color: 'black',
    //     fontSize: 18
    // },
})
