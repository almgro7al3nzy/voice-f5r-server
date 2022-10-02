import React, { useState } from 'react'
import { Animated, View, TouchableOpacity, Platform } from 'react-native'
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements'
import { colors } from '../../utils/colors'
import { fontScale } from '../../utils/functions'
import { images } from '../../utils/images'
import { Text } from '../../utils/text'
import ImageView from '../Image'
import TextField from '../TextInput'
import TextView from '../TextView'
import { styles } from './style'

const Operation = ({ onSend, onSpeechStart, onSpeechEnd, value, onChangeText }) => {
  const [showRecording, setShowRecording] = useState(false);
  const [recordingColor, setRecordingColor] = useState(colors.grey);
  const [endWave, setEndWave] = useState(true)

  const buildWaving = () => {
    onSpeechStart();
    setRecordingColor(colors.lightblue);
    setEndWave(false);
  }

  const wavingEnded = () => {
    onSpeechEnd();
    setRecordingColor(colors.grey);
    setEndWave(true);
  }

  return (
    <View>
      <View style={{ ...styles.container, bottom: Platform.OS == "android" && !showRecording ? fontScale(40) : -fontScale(10) }}>
        <TextField onChangeText={onChangeText} placeholder={Text.typeMessage} onSend={onSend} value={value} rightIcon={'micro-phone'} onRightIconPress={() => setShowRecording(!showRecording)} />
        <TouchableOpacity  onPress={onSend}>
        <Icon name="send" color={colors.blue} size={fontScale(35)}/>
        </TouchableOpacity>
      </View>
      {
        showRecording
          ?
          <Animated.View style={{ ...styles.recordingContain }}>
            <TextView center>{Text.typeToRecording}</TextView>
            <TouchableOpacity style={styles.recordingIcon} onLongPress={() => buildWaving()} onPressOut={() => wavingEnded()}>
              <ImageView source={images.microphone} size={fontScale(45)} color={endWave ? colors.grey : recordingColor} />
            </TouchableOpacity>
          </Animated.View>
          :
          null
      }
    </View>
  )
}

Operation.propTypes = {
  onSend: PropTypes.func,
  onSpeechStart: PropTypes.func,
  onSpeechEnd: PropTypes.func
};

export default Operation