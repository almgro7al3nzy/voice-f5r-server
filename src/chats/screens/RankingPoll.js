import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text, Touchable } from '../../Components';

const RankingPoll = () => {
  const { colors } = useTheme();

  const styles = {
    container: {
      flex: 1,
      backgroundColor: colors.card,
    },  
    question: {
      paddingHorizontal: 20,
      paddingVertical: 10,

      fontSize: 16,
    },
    options: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    optionText: {
      paddingHorizontal: 10,
      paddingVertical: 10,

      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 5,
    }
  };

  const [answer, setAnswer] = React.useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Modern Assassin's Creed games ranked from best to worst</Text>

      <View style={styles.options}>
        <Touchable style={styles.option}>
          <Text style={styles.optionText}>Assassin's Creed Valhalla</Text>
        </Touchable>
        <Touchable style={styles.option}>
          <Text style={styles.optionText}>Assassin's Creed Odyssey</Text>
        </Touchable>
        <Touchable style={styles.option}>
          <Text style={styles.optionText}>Assassin's Creed Origins</Text>
        </Touchable>
      </View>
    </View>
  );
}

export default RankingPoll;