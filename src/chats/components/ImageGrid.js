import React from 'react';
import {Image, TouchableOpacity, PermissionsAndroid, Platform, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

import CameraRoll from "@react-native-community/cameraroll";
import { Button2, Grid, Text } from '../../Components';


const ImageGrid = ({ onPressImage, selectedImages }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      justifyContent: 'center',
      alignItems: 'center',

    },
    selectedBadge: {
      position: 'absolute',
      // top: '50%',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      // backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedCount: {
      backgroundColor: colors.primary,
      borderRadius: 5,
      width: 26,
      height: 26,
      textAlign: 'center',
      // flex: 1,
      alignSelf: 'center',
      color: colors.lightText,
      fontSize: 18,

      // paddingVertical: 2,
      // paddingHorizontal: 9,
    },
    sendBtn: {
      // position: 'absolute',
      bottom: 50,
      left: 0,
      right: 0,
      width: '80%',
      // backgroundColor: 'red',

      // justifyContent: 'center',
      // alignItems: 'center',
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
      first: 20,
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
        {selectedImages.indexOf(uri) > -1 && (
          <View style={styles.selectedBadge}>
            <Text style={styles.selectedCount}>{selectedImages.indexOf(uri) + 1}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  

  return (
    <View style={styles.container}>
      <Grid
        data={images}
        renderItem={renderItem}
        keyExtractor={({uri}) => uri}
        onEndReached={getNextImages}
      />
      {Boolean(selectedImages.length) && 
      <Button2 style={styles.sendBtn} title={`Send ${selectedImages.length}`} />
      }
    </View>
  );
}

export default ImageGrid;