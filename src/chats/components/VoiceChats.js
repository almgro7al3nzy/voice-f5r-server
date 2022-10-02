import React from 'react';
import { View, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';

const VoiceChats = ({ voiceChats }) => {
  const { colors } = useTheme();

  const styles = {
    container: {

    },    
  };

  return (
    <View>
      <FlatList
        data={voiceChats}
        renderItem={renderVoiceChatItem}
        keyExtractor={({id}) => id.toString()}
      />
    </View>
  );
}

export default VoiceChats;