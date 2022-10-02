import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { connect } from 'react-redux';
import { ListHeader, ListItem, Text, Touchable } from '../../Components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SpacePromptsModal from '../components/SpacePromptsModal';
import { addUserPrompt } from '../actions';


const JoinSpace = ({ route, navigation, user, roles, spaces, addUserPrompt }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.card,
    },    
    promptItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderBottomWidth: 0.5,
      borderColor: colors.border,
    },
    promptIcon: {
      fontSize: 30,
      color: colors.text3,
      marginRight: 10,
    },
    promptText: {
      fontSize: 16,
      color: colors.text,
    },
    spaceName: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      fontSize: 16,
      color: colors.text,
      fontWeight: 'bold',
    }
  };

  const [space, setSpace] = React.useState(spaces.find(space => space.id === route.params.spaceId));
  const [spacePromptsVisible, setSpacePromptsVisible] = React.useState(false);
  const [activePrompt, setActivePrompt] = React.useState(space.prompts[0]);

  React.useLayoutEffect(() => {
    
    navigation.setOptions({
      headerTitle: 'Space: ' + space.name,
    });
  }, [route, navigation]);

  const handlePressPrompt = prompt => {
    setActivePrompt(prompt);
    setSpacePromptsVisible(true);
  }

  console.log('spaceprompts', space);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.spaceName}>{space.name}</Text> */}
      {/* <ListHeader title='ACCOUNT' /> */}
      {/* <ListItem title='Name' icon='account-box-outline' right={user && user.name} onPress={() => setChangeNameVisible(true)} /> */}
      {space.prompts.map(prompt => {
        const userPrompt = user.prompts.find(userPrompt => userPrompt.id === prompt.id);
        
        return (
          <ListItem 
            key={prompt.title} 
            title={prompt.title} 
            icon={prompt.icon} 
            right={userPrompt && userPrompt.UserPrompts && userPrompt.UserPrompts.choice} 
            // right={userPrompt && userPrompt.UserPrompts.choice || userPrompt.UserPrompts.value} 
            onPress={() => handlePressPrompt(prompt)} 
          />
        );
        return (
          <Touchable key={title} style={styles.promptItem} onPress={() => setSpacePromptsVisible(true)}>
            <MaterialCommunityIcons name={icon} style={styles.promptIcon} />
            <Text style={styles.promptText}>{title}</Text>
          </Touchable>
        )
      })}


      <SpacePromptsModal
        isVisible={spacePromptsVisible}
        hideModal={() => setSpacePromptsVisible(false)}
        prompts={space.prompts}
        activePrompt={activePrompt}
        setActivePrompt={setActivePrompt}
        addUserPrompt={addUserPrompt}
        user={user}
      />
    </View>
  );
}

const mapStateToProps = state => ({
  roles: state.account.roles,
  spaces: state.chats.spaces,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { addUserPrompt }
)(JoinSpace);