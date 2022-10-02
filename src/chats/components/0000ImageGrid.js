// import React, { useState, useEffect } from 'react'
// import { View, Image, TouchableOpacity } from 'react-native';
// import * as MediaLibrary from 'expo-media-library';

// import { Grid, Button } from '../../Components';
// import { useTheme } from '@react-navigation/native';


// const ImageGrid = ({ onPressImage }) => {
//   const { colors } = useTheme();

//   const styles = {
//     container: {
//       backgroundColor: colors.card,
//       // backgroundColor: 'blue',
//       padding: 3,
//       paddingTop: 20,
//       borderTopLeftRadius: 20,
//       borderTopRightRadius: 20,
//     },
//     image: {
//       flex: 1
//     }
//   };
//   const [images, setImages] = useState([]);

//   const [endCursor, setEndCursor] = useState(null);
//   // const [loading, setLoading] = useState(false);
//   // const [cursor, setCursor] = useState(null);
//   let loading = false;
//   let cursor = null;
  

//   useEffect(() => {
    

//     getImages();
//   }, []);

//   useEffect(() => {

//     loading = false;
//   }, [images]);

//   const hasPermission = async () => {
//     try {
//       let { granted } = await MediaLibrary.getPermissionsAsync();      
//       if (granted) return true;

//       ({ granted } = await MediaLibrary.requestPermissionsAsync());
//       return granted;
//     } catch (err) {
      
//     }
//   }

//   const getImages = async (after) => {
//     try {
//       if (!hasPermission()) return;

//       // const album = await MediaLibrary.getAlbumAsync('Camera');
//       const { assets, endCursor, hasNextPage, totalCount } = await MediaLibrary.getAssetsAsync({ after });

//       setEndCursor(hasNextPage ? endCursor : null);

//       // const loadedImages = assets.map(image => image.uri);
      
  
//       setImages(images.concat(assets));
//     }
//     catch (err) {
//       
//     }
//   }

//   const getNextImages = () => {
//     if (!endCursor) return;

//     getImages(endCursor);
//   }



//   // const renderItem = (props) => 
//   const renderItem = ({ item, item: { uri }, size, marginTop, marginLeft }) => {
//     const style = {
//       width: size,
//       height: size,
//       marginLeft,
//       marginTop
//     };
    
    

//     return (
//       <TouchableOpacity
//         key={uri}
//         activeOpacity={0.8}
//         onPress={() => onPressImage(uri)}
//         style={style}
//       >
//         <Image source={{ uri }} style={styles.image} />        
//       </TouchableOpacity>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Grid
//         data={images}
//         renderItem={renderItem}
//         keyExtractor={item => item.uri}
//         onEndReached={getNextImages}
//       />
//     </View>
//   );
// }

// export default ImageGrid;


import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';

const ImageGrid = () => {
  const { colors } = useTheme();

  const styles = {
    container: {

    }
  };

  return (
    <View style={styles.container}>
      
    </View>
  )
}

export default ImageGrid;