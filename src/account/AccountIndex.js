import React from 'react';
import { View, ActivityIndicator, ScrollView, TouchableOpacity, Image, TouchableNativeFeedback, TouchableNativeFeedbackBase } from 'react-native';
import { useTheme } from '@react-navigation/native';
import ContactThumbnail from './components/ContactThumbnail';
import { Button, HeaderButton, Text, HeaderTitle, Button2, Touchable } from '../Components';
import { connect } from 'react-redux';
import AccountHeader from './components/AccountHeader';
import IntroList from './components/IntroList';
import PinList from './components/PinList';
import FriendList from './components/FriendList';
// import SettingsModal from './screens/SettingsModal';
import { setTheme } from './actions';
import { logout } from '../auth/actions';
import Photos from './components/Photos';
import Friends from './components/Friends2';
import Pins from './components/Pins';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePickerModal from './screens/ImagePickerModal';
import { addPhotos } from './actions';
import defaultAvatar from '../../assets/images/avatar.png'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const SERVER_IP = 'http://192.168.1.2:8000/uploads/avatars/'


const AccountIndex = ({ navigation, user, error, setTheme, logout, addPhotos }) => {
  const { colors } = useTheme();

  const styles = {
    // container: {
    //   // flex: 1,
    //   alignItems: 'center',
    //   // justifyContent: 'center',
    //   backgroundColor: colors.blue,

    // },
    account: {
      flex: 1,
      backgroundColor: colors.card,
      // backgroundColor: 'blue',
      // paddingHorizontal: 20,

      // paddingVertical: 20,

      // height: 500,

      alignItems: 'center',
      justifyContent: 'center',
    },
    view: {
      flex: 2,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 15,
      borderRadius: 50,
      // borderColor: 'white',
      // borderWidth: 2,
    },
    header: {
      alignItems: 'center',
      justifyContent: 'center',

      // paddingVertical: 10,
      paddingTop: 10,
    },
    // tabContent: {

    // },
    tabs: {
      flexDirection: 'row',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.border,
      // marginVertical: 40,
      // marginTop: 40,
    },
    tab: {
      flex: 1,
      // textAlign: 'center',
      flexDirection: 'row',
      // backgroundColor: 'red',
      paddingVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: 'transparent',
    },
    tabText: {
      fontWeight: 'bold',
    },
    tabCount: {
      marginHorizontal: 5,
      color: colors.text3
    },
    editProfileButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',

      marginVertical: 30,

      paddingVertical: 5,
      // width: '30%',
      paddingHorizontal: 20,

      borderWidth: 1,
      borderColor: colors.border2,
      borderRadius: 5,
    },
    editProfileIcon: {
      color: colors.text3,
      fontSize: 22,
      marginRight: 5,
    },
    editProfileText: {
      color: colors.text,
      fontSize: 14,
    },
    friends: {
      flex: 1,
      
    }
  };



  const [activeTab, setActiveTab] = React.useState('friends');
  const [selectedImages, setSelectedImages] = React.useState([]);


  const [imagePickerVisible, setImagePickerVisible] = React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: <HeaderTitle title={user.name} onPress={() => {}} />, 
      // title: 'David Enam',
      headerTitleAlign: 'center',
      headerStyle: { borderBottomColor: colors.border2, borderBottomWidth: 0.5, },
      headerRight: () => (
        <HeaderButton
          name='cog-outline'
          position='right'
          // onPress={() => navigation.navigate('Account', { screen: 'Options' })}
          onPress={() => navigation.navigate('Account', {screen: 'Settings'})}
        />
      ),
    });
  }, [navigation]);
  
  const handleLaunchCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        multiple: true,
        mediaType: 'photo'
      });

      
      
      // setImage(image.uri)
    }
    catch (err) {
      
    }
  }

  const handleLaunchGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        // multiple: true,
        mediaType: 'photo'
      });

      
      
      // setImage(image)
      setImage({ ...image, uri: image.path });
    }
    catch (err) {
      
    }
  }


  const handlePressImage = async (image) => {
    try {
      // 

      // const image = await ImagePicker.openCropper({
      //   path,
      //   width: 300,
      //   height: 400
      // });

      // 
      
      // setImage({ ...image, uri: image.path });

      
      if (selectedImages.includes(image)) {
        
        setSelectedImages(selectedImages.filter(img => img !== image));
      }      
      else setSelectedImages(selectedImages.concat(image));
    }
    catch (err) {
      
    }
  }


  const handleSubmit = () => {
    const formData = new FormData();
    const date = new Date().toLocaleString().replace(/\//g, '-').replace(/:/g, '.').replace(/,/g, '');

    selectedImages.forEach(image => {

      

      formData.append('photos', {
        // name: `${date}.jpg`,
        name: `.jpg`,
        // name: ``,
        type: image.type,
        // type: 'image/jpeg',
        uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', '')
      });
    })

    addPhotos(formData);
    // addPhotos({ title: 'Obi' });

    setImagePickerVisible(false);

  }

  const avatarSource = user && user.profile && user.profile.avatar ? { uri: SERVER_IP + user.profile.avatar } : defaultAvatar;
  console.log('user?.profile?.avatarSource', user?.profile?.avatarSource);
  return (
    <>
      {user && (
        <ScrollView contentContainerStyle={styles.account}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Account', { screen: 'EditProfile' })}>
              <Image source={{ uri: user?.profile?.avatarSource }} style={styles.avatar} />
            </TouchableOpacity>

            <Text>{'@davidenam02'}</Text>
          </View>

          {/* <Button2 
            onPress={() => navigation.navigate('Account', { screen: 'EditProfile' })}
            title='Edit Profile' 
            type='outline' 
            icon='account-edit' 
            style={{ width: '50%', marginVertical: 30, }} 
          /> */}

          <Touchable 
            background={colors.background} 
            onPress={() => navigation.navigate('Account', { screen: 'EditProfile' })}
            style={styles.editProfileButton}
          >
            <MaterialCommunityIcons name='account-edit' style={styles.editProfileIcon} />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </Touchable>


          <View style={styles.tabs}>
            {/* <TouchableNativeFeedback onPress={() => setActiveTab('photos')} background={TouchableNativeFeedback.Ripple(colors.background3)}>
              <View style={[styles.tab, {borderColor: activeTab==='photos' ? colors.text : 'transparent' } ]}>
                <Text style={styles.tabText}>Photos</Text>
                <Text style={styles.tabCount}>{user.profile.photos && user.profile.photos.length}</Text>
              </View>
            </TouchableNativeFeedback> */}

            {/* <TouchableNativeFeedback onPress={() => setActiveTab('pins')} background={TouchableNativeFeedback.Ripple(colors.background3)}>
              <View style={[styles.tab, {borderColor: activeTab==='pins' ? colors.text : 'transparent' } ]}>
                <Text style={styles.tabText}>Pins</Text>
                <Text style={styles.tabCount}>{20}</Text>
              </View>
            </TouchableNativeFeedback> */}
            
            <TouchableNativeFeedback onPress={() => setActiveTab('friends')} background={TouchableNativeFeedback.Ripple(colors.background3)}>
              <View style={[styles.tab, {borderColor: activeTab==='friends' ? colors.text : 'transparent' } ]}>
                <Text style={styles.tabText}>Friends</Text>
                <Text style={styles.tabCount}>{0}</Text>
              </View>
            </TouchableNativeFeedback>                        
          </View>

          <View style={styles.friends}>

          </View>

          {/* {activeTab === 'photos' && (
            <Photos 
              onShowImagePicker={() => setImagePickerVisible(true)} 
              friends={null} 
              photos={user.profile.photos} />
          )} */}
          {/* {activeTab === 'friends' && (
            <Friends 
              friends={user.friends} 
              onFindFriends={() => navigation.navigate('People', { screen: 'Contacts' })}
            />
          )} */}
          {activeTab === 'pins' && <Pins friends={null} />}

          <ImagePickerModal 
            isVisible={imagePickerVisible}
            hideModal={() => setImagePickerVisible(false)}
            selectedImages={selectedImages}
            onPressImage={handlePressImage}
            onSubmit={handleSubmit}
          />
      </ScrollView>
      )}
      {!user && error && (
        <View>
          <Text>{error.message}</Text>
          <Button>Reload</Button>
        </View>
      )}
      {!user && !error && (
        <ActivityIndicator size='large' color={colors.brand} />
      )}
    </>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  error: state.auth.error
})

export default connect(
  mapStateToProps,
  { setTheme, logout, addPhotos }
)(AccountIndex);