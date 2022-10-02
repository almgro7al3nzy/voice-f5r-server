import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from '../../../Components';
import Svg, { Circle } from 'react-native-svg';


const CountdownTimer = ({ 
  size,
  seconds, 
  strokeWidth,
  strokeColor,
  strokeBackground, 

  // milliseconds, 
  // radius, 
  // circumference, 
  // strokeDashoffset, 
  
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
      // margin: "auto",
    },
    svg: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      // transform: "rotateY(-180deg) rotateZ(-90deg)",

      // transform: [ { rotateY: '-180deg' },  { rotateZ: '-90deg' } ],
      transform: [ { rotateY: '180deg' },  { rotateZ: '90deg' } ],

      zIndex: 4,

      // overflow: "visible",
    }
  };

  const [countdown, setCountdown] = React.useState(seconds * 1000);
  const [playing, setPlaying] = React.useState(false);

  // React.useEffect(() => {
    
  //   startTimer();
  // }, []);

  const startTimer = () => {
    setPlaying(true);

    const interval = setInterval(() => {
      setCountdown(countdown - 10);

      if (countdown === 0) {
        clearInterval(interval);
        setCountdown(milliseconds)
        setPlaying(false);
      }
    }, 10);
  }

  const sizeStyle = {
    height: 800,
    width: 800,
  }

  const textStyle = {
    color: 'green',
    fontSize: 30,
  }

  // const seconds = (countdown / 1000).toFixed();

  const strokeDashoffset = () => {
    return (Math.PI * size) - (countdown / (seconds * 1000)) * (Math.PI * size);
  }

  

  return (
    // <View style={[ styles.container, sizeStyle ]}>

// {/* <View style={{ flex: 1, zIndex: 2, position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}> */}
<View style={{
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
}}>

<TouchableOpacity onPress={startTimer}>
<Text>START</Text>

</TouchableOpacity>

      {/* <Text style={textStyle}>WTF{(countdown / 1000).toFixed()}s</Text> */}

      {/* <Svg style={styles.svg}> */}
      {/* <Svg height="50%" width="50%" viewBox="0 0 100 100"> */}
      {/* <Svg height={300} width={300} viewBox='0 0 300 300'> */}

      <Svg style={{
        zIndex: 3,
        position: "absolute",
        
        top: 0,
        left: 0,
        
        // top: 100,
        // left: 100,

        // justifyContent: "center",
        // alignItems: "center",

        // width: "100%",
        // height: "100%",

        height: 500,
        width: 500,
        // transform: "rotateY(-180deg) rotateZ(-90deg)",
  
        // transform: [ { rotateY: '-180deg' },  { rotateZ: '-90deg' } ],

        transform: [ { rotateY: '180deg' },  { rotateZ: '90deg' } ],
  
      }}>

        {/* <Circle cx={50} cy={50} r={50} fill='none' /> */}

        <Circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2}
          // fill='none'
          fill='red'
          stroke={strokeBackground}
          strokeWidth={strokeWidth}
        />
      </Svg>

      <Svg style={{
        zIndex: 3,
        position: "absolute",
        top: 0,
        left: 0,

        // width: "100%",
        // height: "100%",

        height: 500,
        width: 500,
        // transform: "rotateY(-180deg) rotateZ(-90deg)",
  
        // transform: [ { rotateY: '-180deg' },  { rotateZ: '-90deg' } ],

        transform: [ { rotateY: '180deg' },  { rotateZ: '90deg' } ],
  
      }}>
        <Circle
          strokeDasharray={(Math.PI * size)}
          strokeDashoffset={playing ? strokeDashoffset() : 0}
          r={size / 2}
          cx={size / 2}
          cy={size / 2}
          fill='none'
          // fill='blue'
          strokeLinecap='round'
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  )
}

export default CountdownTimer;