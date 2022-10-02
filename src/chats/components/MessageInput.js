import { useTheme } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EmojiSelector, { Categories } from "react-native-emoji-selector";



import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


const Toolbar = ({ 
  onPressCamera, 
  onPressLocation, 
  onSubmit, 
  onChangeFocus, 
  isFocused 
}) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      // flex: 1,
      
    },
    toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 16,
    backgroundColor: 'white',
    },
    button: {
    top: -2,
    marginRight: 12,
    fontSize: 20,
    color: colors.text2,
    },
    inputContainer: {
    flex: 1,
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: 'rgba(0,0,0,0.04)',
    borderRadius: 7,
    // paddingVertical: 4,
    paddingVertical: 0,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.02)',
    backgroundColor: colors.background,
    },
    input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 5,
    borderRadius: 10,
    },
    buttons: {
      flexDirection: 'row',
    },
    emojis: {
      flex: 1,
    }
  };

  const [text, setText] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);


  const inputRef = useRef();

  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    }
    else {
      inputRef.current.blur();
    }
  }, [isFocused])

  const handleFocus = () => {
    onChangeFocus(true);
  }

  const handleBlur = () => {
    onChangeFocus(false);
  }

  const handleSubmit = () => {
    if (!text) return;

    onSubmit(text);
    setText('');
  }

  

  return (
    <View style={styles.container}>
      <View style={styles.emojis}>
     <EmojiSelector onEmojiSelected={emoji => {}} />
     </View>

    <View style={styles.toolbar}>      
      <ToolbarButton icon={showEmojis ? 'keyboard' : 'emoticon'} onPress={() => setShowEmojis(!showEmojis)} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          ref={inputRef}
          underlineColorAndroid='transparent'
          placeholder='Message'
          blurOnSubmit={false}
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleSubmit}
          onFocus={handleFocus}
          onBlur={handleBlur}
          // autoFocus={true}
        />
      </View>
      {!Boolean(text) && (
        <View style={styles.buttons}>
          <ToolbarButton icon='attachment' onPress={onPressCamera} style={{ transform: [{ rotate: '45deg' }] }} />
          {/* <ToolbarButton icon='attachment' onPress={handlePressCamera} style={{ transform: [{ rotate: '45deg' }] }} /> */}
          <ToolbarButton icon='microphone' onPress={handleSubmit} />
        </View>
      )}
      {Boolean(text) && (
        <View>
          <ToolbarButton icon='send' onPress={handleSubmit} />
        </View>
      )}

    </View>
      {/* {showEmojis && ( */}
      {/* <View style={styles.emojis}>
          <EmojiSelector
            
            category={Categories.symbols}
            onEmojiSelected={emoji => 
          />
        </View> */}
      {/* )} */}
      </View>
  );
}

export default Toolbar




const ToolbarButton = ({ icon, style, onPress, ...rest }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={{ margin: 5, ...style }} onPress={onPress} {...rest}>
      <MaterialCommunityIcons 
        name={icon} 
        size={28} 
        color={colors.text3} 
        // style={{ ...styles.button, ...style }}
      />
    </TouchableOpacity>
  );
}
