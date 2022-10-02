import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { HeaderButton, Text, Touchable } from '../../Components';
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { v4 as uuidv4 } from 'uuid';
import PromptOptionsModal from '../components/PromptOptionsModal';
import { addRole } from '../actions';


const AddRoleDetails = ({ navigation, roles, roleId, addRole }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.card,
    },
    roleItem: {
      flexDirection: 'row',
      // justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 15,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.border,
      backgroundColor: colors.card,
    },
    roleIcon: {
      fontSize: 25,
      color: colors.text3,
      marginRight: 10,
    },



    infoList: {
      flexDirection: 'row',
      // marginVertical: 10,
      padding: 5,
      marginRight: 20,
      // flexShrink: 1,
      // flex: 1,
      // width: '100%',
      // height: '100%',
      // marginBottom: 20,
      flexWrap: 'wrap',
      // alignContent: 'stretch',
    },
    // infoItem: {
    //   // marginVertical: 2,
    //   // alignContent: 'space-between',
    //   // flex: 1,
    //   // flexShrink: 1,
    // },
    info: {
      flexDirection: 'row',
      backgroundColor: colors.background,
      paddingHorizontal: 20,
      paddingVertical: 10,
      // marginHorizontal: 2,
      borderRadius: 5,

      // flexShrink: 1,
      // flex: 1,
      marginVertical: 5,
    },
    infoText: {
      color: colors.text,
      // backgroundColor: colors.primary,
      // paddingHorizontal: 20,
      // // paddingVertical: 10,
      // marginHorizontal: 2,
      // borderRadius: 5,
    },
    closeIcon: {
      // backgroundColor: colors.card,
      // color: colors.primary,
      color: colors.text3,
      borderRadius: 10,
      marginLeft: 10,
    },
    infoInput: {
      fontSize: 16,
      color: colors.text,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
      paddingVertical: 5,
      // marginHorizontal: 2,
      // borderRadius: 10,
      marginVertical: 5,
      width: '100%',
      borderRadius: 5,
    },
    // avatar: {
    //   width: '100%',
    //   // width: 500,
    //   height: 200,
    //   height: Dimensions.get('window').height / 2,
    //   // height: '50%',
    // },
    promptBtn: {
      width: '100%',
      // backgroundColor: 'green',
      backgroundColor: colors.background,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginVertical: 5,
      borderRadius: 5,

      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    promptText: {
      fontSize: 16,
      color: colors.text,
    },
    promptIcon: {
      fontSize: 20,
      color: colors.text,
    }
  };

  React.useLayoutEffect(() => {
    
    navigation.setOptions({
      headerTitle: false,
      // headerLeft: () => (
      //   <HeaderButton 
      //     name='close' 
      //     position='left' 
      //     onPress={navigation.goBack}
      //   />
      // ),
      headerRight: () => (
        <HeaderButton 
          text='Add Role'
          position='right' 
          // disabled={!infoList.length}
          disabled={false}
          onPress={handleSubmit}
        />
      )

    });
  }, [navigation, (infoList && infoList.length)]);

  
  const [info, setInfo] = React.useState('');
  // const [infoList, setInfoList] = React.useState(['hi', 'noob']);
  const [infoList, setInfoList] = React.useState([]);
  const [text, setText] = React.useState('');

  const [promptOptionsVisible, setPromptOptionsVisible] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(null);

  const [imagesVisible, setImagesVisible] = React.useState(false);
  const [image, setImage] = React.useState(null);

  const hideModal = () => setImagesVisible(false);

  const addInfo = () => {
    setInfoList(infoList.concat(info));
    setInfo('');

    
  }

  const removeInfo = (indexToRemove) => {
    setInfoList(infoList.filter((_, index) => index !== indexToRemove));
  }

  const handlePressImage = () => {}  

  const handleChooseImage = () => {
    ImagePicker.launchImageLibrary({ noData: true }, response => {
      if (response.uri) setImage(response);
    })
  }

  const handleSubmit = () => {
    // const formData = new FormData();
    // formData.append('role', roleId)
    // formData.append('image', image);
    // formData.append('text', text);

    // 
    addInfo();

    addRole({ roleId, prompt1: selectedOption, infoList });

    navigation.navigate('Account', { screen: 'EditProfile' });
  }

  const askForPermission = async () => {
    const permissionResult = 
    await Permissions.askAsync(Permissions.CAMERA)  
    if (permissionResult.status !== 'granted') {
      Alert.alert('no permissions to access camera!', 
      [{ text: 'ok'}])
      return false
    }
    return true
  }

  const roles2 = [
    { id: 1, name: 'Tutor', icon: 'school', subName: 'Subject', subOptions: ['English Language', 'Italian Language', 'Physics', 'Chemistry'],   },
    { id: 2, name: 'Flatmate', icon: 'bed', subName: 'Location', subOptions: ['Torino', 'Milano', 'California', 'Lagos'],     },
    { id: 3, name: 'Language Exchange', icon: 'account-voice', subName: 'Location', subOptions: ['Torino', 'Milano', 'California', 'Lagos'],     },
    { id: 4, name: 'Doctor', icon: 'doctor', subName: 'Location', subOptions: ['Torino', 'Milano', 'California', 'Lagos'],     },
  ];


  

  const role = roles.find(role => role.id === roleId)

  

  return (
    <View style={styles.container}>
      <View style={styles.roleItem}>
        {role.icon && <MaterialCommunityIcons name={role.icon} style={styles.roleIcon} />}
        <Text style={styles.roleText}>{role.name}</Text>
      </View>

      <View style={styles.infoList}>
          <Touchable background={colors.background4} onPress={() => setPromptOptionsVisible(true)} style={styles.promptBtn}>
            <Text style={styles.promptText}>
              {selectedOption || `Choose ${role.prompt1Key}`}
            </Text>
            <MaterialCommunityIcons name='menu-down' style={styles.promptIcon} />
          </Touchable>
          {infoList.map((info, index) => {
            return (
              <TouchableOpacity key={uuidv4()} style={styles.infoItem} onPress={() => removeInfo(index)}>
                <View style={styles.info}>
                  <Text style={styles.infoText}>{info}</Text>
                  <MaterialCommunityIcons name='close' size={20} 
                  // color={colors.textInverse} 
                  style={styles.closeIcon}
                  />
                </View>
              </TouchableOpacity>
            );
          })}

          <TextInput
            value={info}
            onChangeText={setInfo}
            onSubmitEditing={addInfo}
            // placeholder='e.g. Budget, Location, Preferences'
            // placeholder='Add a piece of info'
            placeholder={role.prompt1Key || 'Add Info'}
            placeholderTextColor={colors.text3}
            style={styles.infoInput}
            blurOnSubmit={false}
          />
        </View>

        <PromptOptionsModal
          isVisible={promptOptionsVisible}
          hideModal={() => setPromptOptionsVisible(false)}
          options={role.prompt1Options}
          setOption={(option) => setSelectedOption(option)}
          selectedOption={selectedOption}
        />
    </View>
  )
}

const mapStateToProps = state => ({
  // roles: state.people.roles,
  // roleId: state.people.roleId,
});

// const mapDispatchToProps = dispatch => ({
//   setRole: (role) => dispatch({ type: SET_ROLE, role })
// })

export default connect(
  mapStateToProps,
  { addRole }
  // mapDispatchToProps
)(AddRoleDetails);