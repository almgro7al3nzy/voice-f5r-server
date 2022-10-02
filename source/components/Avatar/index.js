import React from 'react';
import { View } from 'react-native';
import { generateRandomColor } from '../../utils/functions';
import ImageView from '../Image';
import TextView from '../TextView';

const Avatar = ({ size, source, text = "" ,backgroundColor}) => {
    return (
        source
            ?
            <ImageView circle size={size} source={source} />
            :
            <ImageView circle size={40} label={text.substring(0, 1)} backgroundColor={backgroundColor} />
    )
}

export default Avatar