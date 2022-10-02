import React from 'react';
import { View, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { HeaderButton } from '../../Components';
import RoleItem from '../components/RoleItem';
import { connect } from 'react-redux';
import { SET_ROLE, SET_ROLE_ID } from '../types';
import { getRoles, setRoleId } from '../actions';

const AddRole = ({ navigation, handleSubmit, setRoleId, getRoles, roles }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.card,
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      // headerTitle: false,
      headerTitle: 'Choose Role',
      // headerLeft: () => (
      //   <HeaderButton 
      //     name='back' 
      //     position='left' 
      //     onPress={navigation.goBack}
      //   />
      // ),
      // headerRight: () => (
      //   <HeaderButton 
      //     text='Add Role'
      //     position='right' 
      //     disabled={!text}
      //     onPress={handleSubmit}
      //   />
      // )

    });
  }, [navigation, text]);

  React.useEffect(() => {

    
    getRoles();
  }, []);

  const [text, setText] = React.useState('');


  const roles2 = [
    { id: 1, name: 'Tutor', icon: 'school', subName: 'Subject', subOptions: ['English Language', 'Italian Language', 'Physics', 'Chemistry'],   },
    { id: 2, name: 'Flatmate', icon: 'bed', subName: 'Location', subOptions: ['Torino', 'Milano', 'California', 'Lagos'],     },
    { id: 3, name: 'Language Exchange', icon: 'account-voice', subName: 'Location', subOptions: ['Torino', 'Milano', 'California', 'Lagos'],     },
    { id: 4, name: 'Doctor', icon: 'doctor', subName: 'Location', subOptions: ['Torino', 'Milano', 'California', 'Lagos'],     },
  ];


  return (
    <View style={styles.container}>
      <FlatList
        data={roles}
        renderItem={({item}) => <RoleItem {...item} onPress={(id) => { setRoleId(id); navigation.navigate('Account', { screen: 'AddRoleDetails' }); } } /> }
        keyExtractor={({id}) => id.toString()}
      />
    </View>
  )
}

// const mapDispatchToProps = dispatch => ({
//   // setRole: (role) => dispatch({ type: SET_ROLE, role }),
//   getRoles,
//   setRoleId: (roleId) => dispatch({ type: SET_ROLE_ID, roleId })
// })

const mapStateToProps = state => ({
  roles: state.account.roles,
  // roleId: state.people.roleId,
});

export default connect(
  mapStateToProps,
  { setRoleId, getRoles }
)(AddRole);