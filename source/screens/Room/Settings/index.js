import React, { useState } from 'react'
import { Operation, Header, Container, TextInput, Button } from '../../../components'
import { ImageBackground, View } from 'react-native';
import { images } from '../../../utils/images';
import { Text } from '../../../utils/text';
import { styles } from './style';
import ToggleSwitch from 'toggle-switch-react-native'
import { colors } from '../../../utils/colors';
import TextView from '../../../components/TextView';
import { fontScale } from '../../../utils/functions';

const RoomSettings = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <Container>
      <ImageBackground source={images.sky} resizeMode="cover" style={styles.container}>
        <Header normal title={Text.roomsettings} />
        <View style={styles.content}>
          <View style={styles.voiceMenu}>
            <TextView color={colors.white} bold fontSize={fontScale(15)}>Turn on voice chat</TextView>
            <ToggleSwitch
              isOn={toggle}
              onColor={colors.blue}
              offColor={colors.grey}
              size="medium"
              onToggle={isOn => setToggle(isOn)}
            />
          </View>
        </View>
      </ImageBackground>
    </Container>
  )
}

export default RoomSettings