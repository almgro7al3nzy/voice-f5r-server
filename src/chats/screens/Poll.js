import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '../../Components';

const Poll = () => {
  const { colors } = useTheme();

  const styles = {
    container: {

    },    
  };

  return (
    <View>
      <Text style={styles.question}>Modern Assassin's Creed games ranked from best to worst</Text>

      
    </View>
  );
}

export default Poll;