import React, { useState } from 'react'
import { Container, TextInput, Button, Toast } from '../../components'
import { styles } from './style'
import { Text } from '../../utils/text'
import { ActivityIndicator, ToastAndroid, View } from 'react-native'
import { colors } from '../../utils/colors'
import UserApi from '../../api/user'
import { useNavigation } from '@react-navigation/native'
import { HOME } from '../../utils/screens'

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState(null);
    const { navigate } = useNavigation();

    const signinUser = async (email, password) => {
        setError(null);
        setLoading(true);
        const { user, error } = await UserApi.signin(email, password);
        if (user) {
            setLoading(false);
            navigate(HOME);
        } 
        if(error) {
            setError(error.code);
            setLoading(false);
            setVisible(true);
            setTimeout(() => {
                setVisible(false);
            }, 3000);
        };
    };

    return (
        <Container style={styles.container}>
            <View style={styles.form}>
                <TextInput autoCapitalize={'none'} onChangeText={(value) => setEmail(value)} placeholder={Text.email} value={email} iconName="email" />
                <TextInput onChangeText={(value) => setPassword(value)} password placeholder={Text.password} value={password} iconName="lock" />
                <Button label={Text.signin} onPress={() => signinUser(email, password)} />
                {loading && <ActivityIndicator size={"small"} color={colors.white} style={styles.loading} />}
                {visible ? <Toast
                    visible={visible}
                    message={error}
                    onVisible={setVisible}
                /> : null}
            </View>
        </Container>
    )
}

export default Signin;