import React from 'react';
import {Image, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';

import CameraRoll from "@react-native-community/cameraroll";
import Grid from './Grid';


const ImageGrid = ({ first = 20, onPressImage }) => {
  const { colors } = useTheme();

  const styles = {
    container: {

    }
  };

  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [cursor, setCursor] = React.useState(null);

  React.useEffect(() => {

    
    getImages();
  }, []);

  // React.useEffect(() => {

  //   setLoading(false);

  // }, [images]);

  async function hasAndroidPermission() {
    
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
  
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  const getImages = async (after) => {
    if (loading) return;

    // permissoins
    if (!hasAndroidPermission()) return;
    setLoading(true);

    const results = await CameraRoll.getPhotos({
      first,
      after,
    });

    // 

    const { edges, page_info: { has_next_page, end_cursor } } = results;

    const loadedImages = edges.map(item => item.node.image);

    setImages(images.concat(loadedImages));
    setLoading(false);
    setCursor(has_next_page ? end_cursor : null);
  }

  const getNextImages = () => {
    if (!cursor) return;

    getImages(cursor);
  }

  const renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {
    const style = {
      width: size,
      height: size,
      marginLeft,
      marginTop,
    };

    return (
      <TouchableOpacity
        key={uri}
        activeOpacity={0.75}
        onPress={() => onPressImage(uri)}
        style={style}
      >
        <Image source={{ uri }} style={{ flex: 1 }} />
      </TouchableOpacity>
    );
  };

  return (
    <Grid
      data={images}
      renderItem={renderItem}
      keyExtractor={({uri}) => uri}
      onEndReached={getNextImages}
    />
  );
}

export default ImageGrid;