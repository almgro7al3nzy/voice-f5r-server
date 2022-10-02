import React from 'react';
import {Image, TouchableOpacity, PermissionsAndroid, Platform, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';

// import Grid from './Grid';


const ImageList = ({ onPressImage, selectedImages, ...rest }) => {
  const { colors } = useTheme();

  // const styles = {
  //   container: {

  //   },
  //   image: {
  //     flex: 1,
  //     width: 120,
  //     height: 120,

  //     backgroundColor: 'green',
  //   }
  // };

  

  const renderItem = ({ item, item: { uri }, size, marginTop, marginLeft }) => {
    const style = {
      width: 120,
      height: 120,
      margin: 0.5,
      backgroundColor: colors.background,
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
    <FlatList
      data={selectedImages}
      renderItem={renderItem}
      keyExtractor={item => item}
      horizontal
      {...rest}
    />
  );
}

export default ImageList;