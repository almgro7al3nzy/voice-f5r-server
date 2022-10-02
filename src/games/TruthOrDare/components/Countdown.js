// import React from 'react';
// import { View, Text } from 'react-native';
// import { useTheme } from '@react-navigation/native';

// const Countdown = ({ timer, setTimer }) => {
//   const { colors } = useTheme();

//   const styles = {
//     container: {
//       position: 'absolute',

//       borderRadius: 10,
//       borderWidth: 1,
//       borderColor: colors.lightTranslucent,
//       paddingHorizontal: 20,
//       paddingVertical: 10,
//       // height: 30,
//       // width: 30,
//     },
//     timer: {
//       position: 'absolute',
//       zIndex: 1,


//       top: 50,
//       left: 20,
//       // top: 0,
//       // bottom: 0,
//       // left: 0,
//       // right: 0,
    
//       // justifyContent: "center",
//       // alignItems: "center",

//       color: colors.lightText,
//       fontSize: 30,
//       fontWeight: 'bold',
//       // height: 30,
//       // width: 30,
//     }
//   };

//   // const [timer, setTimer] = React.useState(10);
  

//   let timeout
//   React.useEffect(() => {
//     if (timer > 0) {
//       timeout = setTimeout(() => setTimer(timer - 1) , 1000);
//     }
//     else clearTimeout(timeout);
//   }, [timer]);

//   return <Text style={styles.timer}>{timer}</Text>
//   return (
//     <View style={styles.container}>
//       {/* <Text style={styles.timer}>{timer > -1 ? timer : 0}</Text> */}
//       <Text style={styles.timer}>{timer}</Text>
//     </View>
//   )
// }

// export default Countdown;







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
    
      // backgroundColor: 'green',
    },
    startBtn: {
      color: colors.lightText,
      fontSize: 20,
    },
    svg: {
      // position: 'absolute',
      // zIndex: 2,

      // top: 0,
      // left: 0,


      // width: '100%',
      // height: '100%',

      // transform: [ { rotate: '-90deg' } ],

      // justifyContent: "center",
      // alignItems: "center",

      // backgroundColor: 'brown'
    }
  };

  const [timer, setTimer] = React.useState(seconds * 1000);

  const [radius] = React.useState(size / 2);
  const [circumference] = React.useState(size * Math.PI);
  const [milliseconds] = React.useState(seconds * 1000);

  const startTimer = () => {
    clearTimeout(timeout)
    setTimer(seconds * 1000)
  }

  let timeout
  React.useEffect(() => {
    if (timer > 0) {
      timeout = setTimeout(() => setTimer(timer - 100) , 10);
    }
    else clearTimeout(timeout);
  }, [timer]);

  const strokeDashoffset = () => circumference * ((timer / milliseconds) - 1);  

  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ position: 'absolute', zIndex: 3 }} onPress={startTimer}>
        <Text style={styles.startBtn}>START</Text>
        <Text style={{ color: 'white' }}>{(timer / 1000).toFixed()}</Text>
      </TouchableOpacity>

      <Svg style={styles.svg}>
        <Circle
          // cx={'15%'}
          cx={radius + 10}
          cy={radius + 50}
          r={radius}
          stroke={strokeBackground}
          strokeWidth={strokeWidth}
        />
      </Svg>

      <Svg style={[ styles.svg, {
        transform: [ { rotate: '-90deg' } ],
        // transform: [ { rotateZ: '-90deg' }, { rotateY: '-180deg' } ],

        // zIndex:3, 
        // backgroundColor: 'red'
        } ]}>
        <Circle
          // cx={'50%'}
          // cy={'50%'}

          cx={radius + 10}
          cy={radius + 50}

          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap='round'

          strokeDasharray={circumference}
          // strokeDasharray={20}
          strokeDashoffset={strokeDashoffset()}
          // rotation={90}
          
        />
      </Svg>
              
    </View>
  )
}

export default Countdown3;