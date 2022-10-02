import React from 'react'
import { Modal, Platform, View } from 'react-native'
import { colors } from '../../utils/colors'
import TextView from '../TextView'
import { styles } from './style'

const Toast = ({ message, onVisible }) => {
    return (
        <Modal
            transparent
            visible={true}
            statusBarTranslucent
            animationType={Platform.OS=="ios" ? "slide" : "fade"}
            onShow={onVisible}>
            <View style={styles.container}>
                <TextView color={colors.black}>{message}</TextView>
            </View>
        </Modal>
    )
}

export default Toast