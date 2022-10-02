import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import UserApi from '../../api/user'
import { fontScale, generateRandomColor } from '../../utils/functions'
import Avatar from '../Avatar'
import ImageView from '../Image'
import { styles } from './style'

const ChatListItem = ({ right, message, label }) => {
    const [name,setName] = useState('');
    useEffect(()=>{
        const getNameByUId = async(uid) => {
            const { result } = await UserApi.getUserByUid(uid);
            setName(result?.name)
            console.log(result)
        }
        getNameByUId()
    },[message]);

    if (right) {
        return (
            <View style={styles.rightContainer}>
                <Text>{message}</Text>
            </View>
        )
    } else {
        return (
            <View style={{ flexDirection: "row",marginVertical:fontScale(5) }}>
                <Avatar text={name} backgroundColor={'#4e73ff'} />
                <View style={styles.leftContainer}>
                    <Text>{message}</Text>
                </View>
            </View>
        )
    }
}

export default ChatListItem