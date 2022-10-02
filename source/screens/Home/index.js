import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, ImageBackground, FlatList } from 'react-native'
import { auth } from '../../api/constant'
import RoomApi from '../../api/room'
import UserApi from '../../api/user'
import { HomeListItem, Container, TextInput, Button, Header, TextView } from '../../components'
import { colors } from '../../utils/colors'
import { images } from '../../utils/images'
import { ROOM, SETTINGS } from '../../utils/screens'
import { Text } from '../../utils/text'
import { styles } from './style'

const Home = () => {
    const [roomList, setRoomList] = useState([]);
    const [tempRoomList, setTempRoomList] = useState([]);
    const [updatingName,setUpdatingName] = useState(false);
    const [user, setUser] = useState({});
    const [message, setMessage] = useState('')

    const navigation = useNavigation();

    const searchRoom = (text = '') => {
        if (tempRoomList.length > 1) {
            setMessage('');
            tempRoomList.concat(tempRoomList);
            const newData = tempRoomList.filter(item => {
                const itemData = `${item.roomName.toUpperCase()}`;
                return itemData.indexOf(text.toUpperCase()) > -1;
            });
            if (text.length > 0) {
                if (newData.length > 0) {
                    setTempRoomList(newData);
                } else {
                    setMessage(Text.dataNotFound);
                    setTempRoomList([])
                }

            } else if (text.length == 0) {
                setTempRoomList(roomList);
            }
        } else {

        }
    }

    const createRoom = () => {
        try {
            const roomName = "Noname";
            const { uid } = auth.currentUser;
            RoomApi.createRoom(roomName, uid).then(({ roomId, roomName }) => {
                navigation.navigate(ROOM, { roomId, roomName, uid });
            });
        } catch (error) {
            console.log(error);
        }
    }

    const getRoomList = () => {
        try {
            RoomApi.getRoomList().then((res) => {
                setRoomList(res);
                setTempRoomList(res);
            });
        } catch (error) {
            console.log(error);
        }
    }

    const getUserInfor = () => {
        try {
            UserApi.getUserByUid().then(({ result, error }) => {
                setUser(result)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRoomList();
        getUserInfor();
    }, [])
    return (
        <Container>
            <ImageBackground source={images.sky} resizeMode="cover" style={styles.container}>
                <Header
                    onChangeTitle={(value) => setTitle(value)}
                    onSaveTitle={() => onSaveTitle(title)}
                    onPressTitle={() => setUpdatingName(true)}
                    onRightIconPress={() => navigation.navigate(SETTINGS)}
                    disableGoBack
                    title={user.name}
                    subtitle={'Active now'}
                    style={styles.header} />

                <View style={styles.topContainer}>
                    <TextInput onChangeText={(value) => searchRoom(value)} autoFocus={true} placeholder='Search room' iconName={'search'} style={styles.searchContainer} />
                </View>
                <View style={styles.middleContainer}>
                    {message && tempRoomList.length == 0 ? <TextView color={colors.white} bold center>{message}</TextView> : null}
                    <FlatList
                        data={tempRoomList}
                        keyExtractor={(item, index) => item.roomId}
                        renderItem={({ item, index }) => {
                            return <HomeListItem label={item.roomName} onPress={() => navigation.navigate(ROOM, { roomId: item.roomId, roomName: item.roomName, uid: item.creator })} />
                        }}
                    />
                </View>
                <View style={styles.bottomContainer}>
                    <Button label="Create Room" flex={1} style={styles.createRoom} onPress={() => createRoom()} />
                    <Button label="Join Room" flex={1} style={styles.joinRoom} />
                </View>
            </ImageBackground>
        </Container>
    )
}

export default Home