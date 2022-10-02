import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { colors } from '../../utils/colors'
import { fontScale } from '../../utils/functions'
import { images } from '../../utils/images'
import ImageView from '../Image'
import TextView from '../TextView'
import { styles } from './style'

const Header = ({ title, subtitle, onPressTitle, titleInput, onChangeTitle, onSaveTitle, subtitleColor, disableGoBack, source, onRightIconPress, rightIcon, normal, color }) => {
    const { goBack } = useNavigation();
    return (
        normal
            ?
            <View style={styles.container}>
                <Icon name="chevron-left" color={color || colors.white} size={35} onPress={() => goBack()} />
                <View style={styles.normalTitle}>
                    <TextView center bold fontSize={17} color={color || 'white'}>{title}</TextView>
                </View>
            </View>
            :
            <View style={styles.container}>
                {disableGoBack ? <View style={styles.nullContent} /> : <Icon name="chevron-left" color={colors.white} size={35} onPress={() => goBack()} />}
                <ImageView size={fontScale(50)} circle source={source} />
                <View style={styles.textContainer}>
                    {
                        titleInput == true
                            ?
                            <View style={styles.updatingTitle}>
                                <TextInput placeholder={title} value={title} style={styles.input} onChangeText={onChangeTitle} />
                                <View style={styles.checkContainer}>
                                    <ImageView onPress={onSaveTitle} size={18} source={images.check} color={'white'} />
                                </View>
                            </View>
                            :
                            <TextView onPress={onPressTitle} bold fontSize={17} color={'white'}>{title}</TextView>
                    }
                    <TextView fontSize={12} color={subtitleColor || 'white'}>{subtitle}</TextView>
                </View>
                <View style={styles.rightContent}>
                    {
                        onRightIconPress
                            ?
                            <TouchableOpacity onPress={onRightIconPress}><ImageView size={fontScale(30)} color={colors.white} source={rightIcon || images.settings} /></TouchableOpacity>
                            :
                            null
                    }
                </View>
            </View>
    )
}

export default Header