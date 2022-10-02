import React from 'react';
import { View, Image, TouchableWithoutFeedback, 
  StatusBar, FlatList,
  Dimensions, TouchableNativeFeedback, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { HeaderButton, ListHeader, ListItem, Text, Touchable } from '../../Components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AvatarOptionsModal from '../components/AvatarOptionsModal';
import ImagePickerModal from './ImagePickerModal';
import ImagePicker from 'react-native-image-crop-picker';
import { addPhotos, uploadAvatar } from '../actions';
import { color } from 'react-native-reanimated';
// import RoleListModal from '../../people/components/RoleListModal';
// import CreateIntroModal from '../../people/screens/CreateIntroModal';

// const SERVER_IP = 'http://192.168.1.2:8000/uploads/avatars/'



const EditProfile = ({ navigation, user, spaces, uploadAvatar, roles, addPhotos }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.card,
    },
    header: {
      backgroundColor: 'red',
      padding: 10,
    },
    linearGradient: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      // backgroundColor: 'rgba(0,0,0,0.3)',
      // zIndex: 2,
      // position: 'absolute',
      width: '100%',
      // height: '50%',
      height: Dimensions.get('window').height / 2,

      // backgroundColor: 'red',
    },
    
    avatar: {
      width: '100%',
      height: '100%',
      // width: 200,
      // height: 200,

      resizeMode: 'cover',
      position: 'absolute',
      zIndex: -1,
      // borderRadius: 5,
    },
  
    title: {
      margin: 15,
      // padding: 5,
      flexDirection: 'row',
      // justifyContent: 'space-between',
      alignItems: 'center',
    },
    name: {
      color: colors.textInverse,
      fontSize: 30,
      fontWeight: 'bold',
      // backgroundColor: 'rgba(0,0,0,0.3)',
    },
    age: {
      color: colors.textInverse,
      fontSize: 20,
    },
    goBackIcon: {
      position: 'absolute',
      // top: 40,
      top: StatusBar.currentHeight,
      // margin: 15,

      fontSize: 25,
      // fontWeight: 'bold',
      color: colors.lightText,
      marginHorizontal: 15,
      marginVertical: 0,

      // backgroundColor: colors.lightTranslucent,
      // backgroundColor: colors.darkTranslucent3,

      // borderRadius: 10,

      // paddingHorizontal: 5,
      // paddingVertical: 3,
    },
    cameraIcon: {
      // fontSize: 30,
      // color: colors.text3,
      // color: colors.primary,
      // color: colors.lightText,
      // // color: colors.lightTranslucent2,

      // margin: 10,
      // transform: [{ scaleX: -1 }],


      fontSize: 30,
      color: colors.lightText,
      marginHorizontal: 15,
      marginVertical: 15,

      backgroundColor: colors.lightTranslucent,
      backgroundColor: colors.darkTranslucent3,

      borderRadius: 10,

      paddingHorizontal: 5,
      paddingVertical: 3,

      // backgroundColor: colors.lightTranslucent,
      // backgroundColor: colors.card,
      // borderWidth: 0.5,
      // borderColor: colors.primary,
      // borderRadius: 5,
      // padding: 10,

      // height: 40,
      // width: 40,
      // textAlign: 'center',
      // justifyContent: 'center',
      // alignItems: 'center',

      // alignSelf: 'flex-end',

      // position: 'absolute',
      // bottom: '50%',
      // zIndex: 2,
      // right: 50
    },
    optionsIcon: {
      fontSize: 30,
      color: colors.lightText,
      color: colors.darkText,
    },
    addRole: {
      backgroundColor: colors.background5,
      backgroundColor: colors.background,
      // backgroundColor: colors.card,
      flexDirection: 'row',
      alignItems: 'center',
      // justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    addRoleIcon: {
      fontSize: 25,
      color: colors.text3,
    },
    addRoleText: {
      fontSize: 16,
      color: colors.text,
    },
    suspendBtn: {
      padding: 20,
      borderRadius: 5,
      backgroundColor: colors.background,
    },
    suspendText: {
      padding: 20,
      borderRadius: 5,
      backgroundColor: colors.background,
    },
    roleItem: {
      backgroundColor: colors.background,

      borderRadius: 5,
      borderColor: colors.border2,
      // borderWidth: 1,
      // borderWidth: 3,

      // borderStyle: 'dashed',
      // borderWidth: 1,
      // borderRadius: 1,

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',

      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    addIcon: {
      color: colors.text3,
      // color: colors.card,
      fontSize: 24,
    },
    spaces: {
      flexGrow: 0,
      alignItems: 'center',
      paddingHorizontal: 10,

      // backgroundColor: 'blue',
    },
    roleChatItem: {
      // borderRadius: 10,
      // backgroundColor: colors.background,
      // marginHorizontal: 5,
      // padding: 5,
      // alignSelf: 'center',

      justifyContent: 'center',
      alignItems: 'center',
    },
    roleChatIcon: {
      fontSize: 40,
      color: colors.text3,

      marginHorizontal: 20,
      marginVertical: 5,
      // padding: 20,

      borderRadius: 10,
      backgroundColor: colors.background,
      marginHorizontal: 10,
      marginVertical: 5,
      padding: 5,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',

      // width: 150,
      // height: 150,
    },
    roleChatTitle: {
      fontSize: 13,
      color: colors.text,
      // fontWeight: 'bold',
    },
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: false,
      headerTintColor: colors.lightText,
      headerStyle: {
          backgroundColor: 'transparent'
      },
      headerRight: () => (
        <MaterialCommunityIcons name='dots-horizontal' style={styles.optionsIcon} />
      ),

      headerShown: false,
    });
  }, [navigation]);

  const [avatarOptionsVisible, setAvatarOptionsVisible] = React.useState(false);
  const [imagePickerVisible, setImagePickerVisible] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [roleListVisible, setRoleListVisible] = React.useState(false);
  const [role, setRole] = React.useState(null);

  const [selectedImages, setSelectedImages] = React.useState([]);




  const onPressImage = () => {}

  const handlePressCamera = () => {}

 
  const handlePressImage = async (img) => {
    try {
      // 
      setImagePickerVisible(false);

      const image = await ImagePicker.openCropper({
        path: img.uri,
        width: 300,
        height: 400
      });

      // 
      
      handleSubmit(image);
      // setImage(image);

      
    }
    catch (err) {
      
    }
  }

  const handlePressImage2 = (image) => {
    if (selectedImages.includes(image)) {
        
      setSelectedImages(selectedImages.filter(img => img !== image));
    }      
    else setSelectedImages(selectedImages.concat(image));
  }
  

  const handleSubmit = (image) => {
    const formData = new FormData();

    formData.append('avatar', {
      name: `.jpg`,
      type: image.mime,
      uri: Platform.OS === 'android' ? image.path : image.path.replace('file://', '')
    });

    uploadAvatar(formData);
    // addPhotos({ title: 'Obi' });

    // setImagePickerVisible(false);

  }

  
  const handleSubmit2 = () => {
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


  const suspendRole = (
    <Touchable style={styles.suspendBtn}>
    <Text text={styles.suspendText}>Suspend</Text>
    </Touchable>
  )

  const renderSpaceItem = ({ item, item: { id, name, icon, color, onPress } }) => {
    
    return (
      <Touchable 
        background={colors.background4}
        style={[styles.roleChatItem, id === 0 && chooseRoleShowing && {backgroundColor:colors.background}]}
        // onPress={() => onPress ? onPress() : navigation.navigate('Games', { screen: 'Board', params: { spaceId: id }})} 
        onPress={() => navigation.navigate('Account', { screen: 'JoinSpace', params: { spaceId: id } })}
      >
        <MaterialCommunityIcons name={icon} style={[styles.roleChatIcon, {color}]} />
        <Text style={styles.roleChatTitle}>{name}</Text>
      </Touchable>
    )
  }


  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor='rgba(0,0,0,1)' barStyle='light-content' />
      {/* <StatusBar backgroundColor='rgba(0,0,0,.1)' barStyle='light-content' translucent /> */}
      <TouchableWithoutFeedback onPress={onPressImage} style={styles.header}>        
        <LinearGradient colors={['rgba(0,0,0,0.1)', 'transparent', 'rgba(0,0,0,0.5)']} start={{ x: 0.5, y: 0.5}} style={styles.linearGradient}>
            <TouchableNativeFeedback onPress={() => setAvatarOptionsVisible(true)} background={TouchableNativeFeedback.Ripple(colors.background3)}>
              <MaterialCommunityIcons name='arrow-left' style={styles.goBackIcon} />
            </TouchableNativeFeedback>
            {/* <Image source={{ uri: SERVER_IP + user.profile.avatar }} style={styles.avatar} /> */}
            <Image source={{ uri: user.profile.avatarSource }} style={styles.avatar} />
    
            <View style={styles.title}>
              <Text style={styles.name}>{user.profile.name}<Text style={styles.age}> {23}</Text></Text>
              {/* <Text style={styles.age}>{23}</Text> */}
              {/* <Text style={styles.age}>, {user.profile.age}</Text> */}

              {/* <Text style={styles.distanceAway}>{distanceAway}</Text> */}
              
              {/* <Text style={styles.intro}>{introExpanded ? intro : intro.slice(100)}</Text>       */}
              {/* {!introExpanded && <Text onPress={() => setIntroExpanded(true)}>See More</Text>} */}
            </View>            

            <TouchableNativeFeedback onPress={() => setAvatarOptionsVisible(true)} background={TouchableNativeFeedback.Ripple(colors.background3)}>
              <MaterialCommunityIcons name='camera' style={styles.cameraIcon} />
            </TouchableNativeFeedback>
          </LinearGradient>
        </TouchableWithoutFeedback>

          {/* <ListItem title='Bio' icon='account-edit' right='Write something about yourself' /> */}
          <View style={styles.group}>
            <ListHeader title='Spaces' />
            {/* <ListHeader title='ROLES' rightText='Add Role' rightIcon='plus-thick' 
            rightOnPress={() => navigation.navigate('Account', { screen: 'AddRole' })} />
             */}
            {/* rightOnPress={() => setRoleListVisible(true)} /> */}

            {/* <RoleItem title='Add Role' icon='plus-thick' onPress={() => navigation.navigate('Account', { screen: 'AddRole' })} /> */}

            {/* <Touchable onPress={() => {}} background={colors.background4} style={styles.roleItem}>
              <MaterialCommunityIcons name='plus-thick' style={styles.addIcon} />
            </Touchable> */}

            <FlatList
              // data={chooseRoleShowing ? spaces2 : spaces}
              data={spaces}
              keyExtractor={({id}) => id.toString()}
              renderItem={renderSpaceItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.spaces}
              style={{ flexGrow: 0, }}
            />

            {user.roles && user.roles.map(role => {
              return (
                // <ListItem key={role.id} icon={role.icon} title={role.name} />
                <RoleItem key={role.id} icon={role.icon} title={role.name} />
              );
            })}
{/* 
            <Touchable style={styles.addRole}>
              <MaterialCommunityIcons name='plus-thick' style={styles.addRoleIcon} />
              <Text style={styles.addRoleText}>Add Role</Text>
            </Touchable> */}

            {/* <View style={styles.roles}>
              {user.roles && user.roles.map(role => {
                return (
                  <Touchable>
                    <MaterialCommunityIcons name={role.icon || 'plus-thick'} style={styles.roleIcon} />
                    <Text style={styles.roleText}>{role.text}</Text>
                  </Touchable>
                );
              })}
            </View> */}


            {/* <ListItem title='Flatmate' icon='bed' right={'0 chats'} />
            <ListItem title='Tutor' icon='teach' right={'0 chats'} />              
            <ListItem title='Domestic worker' icon='home-city' right={'0 chats'} /> */}
          </View>





          {/* <RoleListModal
            isVisible={roleListVisible}
            hideModal={() => setRoleListVisible(false)}
            setRole={setRole}
          /> */}

          {/* <CreateIntroModal
            isVisible={roleListVisible}
            hideModal={() => setRoleListVisible(false)}
          />
           */}
          <AvatarOptionsModal
            isVisible={avatarOptionsVisible}
            hideModal={() => setAvatarOptionsVisible(false)}
            onPressCamera={handlePressCamera}
            onPressGallery={() => setImagePickerVisible(true)}
          />
{/* 
          <ImagePickerModal 
            isVisible={imagePickerVisible}
            hideModal={() => setImagePickerVisible(false)}
            onPressImage={handlePressImage}
            onSubmit={handleSubmit}
          /> */}

          <ImagePickerModal 
            isVisible={imagePickerVisible}
            hideModal={() => setImagePickerVisible(false)}
            selectedImages={selectedImages}
            onPressImage={handlePressImage}
            onSubmit={handleSubmit}
          />

    </ScrollView>
  )
}









const RoleItem = ({ title, icon, onPress, ...rest }) => {
  const { colors } = useTheme();

  const styles = {
    roleItem: {
      // backgroundColor: colors.background,

      borderRadius: 5,
      borderColor: colors.border2,
      borderWidth: 1,
      // borderWidth: 3,

      // borderStyle: 'dashed',
      // borderWidth: 1,
      // borderRadius: 1,

      flexDirection: 'row',
      alignItems: 'center',

      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    title: {
      color: colors.text,
      fontSize: 14,
    },
    icon: {
      color: colors.text3,
      fontSize: 20,
      marginRight: 10,
    }
  };

  return (
    <Touchable onPress={onPress} background={colors.background4} style={styles.roleItem} {...rest}>
        {icon && <MaterialCommunityIcons name={icon} style={styles.icon} />}
        <Text style={styles.title}>{title}</Text>
    </Touchable>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  spaces: state.chats.spaces,
  error: state.auth.error
})

export default connect(
  mapStateToProps,
  { uploadAvatar, addPhotos }
)(EditProfile);