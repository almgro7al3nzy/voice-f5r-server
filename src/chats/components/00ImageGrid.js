import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import * as Permissions from 'expo-permissions';
import CameraRoll from '@react-native-community/cameraroll';
import Grid from '../../_components/Grid';


const ImageGrid = ({ onPressImage }) => {
  // const [images, setImages] = useState([
  //   { uri: 'https://picsum.photos/600/600?image=10' },
  //   { uri: 'https://picsum.photos/600/600?image=20' },
  //   { uri: 'https://picsum.photos/600/600?image=30' },
  //   { uri: 'https://picsum.photos/600/600?image=40' },
  // ]);
  const [images, setImages] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [cursor, setCursor] = useState(null);
  let loading = false;
  let cursor = null;

  useEffect(() => {

    getImages();    
  }, []);

  useEffect(() => {

    loading = false;
  }, [images]);

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) return true;

    

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  const savePicture = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) return;

    CameraRoll.save(tag, { type, album })
  }


  const getImages = async (after) => {
    try {
      if (loading) return;

      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== 'granted') {
        
        return;
      }

      loading = true;

      const { 
        edges,
        page_info,
        page_info: { has_next_page, end_cursor } 
      } = await CameraRoll.getPhotos({
        first: 20,
        after
      });

      
      const loadedImages = edges.map(item => item.node.image);

      setImages(images.concat(loadedImages));
      cursor = has_next_page ? end_cursor : null;
    }
    catch (err) {
      
    }
  }

  const getNextImages = () => {
    if (!cursor) return;

    getImages(cursor);
  }

  const keyExtractor = ({ uri }) => uri;

  const renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {
    const style = {
      width: size,
      height: size,
      marginLeft,
      marginTop
    };
    
    

    return (
      <TouchableOpacity
        key={uri}
        activeOpacity={0.8}
        onPress={() => onPressImage(uri)}
        style={style}
      >
        <Image source={{ uri }} style={styles.image} />
      </TouchableOpacity>
    );
  }

  return (
    <Grid
      data={images}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={getNextImages}
    />
  );
}

export default ImageGrid

const styles = StyleSheet.create({
  image: {
    flex: 1
  }
})
