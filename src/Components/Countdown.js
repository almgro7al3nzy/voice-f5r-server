import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

const Countdown = ({ seconds }) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.lightTranslucent,
      paddingHorizontal: 20,
      paddingVertical: 10,
      // height: 30,
      // width: 30,
    },
    timer: {
      color: colors.text,
      // color: colors.lightText,
      // fontSize: 30,
      // height: 30,
      // width: 30,
    }
  };

  const [timer, setTimer] = React.useState(seconds);
  

  let timeout
  React.useEffect(() => {
    if (timer > 0) {
      timeout = setTimeout(() => setTimer(timer - 1) , 1000);
    }
    else clearTimeout(timeout);
  }, [timer]);

  return (
    timer > 0 && <Text style={styles.timer}>{timer}s</Text>
  )
}

export default Countdown;