import React from 'react';
import {Image, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';

import Grid from './Grid';


const ImageGrid = ({ onPressImage, selectedImages, ...rest }) => {
  const { colors } = useTheme();

  const styles = {
    container: {

    },
    image: {
      flex: 1,
      width: 120,
      height: 120,

      backgroundColor: 'green',
    }
  };

  

  const renderItem = ({ item, item: { uri }, size, marginTop, marginLeft }) => {
    const style = {
      width: size,
      height: size,
      marginLeft,
      marginTop,

      backgroundColor: 'blue',
    };

    

    return (
      <TouchableOpacity
        key={item}
        activeOpacity={0.75}
        onPress={() => onPressImage(item)}
        style={style}
      >
        <Image source={{ uri: item }} style={{ flex: 1 }} />
      </TouchableOpacity>
    );
  };

  return (
    <Grid
      data={selectedImages}
      renderItem={renderItem}
      keyExtractor={item => item}
      {...rest}
    />
  );
}

export default ImageGrid;