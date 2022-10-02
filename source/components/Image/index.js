import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { colors } from '../../utils/colors'
import { images } from '../../utils/images'
import TextView from '../TextView'
import { styles } from './style'

const ImageView = ({ source, size, width, height, circle, color, onPress, label, backgroundColor ,style}) => {
    return (
        onPress ?
            <TouchableOpacity style={style} onPress={onPress}>
                <Image source={source ?? images.avatar} resizeMode="cover" style={{ tintColor: color, width: size || width, height: size || height, borderRadius: circle ? size / 2 : 0 }} />
            </TouchableOpacity>
            :
            label
                ?
                <View style={{ ...style,...styles.textOnly, width: size, height: size, borderRadius: size / 2, backgroundColor }}>
                    <TextView color={colors.white} bold fontSize={18}>{label}</TextView>
                </View>
                :
                <Image source={source ?? images.avatar} resizeMode="cover" style={{ ...style,tintColor: color, width: size || width, height: size || height, borderRadius: circle ? size / 2 : 0 }} />
    )
}

export default ImageView