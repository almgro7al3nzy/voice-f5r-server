import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import UserApi from '../../api/user';
import { Operation, Header, Container, TextInput, TextView, Button } from '../../components';
import ImageView from '../../components/Image';
import { colors } from '../../utils/colors';
import { fontScale } from '../../utils/functions';
import { images } from '../../utils/images';
import { Text } from '../../utils/text';
import { styles } from './style';

const Settings = () => {
    const [user, setUser] = useState(null);
    const { navigate } = useNavigation();
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    useEffect(() => {
        const initial = async () => {
            await UserApi.getUserByUid().then(({ result, error }) => {
                setUser(result)
            })
        }
        initial();
    }, [navigate])
    return (
        <Container style={styles.container}>
            <ImageBackground source={images.sky} resizeMode="cover" style={styles.container}>
                <Header normal title={Text.settings} />

                <View style={styles.menuContainer}>
                    <ImageView size={fontScale(70)} circle style={styles.avatar} />
                    <View style={styles.inforAndMenu}>
                        <TextView color={colors.blue} bold center>{user?.name}</TextView>
                        <TextView color={colors.blue} center>{user?.email}</TextView>

                    </View>
                </View>
                <View style={styles.signoutContainer}>
                    <Button label={Text.signout} style={styles.signoutButton} onPress={() => UserApi.signout(navigate)} />
                </View>
            </ImageBackground>
        </Container>
    )
}

export default Settings