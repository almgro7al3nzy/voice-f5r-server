import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '../../../Components';
import Svg, { Circle, Rect } from 'react-native-svg';

const Countdown3 = ({
  size,
  seconds, 
  strokeWidth,
  strokeColor,
  strokeBackground, 
}) => {
  const { colors } = useTheme();

  const styles = {
    container: {
      position: 'absolute',
      zIndex: 2,
      // top: 100,
      // left: 50,
    
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    
      justifyContent: "center",
      alignItems: "center",
    
      backgroundColor: 'green',
    },
    startBtn: {
      color: colors.lightText,
      fontSize: 20,
    },
    svg: {
      position: 'absolute',
      zIndex: 2,

      // top: 0,
      // left: 0,


      width: '100%',
      height: '100%',

      // justifyContent: "center",
      // alignItems: "center",

      // backgroundColor: '#33AAFF'
    }
  };

  const [timer, setTimer] = React.useState(seconds * 1000);

  const radius = React.useRef(size / 2);
  const circumference = React.useRef(size * Math.PI);
  const milliseconds = React.useRef(seconds * 1000);

  // const [radius] = React.useState(size / 2);
  // const [circumference] = React.useState(size * Math.PI);
  // const [milliseconds] = React.useState(seconds * 1000);

  const startTimer = () => {
    setTimer(seconds * 1000)
  }
  // const startTimer = () => {
  //   

  //   const interval = setInterval(() => {
  //     setTimer(timer - 1000);

  //     // if (timer === 0) {
  //     //   clearInterval(interval);
  //     //   // setTimer(0)
  //     // }
  //   }, 1000);
  // }

  let timeout
  React.useEffect(() => {
    if (timer > 0) {
      timeout = setTimeout(() => setTimer(timer - 100) , 100);
    }
    else clearTimeout(timeout);
  }, [timer]);

  const strokeDashoffset = () => {
    // return (Math.PI * size) - (countdown / (seconds * 1000)) * (Math.PI * size);
    // return (timer / (20 * 1000)) * (Math.PI * 100) - (Math.PI * 100);
    // return (timer / (20)) * (Math.PI * 100) - (Math.PI * 100);

    // return (Math.PI * 100) * ((timer / (20 * 1000)) - 1);
    return circumference * ((timer / milliseconds) - 1);
  }

  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ position: 'absolute', zIndex: 3 }} onPress={startTimer}>
        <Text style={styles.startBtn}>START</Text>
        <Text style={{ color: 'white' }}>{timer}</Text>
      </TouchableOpacity>

      <Svg style={styles.svg}>
        <Circle
          cx={'50%'}
          cy={'50%'}
          r={radius}
          stroke={strokeBackground}
          strokeWidth={strokeWidth}
        />
      </Svg>

      <Svg style={[ styles.svg, {
        transform: [ { rotate: '-90deg' } ],
        // zIndex:3, 
        // backgroundColor: 'red'
        } ]}>
        <Circle
          cx={'50%'}
          cy={'50%'}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap='round'

          strokeDasharray={circumference}
          // strokeDasharray={20}
          strokeDashoffset={strokeDashoffset()}
        />
      </Svg>
              
    </View>
  )
}

export default Countdown3;